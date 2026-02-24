# NM-Website-Skill-1: Business Discovery Report

**Date:** 2026-02-16
**Target:** 50 roofers in Lambeth
**Status:** ✅ COMPLETE

---

## Summary

Successfully discovered and collected **50 roofing businesses** in the Lambeth area using Google Places API.

### Key Metrics

| Metric | Value |
|--------|-------|
| Total businesses | 50 |
| With website | 38 (76%) |
| With phone | 50 (100%) |
| With Google rating | 46 (92%) |
| Average rating | 4.8/5 |
| Average lead score | 81.8/100 |
| High-quality leads (80+) | 36 |

---

## Search Strategy

1. **Radius Expansion:** 1500m → 3000m → 5000m → 8000m → 10000m
2. **Keywords Used:**
   - Primary: "roofer Lambeth", "roofing contractor Lambeth", "roof repair Lambeth", "roofing services Lambeth"
   - Area-specific: "roofer Brixton", "roofer Clapham", "roofer Stockwell", "roofer Kennington", "roofer Vauxhall"
   - Extended: "roofing specialist", "chimney repair", "flat roof specialist", "emergency roofer"

---

## Top 10 Leads by Score

| Rank | Business | Score | Phone |
|------|----------|-------|-------|
| 1 | Golden Roofing Expert Ltd | 100 | 07723 782655 |
| 2 | Victoria Roofing Expert Ltd | 100 | 07848 256099 |
| 3 | M.N.O SPECIALIST ROOFING & EXTERIORS LTD | 100 | 020 8050 3726 |
| 4 | JBM Roofing Solutions | 100 | 07949 686669 |
| 5 | Home Restoration Specialists LTD | 99.4 | 020 3633 9159 |
| 6 | Scotts Roofing Ltd | 99.4 | 01494 578885 |
| 7 | Roofer Forest Hill - Archwell Roofing Ltd | 99.4 | 07958 002494 |
| 8 | N.H.R.B.S. Roofing Services | 98.8 | 020 7828 2181 |
| 9 | R&P Roofing Brixton | 95 | 07990 567457 |
| 10 | LF Roofing Services Ltd | 95 | 07815 695928 |

---

## Output Files

### CSV File
- **Filename:** `NM-Website-Skill-1_Roofers_Lambeth_2026-02-16.csv`
- **Location:** `/home/node/.openclaw/workspace/neptune-marketing/skills/output/`
- **Google Drive:** https://drive.google.com/file/d/18CP4sXtzkLLsjvtUTi67pYN4v2vTMFN_/view

### Columns Included
- source
- place_id
- business_name
- category
- address
- postcode
- lat, lng
- phone
- website_url
- google_rating, review_count
- maps_url
- query_used, radius_used_m
- contact_email_found (placeholder for enrichment)
- contact_form_url (placeholder for enrichment)
- facebook_url, instagram_url (placeholders for enrichment)
- lead_source_score (calculated 0-100)
- duplicate_flag
- notes

---

## Scripts Created

1. **skill-1-discovery.cjs** - Initial discovery with 1500m/3000m/5000m radius
2. **skill-1-discovery-extended.cjs** - Extended search with additional keywords and radii
3. **upload-to-drive.cjs** - Google Drive upload with folder creation

---

## Blockers Encountered

None. The discovery completed successfully.

---

## Next Steps (Skill 2)

The following businesses are ready for website audit:
- **38 businesses with websites** (76%)
- **36 high-quality leads** (score 80+)

Skill 2 will:
1. Read the CSV from Google Drive
2. Check each website for:
   - Mobile friendliness
   - Page speed
   - Call-to-action presence
   - Click-to-call functionality
   - Contact form
   - Tracking/analytics
   - Conversion score (0-100)
3. Qualify as PRIME, TARGET, or SKIP
4. Output to: `NM-Website-Skill-2_Roofers_Lambeth_WebScore_YYYY-MM-DD.csv`

---

## Improvements for Future Runs

1. **Enrichment:** Add email discovery via website scraping
2. **Social Discovery:** Find Facebook/Instagram URLs
3. **Competitor Analysis:** Cross-reference with competitor lists
4. **Geographic Refinement:** More targeted postcode-based searches

---

**Skill 1 Status:** ✅ DELIVERED
