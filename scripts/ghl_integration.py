"""
Go High Level API Integration Module

Provides wrapper functions for GHL API operations.
Requires: GHL_API_KEY and GHL_LOCATION_ID environment variables
"""

import os
import requests
from typing import Dict, List, Optional, Any
from datetime import datetime


class GHLClient:
    """Client for Go High Level API v1."""
    
    BASE_URL = "https://rest.gohighlevel.com/v1"
    
    def __init__(self, api_key: str = None, location_id: str = None):
        self.api_key = api_key or os.getenv("GHL_API_KEY")
        self.location_id = location_id or os.getenv("GHL_LOCATION_ID")
        
        if not self.api_key:
            raise ValueError("GHL_API_KEY required. Set env var or pass to constructor.")
        if not self.location_id:
            raise ValueError("GHL_LOCATION_ID required. Set env var or pass to constructor.")
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def _request(self, method: str, endpoint: str, data: Dict = None, params: Dict = None) -> Dict:
        """Make authenticated request to GHL API."""
        url = f"{self.BASE_URL}/{endpoint}"
        
        # Add location ID to params
        if params is None:
            params = {}
        params["locationId"] = self.location_id
        
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self.headers,
                json=data,
                params=params,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status_code": getattr(e.response, 'status_code', None)}
    
    # ==================== CONTACTS ====================
    
    def create_contact(self, contact_data: Dict) -> Dict:
        """Create a new contact in GHL."""
        return self._request("POST", "contacts/", data=contact_data)
    
    def get_contact(self, contact_id: str) -> Dict:
        """Get a contact by ID."""
        return self._request("GET", f"contacts/{contact_id}")
    
    def update_contact(self, contact_id: str, contact_data: Dict) -> Dict:
        """Update an existing contact."""
        return self._request("PUT", f"contacts/{contact_id}", data=contact_data)
    
    def search_contacts(self, query: str = None, phone: str = None, email: str = None) -> Dict:
        """Search contacts by query, phone, or email."""
        params = {}
        if query:
            params["query"] = query
        if phone:
            params["phone"] = phone
        if email:
            params["email"] = email
        return self._request("GET", "contacts/", params=params)
    
    def get_all_contacts(self, limit: int = 100, offset: int = 0) -> Dict:
        """Get all contacts with pagination."""
        return self._request("GET", "contacts/", params={"limit": limit, "offset": offset})
    
    def delete_contact(self, contact_id: str) -> Dict:
        """Delete a contact."""
        return self._request("DELETE", f"contacts/{contact_id}")
    
    # ==================== TAGS & CUSTOM FIELDS ====================
    
    def get_tags(self) -> Dict:
        """Get all available tags."""
        return self._request("GET", "tags/")
    
    def create_tag(self, name: str, description: str = "") -> Dict:
        """Create a new tag."""
        return self._request("POST", "tags/", data={"name": name, "description": description})
    
    def add_tag_to_contact(self, contact_id: str, tag: str) -> Dict:
        """Add a tag to a contact."""
        return self._request("POST", f"contacts/{contact_id}/tags", data={"tags": [tag]})
    
    def remove_tag_from_contact(self, contact_id: str, tag: str) -> Dict:
        """Remove a tag from a contact."""
        return self._request("DELETE", f"contacts/{contact_id}/tags/{tag}")
    
    def get_custom_fields(self) -> Dict:
        """Get all custom fields."""
        return self._request("GET", "custom-fields/")
    
    # ==================== PIPELINES & OPPORTUNITIES ====================
    
    def get_pipelines(self) -> Dict:
        """Get all pipelines."""
        return self._request("GET", "pipelines/")
    
    def create_opportunity(self, pipeline_id: str, stage_id: str, contact_id: str, 
                          title: str, value: float = 0, status: str = "open") -> Dict:
        """Create a new opportunity/deal."""
        data = {
            "pipelineId": pipeline_id,
            "stageId": stage_id,
            "contactId": contact_id,
            "title": title,
            "status": status,
            "value": value
        }
        return self._request("POST", "opportunities/", data=data)
    
    def update_opportunity(self, opportunity_id: str, data: Dict) -> Dict:
        """Update an opportunity."""
        return self._request("PUT", f"opportunities/{opportunity_id}", data=data)
    
    def get_opportunities(self, pipeline_id: str = None, stage_id: str = None) -> Dict:
        """Get opportunities with optional filtering."""
        params = {}
        if pipeline_id:
            params["pipelineId"] = pipeline_id
        if stage_id:
            params["stageId"] = stage_id
        return self._request("GET", "opportunities/", params=params)
    
    # ==================== APPOINTMENTS ====================
    
    def create_appointment(self, contact_id: str, title: str, start_time: str, 
                          end_time: str, calendar_id: str = None) -> Dict:
        """Create an appointment."""
        data = {
            "contactId": contact_id,
            "title": title,
            "startTime": start_time,
            "endTime": end_time
        }
        if calendar_id:
            data["calendarId"] = calendar_id
        return self._request("POST", "appointments/", data=data)
    
    def get_appointments(self, contact_id: str = None, start_date: str = None, 
                        end_date: str = None) -> Dict:
        """Get appointments with optional filtering."""
        params = {}
        if contact_id:
            params["contactId"] = contact_id
        if start_date:
            params["startDate"] = start_date
        if end_date:
            params["endDate"] = end_date
        return self._request("GET", "appointments/", params=params)
    
    # ==================== SMS / MESSAGING ====================
    
    def send_sms(self, contact_id: str, message: str, template_id: str = None) -> Dict:
        """Send SMS to a contact."""
        data = {
            "contactId": contact_id,
            "message": message,
            "messageType": "SMS"
        }
        if template_id:
            data["templateId"] = template_id
        return self._request("POST", "sms/send", data=data)
    
    def send_bulk_sms(self, contact_ids: List[str], message: str) -> Dict:
        """Send SMS to multiple contacts."""
        results = []
        for contact_id in contact_ids:
            result = self.send_sms(contact_id, message)
            results.append({"contact_id": contact_id, "result": result})
        return {"bulk_send_results": results}
    
    def get_sms_conversation(self, contact_id: str) -> Dict:
        """Get SMS conversation history with a contact."""
        return self._request("GET", f"conversations/{contact_id}/messages")
    
    # ==================== WORKFLOWS ====================
    
    def get_workflows(self) -> Dict:
        """Get all workflows."""
        return self._request("GET", "workflows/")
    
    def trigger_workflow(self, contact_id: str, workflow_id: str) -> Dict:
        """Trigger a workflow for a contact."""
        return self._request("POST", f"contacts/{contact_id}/workflows/{workflow_id}")
    
    # ==================== BULK OPERATIONS ====================
    
    def bulk_import_contacts(self, contacts: List[Dict]) -> Dict:
        """Import multiple contacts."""
        results = {
            "successful": [],
            "failed": [],
            "total": len(contacts)
        }
        
        for contact in contacts:
            result = self.create_contact(contact)
            if "error" in result:
                results["failed"].append({"contact": contact, "error": result["error"]})
            else:
                results["successful"].append(result)
        
        results["success_count"] = len(results["successful"])
        results["fail_count"] = len(results["failed"])
        return results
    
    def sync_leads_to_ghl(self, leads: List[Any]) -> Dict:
        """Sync Lead objects to GHL contacts."""
        contacts = [lead.to_ghl_format() for lead in leads]
        return self.bulk_import_contacts(contacts)


