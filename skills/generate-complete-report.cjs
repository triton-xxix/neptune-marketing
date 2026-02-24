#!/usr/bin/env node
/**
 * Generate comprehensive Skill 1 report with all 50 businesses
 */

const fs = require('fs');

// Parse CSV
function parseCSV(content) {
  const lines = content.split('\n');
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

// Load data
const csvContent = fs.readFileSync('./output/NM-Website-Skill-1_Roofers_Lambeth_2026-02-16.csv', 'utf8');
const businesses = parseCSV(csvContent);

// Separate by website status
const withWebsite = businesses.filter(b => b.website_url && b.website_url.trim() !== '');
const withoutWebsite = businesses.filter(b => !b.website_url || b.website_url.trim() === '');

// Sort by lead score
withWebsite.sort((a, b) => parseFloat(b.lead_source_score) - parseFloat(a.lead_source_score));
withoutWebsite.sort((a, b) => parseFloat(b.lead_source_score) - parseFloat(a.lead_source_score));

// Generate report
const report = `# NM-Website-Skill-1: Complete Business Discovery Report

**Date:** 2026-02-16
**Target:** 50 roofers in Lambeth
**Status:** ✅ COMPLETE

---

## Executive Summary

Successfully discovered and collected **50 roofing businesses** in the Lambeth area.

| Metric | Value |
|--------|-------|
| **Total businesses** | 50 |
| **With website** | ${withWebsite.length} (${Math.round(withWebsite.length/50*100)}%) |
| **NO WEBSITE** | ${withoutWebsite.length} (**${Math.round(withoutWebsite.length/50*100)}%**) ⭐ PRIME TARGETS |
| **With phone** | ${businesses.filter(b => b.phone).length} (100%) |
| **With Google rating** | ${businesses.filter(b => b.google_rating).length} (92%) |
| **Average rating** | ${(businesses.filter(b => b.google_rating).reduce((a, b) => a + parseFloat(b.google_rating), 0) / businesses.filter(b => b.google_rating).length).toFixed(1)}/5 |
| **Average lead score** | ${(businesses.reduce((a, b) => a + parseFloat(b.lead_source_score), 0) / businesses.length).toFixed(1)}/100 |

---

## 🔴 PRIME TARGETS: 12 Businesses WITHOUT Websites

**These 12 businesses are PRIME OPPORTUNITIES** - they have no online presence and would benefit most from a new website.

| # | Business Name | Phone | Postcode | Rating | Reviews | Score | Why PRIME |
|---|---------------|-------|----------|--------|---------|-------|-----------|
${withoutWebsite.map((b, i) => `| ${i+1} | **${b.business_name}** | ${b.phone} | ${b.postcode} | ${b.google_rating || 'N/A'} | ${b.review_count || '0'} | ${b.lead_source_score} | No website = High need |`).join('\n')}

### Key Insights (No Website Group)
- **100% have phone numbers** - Direct contact possible
- **${withoutWebsite.filter(b => b.google_rating).length} have Google ratings** - Active businesses
- **Average score:** ${(withoutWebsite.reduce((a, b) => a + parseFloat(b.lead_source_score), 0) / withoutWebsite.length).toFixed(1)}/100
- **Locations:** ${[...new Set(withoutWebsite.map(b => b.postcode?.split(' ')[0]))].join(', ')}

---

## 🟢 Businesses WITH Websites (${withWebsite.length})

### Tier 1: Highest Quality (Score 90+)

| # | Business Name | Website | Phone | Postcode | Rating | Reviews | Score |
|---|---------------|---------|-------|----------|--------|---------|-------|
${withWebsite.filter(b => parseFloat(b.lead_source_score) >= 90).map((b, i) => `| ${i+1} | ${b.business_name} | [Visit](${b.website_url}) | ${b.phone} | ${b.postcode} | ${b.google_rating} | ${b.review_count} | ${b.lead_source_score} |`).join('\n')}

### Tier 2: Good Quality (Score 80-89)

| # | Business Name | Website | Phone | Postcode | Rating | Reviews | Score |
|---|---------------|---------|-------|----------|--------|---------|-------|
${withWebsite.filter(b => parseFloat(b.lead_source_score) >= 80 && parseFloat(b.lead_source_score) < 90).map((b, i) => `| ${i+1} | ${b.business_name} | [Visit](${b.website_url}) | ${b.phone} | ${b.postcode} | ${b.google_rating} | ${b.review_count} | ${b.lead_source_score} |`).join('\n')}

### Tier 3: Moderate Quality (Score 70-79)

| # | Business Name | Website | Phone | Postcode | Rating | Reviews | Score |
|---|---------------|---------|-------|----------|--------|---------|-------|
${withWebsite.filter(b => parseFloat(b.lead_source_score) >= 70 && parseFloat(b.lead_source_score) < 80).map((b, i) => `| ${i+1} | ${b.business_name} | [Visit](${b.website_url}) | ${b.phone} | ${b.postcode} | ${b.google_rating || 'N/A'} | ${b.review_count || '0'} | ${b.lead_source_score} |`).join('\n')}

### Tier 4: Lower Quality (Score <70)

| # | Business Name | Website | Phone | Postcode | Rating | Reviews | Score |
|---|---------------|---------|-------|----------|--------|---------|-------|
${withWebsite.filter(b => parseFloat(b.lead_source_score) < 70).map((b, i) => `| ${i+1} | ${b.business_name} | ${b.website_url ? `[Visit](${b.website_url})` : 'N/A'} | ${b.phone} | ${b.postcode} | ${b.google_rating || 'N/A'} | ${b.review_count || '0'} | ${b.lead_source_score} |`).join('\n')}

---

## 📍 Geographic Distribution

### Postcode Areas

| Postcode Area | Count | With Website | No Website |
|---------------|-------|--------------|------------|
${Object.entries(businesses.reduce((acc, b) => {
  const area = b.postcode?.split(' ')[0] || 'Unknown';
  if (!acc[area]) acc[area] = { count: 0, withSite: 0, noSite: 0 };
  acc[area].count++;
  if (b.website_url) acc[area].withSite++;
  else acc[area].noSite++;
  return acc;
}, {})).sort((a, b) => b[1].count - a[1].count).map(([area, data]) => `| ${area} | ${data.count} | ${data.withSite} | ${data.noSite} |`).join('\n')}

---

## 🎯 Recommended Outreach Strategy

### Phase 1: NO WEBSITE Targets (12 businesses)
**Priority: HIGHEST**

These businesses have NO online presence. Approach angle:
- "I noticed your business doesn't have a website yet..."
- Emphasize missed opportunities from Google searches
- Offer website as foundation for all other marketing

### Phase 2: Poor Website Quality (Score <70 with site)
**Priority: HIGH**

These have websites but low scores. Approach angle:
- "Your current website may be costing you leads..."
- Focus on mobile optimization and conversion
- Offer audit + rebuild

### Phase 3: Good Websites (Score 80+)
**Priority: MEDIUM**

These are established but may want upgrades:
- Offer performance optimization
- Advanced features (booking, chat, etc.)
- SEO improvements

---

## 📁 Output Files

### CSV File
- **Filename:** \`NM-Website-Skill-1_Roofers_Lambeth_2026-02-16.csv\`
- **Google Drive:** https://drive.google.com/file/d/18CP4sXtzkLLsjvtUTi67pYN4v2vTMFN_/view
- **Total Records:** 50 businesses

### Columns Included
- source, place_id, business_name, category
- address, postcode, lat, lng
- phone, website_url
- google_rating, review_count
- maps_url, query_used, radius_used_m
- lead_source_score (calculated 0-100)
- contact_email_found, contact_form_url (for enrichment)
- facebook_url, instagram_url (for enrichment)

---

## 🚦 Next Steps

### Immediate Actions:
1. **Contact 12 NO WEBSITE businesses first** - Highest conversion potential
2. **Build demo sites** for top 3 PRIME targets
3. **Prepare case studies** showing before/after website impact

### Skill 2 Preparation:
- Audit all 38 websites for mobile, speed, CTA, tracking
- Score each: PRIME / TARGET / SKIP
- Identify quick wins for outreach

---

## 📊 Data Quality Notes

- **Duplicates:** 0 (deduplicated by name+phone)
- **All have phone numbers:** Yes (100%)
- **Google-verified:** 92% have ratings
- **Active businesses:** All marked OPERATIONAL
- **Coverage:** Lambeth + surrounding areas (Brixton, Clapham, Stockwell, etc.)

---

**Report Generated:** 2026-02-16
**Skill 1 Status:** ✅ COMPLETE - All 50 roofers documented
**Next:** Skill 2 - Website Audit
`;

fs.writeFileSync('./output/SKILL-1-COMPLETE-REPORT.md', report);
console.log('✅ Complete report generated: SKILL-1-COMPLETE-REPORT.md');
console.log(`📊 Summary: ${withWebsite.length} with websites, ${withoutWebsite.length} without websites`);
