import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust path if needed

export async function POST(req) {
  // ✅ Step 1: Protect the route
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, amount, metadata } = await req.json();

    // ✅ Step 2: Call Paystack
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
      console.error("Paystack Error:", data);
      return NextResponse.json({ error: "Paystack initialization failed" }, { status: 500 });
    }

    return NextResponse.json(data.data); // ✅ return authorization_url and reference
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
