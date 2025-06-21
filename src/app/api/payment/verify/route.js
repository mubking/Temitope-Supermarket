import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 });
    }

    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    
    const paystackRes = await fetch(verifyUrl, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await paystackRes.json();

    if (!result.status) {
      return NextResponse.json({ error: result.message || "Verification failed" }, { status: 400 });
    }

    const data = result.data;

    // Optionally update DB here

    return NextResponse.json({
      status: "success",
      message: "Payment verified",
      data: {
        amount: data.amount,
        email: data.customer.email,
        reference: data.reference,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
