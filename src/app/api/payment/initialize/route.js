import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Optional route protection (keep or remove based on your logic)
    const sessionToken = req.headers.get("session");
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, amount, metadata } = await req.json();

    // ✅ Use fallback in case NEXT_PUBLIC_BASE_URL is not available (safety net)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://temitope-supermarket.com";
    const callback_url = `${baseUrl}/payment/success`;

    console.log("🔁 Paystack callback_url:", callback_url);

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
        callback_url, // ✅ Correct callback sent to Paystack
      }),
    });

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status) {
      console.error("❌ Paystack Error:", data);
      return NextResponse.json({ error: "Paystack failed to initialize" }, { status: 500 });
    }

    // ✅ Return only what's needed by the frontend
    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("❌ Payment init error:", error.message || error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
