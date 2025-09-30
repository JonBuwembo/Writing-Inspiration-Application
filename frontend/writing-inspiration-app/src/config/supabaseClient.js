import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Note the consistent naming

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Missing Supabase configuration!
    Required environment variables:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
    
    Found variables starting with VITE_:
    ${Object.keys(import.meta.env)
      .filter(key => key.startsWith('VITE_'))
      .join(', ')}
  `);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  // third argument for options
  auth: {
    persistSession: true, // Ensure session persistence
    autoRefreshToken: true, // Automatically refresh tokens
    detectSessionInUrl: true
  }
});


supabase.auth.getSession()
  .then(({ data }) => console.log('Supabase connected:', data.session ? 'Authenticated' : 'No active session'))
  .catch(err => console.error('Supabase connection failed:', err));

export default supabase;