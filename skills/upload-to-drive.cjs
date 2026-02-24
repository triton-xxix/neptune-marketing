#!/usr/bin/env node
/**
 * Upload CSV to Google Drive - Neptune Marketing Websites folder
 * Uses built-in https module
 */

const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

// Google Drive folder structure
const TARGET_FOLDER_PATH = 'Neptune Marketing/Neptune Marketing Websites/NM-Website-Skill-1';

// Get credentials from 1Password
function getCredential(field) {
  try {
    const value = execSync(`op read "op://Tritons World/Luke Boyd Google/${field}"`, { encoding: 'utf8' }).trim();
    return value;
  } catch (e) {
    console.error(`❌ Failed to get ${field} from 1Password`);
    return null;
  }
}

// Make HTTPS request
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.error?.message || responseData}`));
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Get access token using refresh token
async function getAccessToken() {
  const clientId = getCredential('username');
  const clientSecret = getCredential('credential');
  const refreshToken = getCredential('refresh');

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing OAuth credentials');
  }

  const postData = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });

  const options = {
    hostname: 'oauth2.googleapis.com',
    port: 443,
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return makeRequest(options, postData);
}

// Find or create folder path
async function ensureFolderPath(accessToken, folderPath) {
  const parts = folderPath.split('/');
  let parentId = 'root';
  
  for (const part of parts) {
    // Search for existing folder
    const query = encodeURIComponent(`mimeType='application/vnd.google-apps.folder' and name='${part}' and '${parentId}' in parents and trashed=false`);
    
    const searchOptions = {
      hostname: 'www.googleapis.com',
      port: 443,
      path: `/drive/v3/files?q=${query}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const searchResponse = await makeRequest(searchOptions);
    
    if (searchResponse.files && searchResponse.files.length > 0) {
      parentId = searchResponse.files[0].id;
      console.log(`  📁 Found folder: ${part}`);
    } else {
      // Create folder
      const createData = JSON.stringify({
        name: part,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId]
      });

      const createOptions = {
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/drive/v3/files',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(createData)
        }
      };

      const createResponse = await makeRequest(createOptions, createData);
      parentId = createResponse.id;
      console.log(`  📁 Created folder: ${part}`);
    }
  }
  
  return parentId;
}

// Upload file to Google Drive
async function uploadFile(filePath, folderId, accessToken) {
  const fileName = filePath.split('/').pop();
  const fileContent = fs.readFileSync(filePath);
  
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  
  const metadata = {
    name: fileName,
    parents: [folderId]
  };
  
  const multipartBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/csv\r\n\r\n' +
    fileContent.toString() +
    close_delim;

  const uploadOptions = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: '/upload/drive/v3/files?uploadType=multipart',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary="${boundary}"`,
      'Content-Length': Buffer.byteLength(multipartBody)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(uploadOptions, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.error?.message || responseData}`));
          }
        } catch (e) {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(multipartBody);
    req.end();
  });
}

// Main function
async function main() {
  const filePath = process.argv[2] || './output/NM-Website-Skill-1_Roofers_Lambeth_2026-02-16.csv';
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  console.log('🔐 Authenticating with Google Drive...');
  const tokenResponse = await getAccessToken();
  const accessToken = tokenResponse.access_token;
  console.log('✅ Authenticated');
  
  console.log(`\n📁 Ensuring folder path: ${TARGET_FOLDER_PATH}`);
  const folderId = await ensureFolderPath(accessToken, TARGET_FOLDER_PATH);
  console.log(`✅ Folder ready`);
  
  console.log(`\n📤 Uploading file: ${filePath.split('/').pop()}`);
  const result = await uploadFile(filePath, folderId, accessToken);
  
  console.log('\n✅ Upload Complete!');
  console.log(`📄 File: ${result.name}`);
  console.log(`🆔 ID: ${result.id}`);
  console.log(`🔗 Link: https://drive.google.com/file/d/${result.id}/view`);
  console.log(`📂 Parent Folder: https://drive.google.com/drive/folders/${folderId}`);
  
  return result;
}

main().catch(console.error);
