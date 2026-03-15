# GHL Environment Variable Setup for Vercel

## Issue: GHL_API_KEY Not Configured

The serverless function is deployed but needs the GHL API key to be set as an environment variable in Vercel.

---

## Step-by-Step Setup

### 1. Get Your GHL API Key

From 1Password:
- Item: `GHL Neptune MArketing Websites`
- Field: `credential`
- Value: `pit-af5594d9-4ee1-4f...` (full key)

### 2. Add to Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Find your `neptune-marketing` project
3. Click **Settings** → **Environment Variables**
4. Add the following:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `GHL_API_KEY` | `pit-af5594d9-4ee1-4f...` | Production |
| `GHL_API_KEY` | `pit-af5594d9-4ee1-4f...` | Preview |
| `GHL_LOCATION_ID` | `MBCpwbkRCtAUVnjZKzpn` | Production |
| `GHL_LOCATION_ID` | `MBCpwbkRCtAUVnjZKzpn` | Preview |

5. Click **Save**
6. Vercel will auto-redeploy with new variables

### 3. Verify Deployment

After Vercel redeploys (takes ~1-2 minutes), test with:

```bash
curl -X POST https://neptunemarketing.ai/api/submit-to-ghl \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "companyName": "Test Co"
  }'
```

Expected response:
```json
{
  "success": true,
  "contactId": "...",
  "message": "Contact created successfully"
}
```

---

## What Changed

### Before (Insecure)
- Frontend called GHL directly
- Wrong API endpoint
- No authentication working

### After (Secure)
- Frontend calls `/api/submit-to-ghl` (internal)
- Serverless function calls GHL API
- API key stored in environment variable (secure)
- Correct GHL API endpoint: `services.leadconnectorhq.com`

---

## Files Updated

- `src/sections/ContactSection.tsx` - Now calls internal API
- `api/submit-to-ghl.js` - New serverless function (secure)

---

## Test Full Flow After Setup

1. Add env vars to Vercel
2. Wait for redeploy
3. Submit form on neptunemarketing.ai
4. Check GHL → Contacts for new entry
5. Verify workflow triggers

---

## Rollback if Issues

Same as before:
```bash
git checkout backup/pre-ghl-form-20260315
git push origin main --force
```

Or remove environment variables from Vercel to disable GHL submission (Formspree will still work).
