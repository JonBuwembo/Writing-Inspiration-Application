// Supabase Edge Function: proxy-login
// This function forwards a password grant sign-in to Supabase Auth and returns the response
// with CORS headers allowing http://localhost:5173 (development). Deploy under supabase/functions.

// NOTE: This file runs on Deno in Supabase Edge Functions. The editor/linter in this workspace
// may not recognize Deno globals or std imports; the runtime is correct when deployed.
// @ts-nocheck
declare const Deno: any;
declare const fetch: any;
declare const Response: any;

import { serve } from 'std/server'

serve(async (req) => {
  // Handle preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const body = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

    const tokenUrl = supabaseUrl.replace(/\/$/, '') + '/auth/v1/token?grant_type=password'

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
      },
      body: JSON.stringify(body),
    })

    let data = {}
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    })
  }
})
