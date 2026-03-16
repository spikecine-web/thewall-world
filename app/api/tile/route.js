import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iiccldgmzgynyufjlhhw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpY2NsZGdtemd5bnl1ZmpsaGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjM3NzcsImV4cCI6MjA4ODgzOTc3N30.YtRXQ9MBoqCjmyUl412C5mfeqhFByNmWOKHpr_2GIkQ'
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
