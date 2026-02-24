# 🔱 Neptune Marketing — Lead Enrichment & Reactivation System

A comprehensive Python-based system for managing lead data, enriching contact information, and automating SMS/AI reactivation campaigns for Neptune Marketing.

## What It Does

- **Import Leads**: Load leads from CSV files with flexible field mapping
- **Enrich Data**: Automatically enrich leads from email domains, websites, and LinkedIn
- **Track Status**: Monitor lead status (cold → warm → hot → converted)
- **Reactivation Campaigns**: Generate personalized SMS messages for dormant leads
- **GHL Export**: Export leads in Go High Level compatible format
- **Analytics**: Track lead statistics and reactivation opportunities

## Quick Start

```bash
# Navigate to the scripts directory
cd neptune-marketing/scripts

# Run the system
python3 lead_enrichment_system.py
```

## Features

### 1. Lead Import
- Import from CSV with automatic field detection
- Supports custom field mapping
- Validates phone numbers and emails

### 2. Lead Enrichment
- **Domain Enrichment**: Infer company from email domain
- **Website Enrichment**: Extract industry/company info from websites (requires browser automation skill)
- **LinkedIn Enrichment**: Pull company data from LinkedIn profiles (requires Kakiyo skill)

### 3. Reactivation Campaigns
Pre-built SMS templates for:
- **Casual Check-in**: Soft re-engagement for dormant leads
- **Value-First**: Lead with value proposition
- **Direct Offer**: Performance-based pitch with guarantee

### 4. Go High Level Integration
- Export contacts in GHL JSON format
- Maps custom fields automatically
- Preserves tags and notes

## CSV Import Format

Your CSV should have these columns:
```csv
first_name,last_name,email,phone,company,job_title,linkedin_url,website,industry
John,Doe,john@example.com,+447123456789,Acme Corp,CEO,https://linkedin.com/in/johndoe,https://example.com,Technology
```

## SMS Templates

### Casual Check-in
```
Hi {first_name}, it's been a while since we last spoke about {company}. 
Quick check-in—are you still looking to grow? Reply YES to chat. -Luke @ Neptune
```

### Value-First
```
{first_name}, saw {company} is expanding. Our AI reactivation system typically 
recovers 15-20% of dormant leads. Worth a 5-min chat? Reply YES. -Luke
```

### Direct Offer
```
Hi {first_name}, Neptune Marketing. We guarantee lead reactivation results 
or you don't pay. Open to seeing how it works for {company}? Reply YES. -Luke
```

## Integration Roadmap

### Phase 1: Manual Operation (Current)
- [x] CSV import/export
- [x] Lead enrichment (basic)
- [x] SMS campaign generation
- [x] GHL export

### Phase 2: API Integration (Next)
- [ ] Go High Level API integration (live sync)
- [ ] LinkedIn enrichment via Kakiyo skill
- [ ] Website scraping via browser-use skill
- [ ] SMS sending via Twilio/GHL

### Phase 3: Full Automation
- [ ] Scheduled reactivation campaigns
- [ ] AI-powered message personalization
- [ ] Response tracking and lead scoring
- [ ] Automated follow-up sequences

## File Structure

```
neptune-marketing/scripts/
├── lead_enrichment_system.py    # Main application
├── ghl_integration.py            # GHL API wrapper (coming soon)
├── linkedin_enricher.py          # LinkedIn enrichment (coming soon)
└── README.md                     # This file

data/leads/                       # Data directory (auto-created)
├── leads.json                    # Master lead database
└── campaign_*.json               # Generated campaign batches
```

## Environment Variables

Create a `.env` file for API keys:
```bash
GHL_API_KEY=your_ghl_api_key
GHL_LOCATION_ID=your_location_id
KAKIYO_API_KEY=your_kakiyo_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## Usage Examples

### Import Leads
```python
from lead_enrichment_system import LeadManager

manager = LeadManager()
count = manager.import_from_csv("leads.csv")
print(f"Imported {count} leads")
```

### Enrich Leads
```python
# Enrich all leads
manager.enrich_leads()

# Enrich specific leads
manager.enrich_leads(lead_ids=["lead_001", "lead_002"])
```

### Create Campaign
```python
from lead_enrichment_system import ReactivationCampaign

campaign = ReactivationCampaign("value_first")
candidates = manager.get_reactivation_candidates()
batches = campaign.create_campaign_batch(candidates, batch_size=50)
```

## Go High Level Import

1. Export leads: Select option 5 in the menu
2. Log into Go High Level
3. Go to Contacts → Import
4. Upload the generated JSON file
5. Map fields as needed

## Recommended Skills to Install

For full automation, install these OpenClaw skills:

```bash
# Browser automation for website enrichment
npx clawhub@latest install browse

# LinkedIn automation for outreach
npx clawhub@latest install kakiyo

# Neural web search for lead research
npx clawhub@latest install exa-plus
```

## Performance-Based Pricing Model

Neptune Marketing operates on performance-based pricing:

- **No upfront fees**: Clients only pay for results
- **Revenue share**: 50% of recovered revenue
- **Guarantee**: No payment if no leads reactivated
- **Target**: £1M+ businesses with 1,000+ dormant leads/month

## Support

For questions or issues:
- Email: triton.xxix@neptunemarketing.co.uk
- Telegram: @Tritonxxbot

---

**Built by Triton XXIX for Neptune Marketing**
*Last updated: 2026-02-12*
