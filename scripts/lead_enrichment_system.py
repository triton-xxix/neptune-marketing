#!/usr/bin/env python3
"""
🔱 NEPTUNE MARKETING — Lead Enrichment & Reactivation System

A comprehensive tool for:
- Enriching lead data from multiple sources
- Preparing SMS/AI reactivation campaigns  
- Tracking lead status and conversion metrics
- Exporting to Go High Level CRM format

Author: Triton XXIX
Created: 2026-02-12
"""

import json
import csv
import os
import sys
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Any
from dataclasses import dataclass, asdict
from pathlib import Path


@dataclass
class Lead:
    """Represents a single lead with enrichment fields."""
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    company: str = ""
    job_title: str = ""
    linkedin_url: str = ""
    website: str = ""
    industry: str = ""
    company_size: str = ""
    last_contact_date: Optional[str] = None
    lead_status: str = "cold"  # cold, warm, hot, converted, lost
    lead_source: str = ""  # inbound, outbound, referral, etc.
    notes: str = ""
    tags: List[str] = None
    custom_fields: Dict[str, Any] = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []
        if self.custom_fields is None:
            self.custom_fields = {}
    
    def to_ghl_format(self) -> Dict:
        """Convert to Go High Level contact format."""
        return {
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "companyName": self.company,
            "jobTitle": self.job_title,
            "website": self.website,
            "tags": self.tags,
            "customFields": [
                {"key": "linkedin_url", "value": self.linkedin_url},
                {"key": "industry", "value": self.industry},
                {"key": "company_size", "value": self.company_size},
                {"key": "lead_status", "value": self.lead_status},
                {"key": "lead_source", "value": self.lead_source},
                {"key": "last_contact_date", "value": self.last_contact_date or ""},
            ],
            "notes": self.notes
        }
    
    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()
    
    def is_reactivation_eligible(self, days_since_contact: int = 90) -> bool:
        """Check if lead is eligible for reactivation campaign."""
        if not self.last_contact_date:
            return True
        try:
            last_contact = datetime.fromisoformat(self.last_contact_date.replace('Z', '+00:00'))
            cutoff = datetime.now() - timedelta(days=days_since_contact)
            return last_contact < cutoff
        except:
            return True


class LeadEnricher:
    """Enriches lead data from various sources."""
    
    def __init__(self):
        self.enrichment_sources = {
            "linkedin": self._enrich_from_linkedin,
            "website": self._enrich_from_website,
            "email": self._enrich_from_email_domain,
        }
    
    def enrich(self, lead: Lead, sources: List[str] = None) -> Lead:
        """Enrich a lead from specified sources."""
        if sources is None:
            sources = ["email", "website"]
        
        enriched = Lead(**asdict(lead))
        
        for source in sources:
            if source in self.enrichment_sources:
                try:
                    enriched = self.enrichment_sources[source](enriched)
                except Exception as e:
                    print(f"  ⚠️  Enrichment failed for {source}: {e}")
        
        return enriched
    
    def _enrich_from_linkedin(self, lead: Lead) -> Lead:
        """Extract company info from LinkedIn URL."""
        # Placeholder for LinkedIn API integration
        # TODO: Integrate with Kakiyo or similar for LinkedIn enrichment
        if lead.linkedin_url and not lead.company:
            # Extract potential company from LinkedIn profile
            lead.tags.append("linkedin_enriched")
        return lead
    
    def _enrich_from_website(self, lead: Lead) -> Lead:
        """Extract company info from website."""
        # Placeholder for website scraping
        # TODO: Integrate with browser-use skill for website enrichment
        if lead.website and not lead.industry:
            lead.tags.append("website_enriched")
        return lead
    
    def _enrich_from_email_domain(self, lead: Lead) -> Lead:
        """Infer company from email domain."""
        if lead.email and "@" in lead.email:
            domain = lead.email.split("@")[1]
            if domain not in ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]:
                if not lead.company:
                    lead.company = domain.split(".")[0].title()
                lead.website = f"https://{domain}"
                lead.tags.append("domain_enriched")
        return lead


