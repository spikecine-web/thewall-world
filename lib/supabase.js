import { createClient } from '@supabase/supabase-js';

let client = null;

export const supabase = new Proxy({}, {
  get(_, prop) {
    if (!client) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        console.warn('Supabase not configured');
        return () => ({ data: null, error: 'Not configured' });
      }
      client = createClient(url, key);
    }
    return client[prop];
  }
});
