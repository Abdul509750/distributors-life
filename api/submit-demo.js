const { createClient } = require('@supabase/supabase-js');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sanitize(value, maxLen = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const body = req.body || {};

  if (sanitize(body.website)) {
    return res.status(201).json({ ok: true });
  }

  const fullName = sanitize(body.fullName, 120);
  const company = sanitize(body.company, 160);
  const phone = sanitize(body.phone, 40);
  const emailRaw = sanitize(body.email, 160);
  const email = emailRaw ? emailRaw.toLowerCase() : '';

  if (!fullName || !company || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (email && !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const record = {
    full_name: fullName,
    company_name: company,
    email: email || null,
    phone,
    industry: sanitize(body.industry, 80) || null,
    company_size: sanitize(body.companySize, 40) || null,
    drivers: sanitize(body.drivers, 20) || null,
    current_process: sanitize(body.currentProcess, 80) || null,
    challenge: sanitize(body.challenge, 80) || null,
    message: sanitize(body.message, 4000) || null,
    source: 'contact_form',
  };

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from('demo_requests').insert(record);

  if (error) {
    console.error('demo_requests insert failed:', error.message);
    return res.status(500).json({ error: 'Failed to save demo request' });
  }

  return res.status(201).json({ ok: true });
};
