#!/usr/bin/env node
/**
 * NM-Website-Skill-1: Business Discovery - Extended Search
 * Target: 50 roofers in Lambeth using Google Places API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_PLACES_API_KEY,
  location: '51.4613,-0.1156', // Lambeth approximate center (Brixton area)
  radii: [5000, 8000, 10000], // Expanded radii
  targetCount: 50,
  keywords: [
    'roofer Brixton',
    'roofer Clapham',
    'roofer Stockwell',
    'roofer Kennington',
    'roofer Vauxhall',
    'roofer Waterloo',
    'roofing contractor South London',
    'roof repair Southwark',
    'roofing services Wandsworth',
    'chimney repair Lambeth',
    'flat roof specialist London',
    'emergency roofer London',
    'slate roofing London',
    'tile roofing South London',
    'guttering Lambeth',
    'roof maintenance London'
  ],
  outputDir: './output'
};

// CSV Headers
const CSV_HEADERS = [
  'source',
  'place_id',
  'business_name',
  'category',
  'address',
  'postcode',
  'lat',
  'lng',
  'phone',
  'website_url',
  'google_rating',
  'review_count',
  'maps_url',
  'query_used',
  'radius_used_m',
  'contact_email_found',
  'contact_form_url',
  'facebook_url',
  'instagram_url',
  'lead_source_score',
  'duplicate_flag',
  'notes'
];

// Load existing businesses
function loadExistingBusinesses(filepath) {
  if (!fs.existsSync(filepath)) return [];
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',');
  const businesses = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const biz = {};
    headers.forEach((h, idx) => {
      biz[h] = values[idx] || '';
    });
    businesses.push(biz);
  }
  
  return businesses;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

// Utility: Make HTTPS request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    }).on('error', reject);
  });
}

// Extract postcode from address
function extractPostcode(address) {
  if (!address) return '';
  const match = address.match(/[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}/i);
  return match ? match[0].toUpperCase().replace(/\s+/g, ' ').trim() : '';
}

// Calculate lead source score (0-100)
function calculateLeadScore(place) {
  let score = 0;
  
  // Rating component (0-30 points)
  if (place.rating) {
    score += Math.min(place.rating * 6, 30);
  }
  
  // Review count component (0-20 points)
  if (place.user_ratings_total) {
    if (place.user_ratings_total >= 50) score += 20;
    else if (place.user_ratings_total >= 20) score += 15;
    else if (place.user_ratings_total >= 10) score += 10;
    else if (place.user_ratings_total >= 5) score += 5;
  }
  
  // Has website (0-25 points)
  if (place.website) score += 25;
  else score += 10;
  
  // Has phone (0-15 points)
  if (place.formatted_phone_number || place.international_phone_number) score += 15;
  
  // Business status (0-10 points)
  if (place.business_status === 'OPERATIONAL') score += 10;
  
  return Math.min(score, 100);
}

// Search places nearby
async function searchPlacesNearby(location, radius, keyword, pageToken = null) {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${CONFIG.apiKey}`;
  
  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pageToken}&key=${CONFIG.apiKey}`;
    await new Promise(r => setTimeout(r, 2000));
  }
  
  return makeRequest(url);
}

// Get place details
async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,international_phone_number,website,url,rating,user_ratings_total,business_status,geometry,types&key=${CONFIG.apiKey}`;
  return makeRequest(url);
}

// Search with text query
async function searchPlacesText(query, location, radius) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location}&radius=${radius}&key=${CONFIG.apiKey}`;
  return makeRequest(url);
}

// Main discovery function
async function discoverRoofers(existingBusinesses) {
  console.log('🔍 NM-Website-Skill-1: Extended Business Discovery');
  console.log(`Starting with: ${existingBusinesses.length} businesses`);
  console.log(`Target: ${CONFIG.targetCount} total roofers in Lambeth`);
  console.log('');
  
  const allBusinesses = new Map();
  
  // Load existing into map for deduplication
  for (const biz of existingBusinesses) {
    const key = `${biz.business_name}|${biz.phone}`.toLowerCase();
    allBusinesses.set(key, biz);
  }
  
  const results = [...existingBusinesses];
  let searchCount = 0;
  
  // Search through each radius
  for (const radius of CONFIG.radii) {
    if (results.length >= CONFIG.targetCount) break;
    
    console.log(`📍 Searching radius: ${radius}m`);
    
    // Search each keyword
    for (const keyword of CONFIG.keywords) {
      if (results.length >= CONFIG.targetCount) break;
      
      console.log(`  🔎 Query: "${keyword}"`);
      searchCount++;
      
      try {
        let nextPageToken = null;
        let pageCount = 0;
        
        do {
          const response = await searchPlacesNearby(
            CONFIG.location, 
            radius, 
            keyword, 
            nextPageToken
          );
          
          if (response.status !== 'OK' && response.status !== 'ZERO_RESULTS') {
            console.log(`    ⚠️ API Error: ${response.status}`);
            break;
          }
          
          if (response.results && response.results.length > 0) {
            console.log(`    ✅ Found ${response.results.length} places`);
            
            for (const place of response.results) {
              // Skip if already collected
              const dedupeKey = `${place.name}|${place.vicinity || ''}`.toLowerCase();
              if (allBusinesses.has(dedupeKey)) {
                continue;
              }
              
              // Get detailed info
              const details = await getPlaceDetails(place.place_id);
              
              if (details.status === 'OK' && details.result) {
                const result = details.result;
                const phone = result.formatted_phone_number || result.international_phone_number || '';
                const dedupeKeyWithPhone = `${place.name}|${phone}`.toLowerCase();
                
                // Skip duplicates by phone too
                if (allBusinesses.has(dedupeKeyWithPhone) && phone) {
                  continue;
                }
                
                const business = {
                  source: 'Google Places API (Extended)',
                  place_id: place.place_id,
                  business_name: result.name,
                  category: (result.types || []).join('; '),
                  address: result.formatted_address || place.vicinity || '',
                  postcode: extractPostcode(result.formatted_address || place.vicinity || ''),
                  lat: result.geometry?.location?.lat || '',
                  lng: result.geometry?.location?.lng || '',
                  phone: phone,
                  website_url: result.website || '',
                  google_rating: result.rating || '',
                  review_count: result.user_ratings_total || '',
                  maps_url: result.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                  query_used: keyword,
                  radius_used_m: radius,
                  contact_email_found: '',
                  contact_form_url: '',
                  facebook_url: '',
                  instagram_url: '',
                  lead_source_score: calculateLeadScore(result),
                  duplicate_flag: 'No',
                  notes: `Status: ${result.business_status || 'Unknown'}`
                };
                
                allBusinesses.set(dedupeKey, business);
                if (phone) allBusinesses.set(dedupeKeyWithPhone, business);
                results.push(business);
                
                console.log(`    ➕ Added: ${business.business_name} (Score: ${business.lead_source_score})`);
                
                if (results.length >= CONFIG.targetCount) break;
              }
              
              await new Promise(r => setTimeout(r, 200));
            }
          } else {
            console.log(`    ℹ️ No results`);
          }
          
          nextPageToken = response.next_page_token;
          pageCount++;
          
        } while (nextPageToken && pageCount < 3 && results.length < CONFIG.targetCount);
        
      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
      }
      
      await new Promise(r => setTimeout(r, 500));
    }
    
    console.log(`  📊 Total collected: ${results.length}`);
    console.log('');
  }
  
  // Additional text searches
  if (results.length < CONFIG.targetCount) {
    console.log('📝 Running additional text searches...');
    
    const textQueries = [
      'roofing specialist Camberwell',
      'roofers Peckham',
      'roofing contractor Bermondsey',
      'roof repair Dulwich',
      'flat roofing specialist South London',
      'emergency roof repair Lambeth area',
      'roofing company Herne Hill',
      'chimney specialist London',
      'leadwork roofing London',
      'fibreglass roofing South London'
    ];
    
    for (const query of textQueries) {
      if (results.length >= CONFIG.targetCount) break;
      
      console.log(`  🔎 Text query: "${query}"`);
      
      try {
        const response = await searchPlacesText(query, CONFIG.location, 10000);
        
        if (response.status === 'OK' && response.results) {
          for (const place of response.results) {
            const dedupeKey = `${place.name}|${place.formatted_address || ''}`.toLowerCase();
            if (allBusinesses.has(dedupeKey)) continue;
            
            const details = await getPlaceDetails(place.place_id);
            
            if (details.status === 'OK' && details.result) {
              const result = details.result;
              const phone = result.formatted_phone_number || result.international_phone_number || '';
              const dedupeKeyWithPhone = `${place.name}|${phone}`.toLowerCase();
              
              if (allBusinesses.has(dedupeKeyWithPhone) && phone) continue;
              
              const business = {
                source: 'Google Places API (Text Search Extended)',
                place_id: place.place_id,
                business_name: result.name,
                category: (result.types || []).join('; '),
                address: result.formatted_address || '',
                postcode: extractPostcode(result.formatted_address || ''),
                lat: result.geometry?.location?.lat || '',
                lng: result.geometry?.location?.lng || '',
                phone: phone,
                website_url: result.website || '',
                google_rating: result.rating || '',
                review_count: result.user_ratings_total || '',
                maps_url: result.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                query_used: query,
                radius_used_m: 10000,
                contact_email_found: '',
                contact_form_url: '',
                facebook_url: '',
                instagram_url: '',
                lead_source_score: calculateLeadScore(result),
                duplicate_flag: 'No',
                notes: `Status: ${result.business_status || 'Unknown'}`
              };
              
              allBusinesses.set(dedupeKey, business);
              if (phone) allBusinesses.set(dedupeKeyWithPhone, business);
              results.push(business);
              
              console.log(`    ➕ Added: ${business.business_name}`);
              
              if (results.length >= CONFIG.targetCount) break;
            }
            
            await new Promise(r => setTimeout(r, 200));
          }
        }
      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
      }
      
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('');
  console.log('✅ Extended Discovery Complete!');
  console.log(`📊 Total businesses now: ${results.length}`);
  console.log(`🔍 Total search operations: ${searchCount}`);
  
  return results;
}

// Escape CSV field
function escapeCSV(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Export to CSV
function exportToCSV(businesses, filename) {
  const lines = [CSV_HEADERS.join(',')];
  
  for (const biz of businesses) {
    const row = CSV_HEADERS.map(h => escapeCSV(biz[h] || ''));
    lines.push(row.join(','));
  }
  
  const csv = lines.join('\n');
  fs.writeFileSync(filename, csv, 'utf8');
  console.log(`💾 CSV saved: ${filename}`);
  return filename;
}

// Generate summary report
function generateReport(businesses) {
  const withWebsite = businesses.filter(b => b.website_url).length;
  const withPhone = businesses.filter(b => b.phone).length;
  const withRating = businesses.filter(b => b.google_rating).length;
  const avgRating = withRating > 0 
    ? (businesses.filter(b => b.google_rating).reduce((a, b) => a + parseFloat(b.google_rating), 0) / withRating).toFixed(1)
    : 'N/A';
  const avgScore = businesses.length > 0
    ? (businesses.reduce((a, b) => a + parseInt(b.lead_source_score || 0), 0) / businesses.length).toFixed(1)
    : 'N/A';
  const highScore = businesses.filter(b => parseInt(b.lead_source_score) >= 80).length;
  
  console.log('');
  console.log('📋 FINAL SUMMARY REPORT');
  console.log('========================');
  console.log(`Total businesses: ${businesses.length}`);
  console.log(`With website: ${withWebsite} (${Math.round(withWebsite/businesses.length*100)}%)`);
  console.log(`With phone: ${withPhone} (${Math.round(withPhone/businesses.length*100)}%)`);
  console.log(`With Google rating: ${withRating} (${Math.round(withRating/businesses.length*100)}%)`);
  console.log(`Average rating: ${avgRating}`);
  console.log(`Average lead score: ${avgScore}/100`);
  console.log(`High-quality leads (80+): ${highScore}`);
  console.log('');
  console.log('🏆 Top 10 by Lead Score:');
  businesses
    .sort((a, b) => parseInt(b.lead_source_score || 0) - parseInt(a.lead_source_score || 0))
    .slice(0, 10)
    .forEach((b, i) => {
      console.log(`  ${i+1}. ${b.business_name} (${b.lead_source_score} pts) - ${b.phone || 'No phone'}`);
    });
}

// Main execution
async function main() {
  if (!CONFIG.apiKey) {
    console.error('❌ GOOGLE_PLACES_API_KEY environment variable required');
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Load existing CSV
  const date = new Date().toISOString().split('T')[0];
  const filename = `NM-Website-Skill-1_Roofers_Lambeth_${date}.csv`;
  const filepath = path.join(CONFIG.outputDir, filename);
  
  const existingBusinesses = loadExistingBusinesses(filepath);
  console.log(`Loaded ${existingBusinesses.length} existing businesses from ${filepath}`);
  
  if (existingBusinesses.length >= CONFIG.targetCount) {
    console.log('✅ Target already reached!');
    generateReport(existingBusinesses);
    return;
  }
  
  // Run extended discovery
  const businesses = await discoverRoofers(existingBusinesses);
  
  if (businesses.length === 0) {
    console.error('❌ No businesses found.');
    process.exit(1);
  }
  
  // Export updated CSV
  exportToCSV(businesses, filepath);
  
  // Generate report
  generateReport(businesses);
  
  console.log('');
  console.log('🎯 Skill 1 Extended Complete!');
  console.log(`📁 Output: ${filepath}`);
  
  if (businesses.length < CONFIG.targetCount) {
    console.log(`⚠️ Note: Only found ${businesses.length}/${CONFIG.targetCount} businesses.`);
    console.log('   This may indicate limited roofing businesses in the search area.');
  }
}

main().catch(console.error);
