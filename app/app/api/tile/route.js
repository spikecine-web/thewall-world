import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iiccldgmzgynyufjlhhw.supabase.co',
  'PASTE_YOUR_EYJ_ANON_KEY_HERE'
);

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.is_subscriber) {
      const { error } = await supabase.from('subscribers').insert([{ email: body.email }]);
      if (error) return Response.json({ error: error.message }, { status: 400 });
      return Response.json({ success: true });
    }
    const { data, error } = await supabase.from('tiles').insert([body]).select();
    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ success: true, data });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('tiles').select('*').order('id');
    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