# ==================== UTILITY FUNCTIONS ====================

def test_ghl_connection() -> bool:
    """Test if GHL API credentials are working."""
    try:
        client = GHLClient()
        result = client.get_tags()
        return "error" not in result
    except Exception as e:
        print(f"GHL Connection Error: {e}")
        return False


def get_account_info() -> Dict:
    """Get current GHL account information."""
    try:
        client = GHLClient()
        # Get location info
        response = client._request("GET", "locations/me")
        return response
    except Exception as e:
        return {"error": str(e)}


# ==================== CLI INTERFACE ====================

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Go High Level API Client")
    parser.add_argument("action", choices=[
        "test", "get-tags", "get-pipelines", "get-contacts", "search-contacts",
        "create-contact", "send-sms"
    ])
    parser.add_argument("--query", help="Search query")
    parser.add_argument("--contact-id", help="Contact ID")
    parser.add_argument("--message", help="SMS message")
    
    args = parser.parse_args()
    
    client = GHLClient()
    
    if args.action == "test":
        if test_ghl_connection():
            print("✅ GHL API connection successful!")
            info = get_account_info()
            print(f"Account: {info.get('name', 'Unknown')}")
        else:
            print("❌ GHL API connection failed. Check your API key.")
    
    elif args.action == "get-tags":
        result = client.get_tags()
        print(json.dumps(result, indent=2))
    
    elif args.action == "get-pipelines":
        result = client.get_pipelines()
        print(json.dumps(result, indent=2))
    
    elif args.action == "get-contacts":
        result = client.get_all_contacts()
        print(json.dumps(result, indent=2))
    
    elif args.action == "search-contacts":
        if not args.query:
            print("❌ --query required")
        else:
            result = client.search_contacts(query=args.query)
            print(json.dumps(result, indent=2))
    
    elif args.action == "send-sms":
        if not args.contact_id or not args.message:
            print("❌ --contact-id and --message required")
        else:
            result = client.send_sms(args.contact_id, args.message)
            print(json.dumps(result, indent=2))
