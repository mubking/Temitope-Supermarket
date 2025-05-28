import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, amount, metadata } = await req.json();

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      }),
    });

    const data = await paystackRes.json();

    if (!paystackRes.ok) {
      console.error("Paystack API error:", data);
      return NextResponse.json({ error: "Paystack failed to initialize" }, { status: 500 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Paystack init error:", error.message || error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