class ReactivationCampaign:
    """Manages SMS/AI reactivation campaigns."""
    
    SMS_TEMPLATES = {
        "casual_check_in": [
            "Hi {first_name}, it's been a while since we last spoke about {company}. Quick check-in—are you still looking to {goal}? Reply YES to chat. -Luke @ Neptune",
            "Hey {first_name}, Neptune Marketing here. We helped a {industry} company add £50k MRR last month. Still interested in growth? Reply YES. -Luke",
        ],
        "value_first": [
            "{first_name}, saw {company} is expanding. Our AI reactivation system typically recovers 15-20% of dormant leads. Worth a 5-min chat? Reply YES. -Luke",
            "Quick question {first_name}: What's your current system for reactivating old leads? We built something that works on performance basis. Interested? -Luke @ Neptune",
        ],
        "direct_offer": [
            "Hi {first_name}, Neptune Marketing. We guarantee lead reactivation results or you don't pay. Open to seeing how it works for {company}? Reply YES. -Luke",
            "{first_name}, we only work with 3 {industry} companies per quarter. 2 spots left for Q1. Performance-based pricing. Interested? Reply YES. -Luke",
        ]
    }
    
    def __init__(self, campaign_type: str = "value_first"):
        self.campaign_type = campaign_type
        self.templates = self.SMS_TEMPLATES.get(campaign_type, self.SMS_TEMPLATES["value_first"])
    
    def generate_message(self, lead: Lead, template_index: int = 0, custom_goal: str = "grow") -> str:
        """Generate personalized SMS message for a lead."""
        template = self.templates[template_index % len(self.templates)]
        
        message = template.format(
            first_name=lead.first_name,
            company=lead.company or "your business",
            industry=lead.industry or "business",
            goal=custom_goal
        )
        
        return message
    
    def create_campaign_batch(self, leads: List[Lead], batch_size: int = 50) -> List[Dict]:
        """Create a batch of campaign messages."""
        batches = []
        eligible_leads = [l for l in leads if l.is_reactivation_eligible()]
        
        for i in range(0, len(eligible_leads), batch_size):
            batch = eligible_leads[i:i + batch_size]
            campaign_messages = []
            
            for idx, lead in enumerate(batch):
                message = self.generate_message(lead, template_index=idx % len(self.templates))
                campaign_messages.append({
                    "lead_id": lead.id,
                    "phone": lead.phone,
                    "message": message,
                    "status": "pending",
                    "scheduled_time": None,
                    "template_type": self.campaign_type
                })
            
            batches.append({
                "batch_id": f"batch_{i//batch_size + 1}",
                "batch_size": len(batch),
                "messages": campaign_messages,
                "created_at": datetime.now().isoformat()
            })
        
        return batches


