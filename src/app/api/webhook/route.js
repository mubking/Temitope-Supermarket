import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { verifyPaystackSignature } from "@/utils/verifyPaystack";

export async function POST(req) {
  const rawBody = await req.text();
  const parsedBody = JSON.parse(rawBody);

  req.body = parsedBody;
  req.headers = Object.fromEntries(req.headers);

  const isValid = verifyPaystackSignature({ body: parsedBody, headers: req.headers });

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  if (parsedBody.event === "charge.success") {
    await connectToDB();

    const { orderId } = parsedBody.data.metadata;

    await Order.findByIdAndUpdate(orderId, {
      status: "Paid",
    });
  }

  return new Response("Webhook received", { status: 200 });
}
