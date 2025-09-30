// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
console.log("Hello from Functions!")

serve(async (req: Request) => {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  const url = "https://spxqzbreozpnsniujyyb.supabase.co/auth/v1/token";
  const resp = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  const text = await resp.text();
  return new Response(text, { status: resp.status, headers });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/cors-proxy' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
