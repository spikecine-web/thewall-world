import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iiccldgmzgynyufjlhhw.supabase.co',
  'PASTE_YOUR_EYJ_ANON_KEY_HERE'
);

export async function POST(request) {
  try {
    const { orderID, tile } = await request.json();
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;
    const auth = Buffer.from(clientId + ':' + secret).toString('base64');

    const capture = await fetch('https://api.paypal.com/v2/checkout/orders/' + orderID + '/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth,
      },
    });
    const result = await capture.json();

    if (result.status !== 'COMPLETED') {
      return Response.json({ error: 'Payment not completed', details: result }, { status: 400 });
    }

    const { data, error } = await supabase.from('tiles').insert([{
      ...tile,
      paypal_transaction_id: orderID,
    }]).select();

    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ success: true, data });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
