// app/api/send-sms/route.js
import { sendSMS } from '@/lib/sendSMS';

export async function POST(req) {
  const { phone, text } = await req.json();

  try {
    const result = await sendSMS(phone, text);
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
