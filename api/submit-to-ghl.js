// api/submit-to-ghl.js
// Vercel serverless function - securely submits form data to GHL

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      firstName, lastName, email, phone, 
      companyName, website, role, description, message 
    } = req.body;

    // Validate
    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone required' });
    }

    // GHL Configuration from environment variables
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'MBCpwbkRCtAUVnjZKzpn';

    if (!GHL_API_KEY) {
      console.error('GHL_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Build contact data
    const contactData = {
      firstName: firstName || 'Unknown',
      lastName: lastName || '',
      email: email || '',
      phone: phone || '',
      companyName: companyName || '',
      website: website || '',
      locationId: GHL_LOCATION_ID,
      tags: ['website-lead', 'neptune-marketing', 'lead-reactivation'],
      source: 'website',
      customFields: [
        { key: 'role', value: role || '' },
        { key: 'description', value: description || '' },
        { key: 'message', value: message || '' }
      ].filter(f => f.value)
    };

    console.log('Submitting to GHL:', contactData);

    // Send to GHL API
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.json();
      console.error('GHL API Error:', errorData);
      
      return res.status(200).json({
        success: false,
        error: 'GHL submission failed',
        details: errorData.message || 'Unknown error'
      });
    }

    const data = await ghlResponse.json();
    
    console.log('GHL Success:', data);
    
    return res.status(200).json({
      success: true,
      contactId: data.contact?.id,
      message: 'Contact created successfully'
    });

  } catch (error) {
    console.error('Server Error:', error);
    
    return res.status(200).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