class LeadManager:
    """Main class for managing leads."""
    
    def __init__(self, data_dir: str = "./data/leads"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.enricher = LeadEnricher()
        self.leads: Dict[str, Lead] = {}
        self._load_leads()
    
    def _load_leads(self):
        """Load existing leads from storage."""
        leads_file = self.data_dir / "leads.json"
        if leads_file.exists():
            with open(leads_file, 'r') as f:
                data = json.load(f)
                for lead_data in data:
                    lead = Lead(**lead_data)
                    self.leads[lead.id] = lead
    
    def save_leads(self):
        """Save leads to storage."""
        leads_file = self.data_dir / "leads.json"
        data = [asdict(lead) for lead in self.leads.values()]
        with open(leads_file, 'w') as f:
            json.dump(data, f, indent=2, default=str)
    
    def import_from_csv(self, csv_path: str, mapping: Dict[str, str] = None) -> int:
        """Import leads from CSV file."""
        if mapping is None:
            mapping = {
                "first_name": "first_name",
                "last_name": "last_name",
                "email": "email",
                "phone": "phone",
                "company": "company",
            }
        
        count = 0
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                lead_data = {k: row.get(v, "") for k, v in mapping.items()}
                lead_data["id"] = f"lead_{datetime.now().strftime('%Y%m%d')}_{count}"
                lead = Lead(**lead_data)
                self.leads[lead.id] = lead
                count += 1
        
        self.save_leads()
        return count
    
    def enrich_leads(self, lead_ids: List[str] = None, sources: List[str] = None) -> int:
        """Enrich specified leads or all leads."""
        if lead_ids is None:
            lead_ids = list(self.leads.keys())
        
        enriched_count = 0
        for lead_id in lead_ids:
            if lead_id in self.leads:
                original = self.leads[lead_id]
                enriched = self.enricher.enrich(original, sources)
                self.leads[lead_id] = enriched
                enriched_count += 1
        
        self.save_leads()
        return enriched_count
    
    def export_to_ghl(self, output_path: str, lead_ids: List[str] = None):
        """Export leads to Go High Level import format."""
        if lead_ids is None:
            lead_ids = list(self.leads.keys())
        
        contacts = []
        for lead_id in lead_ids:
            if lead_id in self.leads:
                contacts.append(self.leads[lead_id].to_ghl_format())
        
        with open(output_path, 'w') as f:
            json.dump({"contacts": contacts}, f, indent=2)
        
        return len(contacts)
    
    def get_reactivation_candidates(self, days_since_contact: int = 90) -> List[Lead]:
        """Get leads eligible for reactivation."""
        return [l for l in self.leads.values() if l.is_reactivation_eligible(days_since_contact)]
    
    def get_stats(self) -> Dict:
        """Get lead database statistics."""
        total = len(self.leads)
        by_status = {}
        by_source = {}
        reactivation_eligible = 0
        
        for lead in self.leads.values():
            by_status[lead.lead_status] = by_status.get(lead.lead_status, 0) + 1
            by_source[lead.lead_source] = by_source.get(lead.lead_source, 0) + 1
            if lead.is_reactivation_eligible():
                reactivation_eligible += 1
        
        return {
            "total_leads": total,
            "by_status": by_status,
            "by_source": by_source,
            "reactivation_eligible": reactivation_eligible,
            "reactivation_rate": round(reactivation_eligible / total * 100, 1) if total > 0 else 0
        }


def print_banner():
    """Print application banner."""
    print("""
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     🔱 NEPTUNE MARKETING — Lead Enrichment & Reactivation     ║
║                                                                ║
║     Performance-Based Lead Reactivation via SMS + AI          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    """)


def main():
    print_banner()
    
    manager = LeadManager()
    
    # Interactive menu
    while True:
        print("\n📋 MAIN MENU:")
        print("1. Import leads from CSV")
        print("2. Enrich existing leads")
        print("3. View lead statistics")
        print("4. Create reactivation campaign")
        print("5. Export to Go High Level")
        print("6. Exit")
        
        choice = input("\nSelect option (1-6): ").strip()
        
        if choice == "1":
            csv_path = input("Enter CSV file path: ").strip()
            if os.path.exists(csv_path):
                count = manager.import_from_csv(csv_path)
                print(f"✅ Imported {count} leads successfully!")
            else:
                print(f"❌ File not found: {csv_path}")
        
        elif choice == "2":
            print("\nEnrichment sources: linkedin, website, email")
            sources = input("Enter sources (comma-separated) or press Enter for all: ").strip()
            sources = [s.strip() for s in sources.split(",")] if sources else None
            count = manager.enrich_leads(sources=sources)
            print(f"✅ Enriched {count} leads!")
        
        elif choice == "3":
            stats = manager.get_stats()
            print("\n📊 LEAD STATISTICS:")
            print(f"  Total leads: {stats['total_leads']}")
            print(f"  Reactivation eligible: {stats['reactivation_eligible']} ({stats['reactivation_rate']}%)")
            print(f"  By status: {stats['by_status']}")
            print(f"  By source: {stats['by_source']}")
        
        elif choice == "4":
            print("\nCampaign types: casual_check_in, value_first, direct_offer")
            campaign_type = input("Enter campaign type (default: value_first): ").strip() or "value_first"
            batch_size = input("Batch size (default: 50): ").strip() or "50"
            
            campaign = ReactivationCampaign(campaign_type)
            candidates = manager.get_reactivation_candidates()
            batches = campaign.create_campaign_batch(candidates, int(batch_size))
            
            output_file = f"campaign_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(manager.data_dir / output_file, 'w') as f:
                json.dump(batches, f, indent=2)
            
            total_messages = sum(b['batch_size'] for b in batches)
            print(f"✅ Created {len(batches)} batches with {total_messages} messages!")
            print(f"📁 Saved to: {manager.data_dir / output_file}")
            
            # Preview first message
            if batches and batches[0]['messages']:
                print("\n📝 Sample message:")
                print(f"   {batches[0]['messages'][0]['message']}")
        
        elif choice == "5":
            output_path = input("Enter output file path (default: ghl_export.json): ").strip() or "ghl_export.json"
            count = manager.export_to_ghl(output_path)
            print(f"✅ Exported {count} contacts to {output_path}")
            print("📤 Import this file into Go High Level → Contacts → Import")
        
        elif choice == "6":
            print("\n👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid option. Please try again.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Interrupted. Goodbye!")
        sys.exit(0)
