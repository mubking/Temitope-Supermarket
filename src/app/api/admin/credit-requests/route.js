import { connectToDB } from "@/utils/db";
import CreditRequest from "@/models/CreditRequest"; // 👈 Use this model

export async function GET() {
  try {
    await connectToDB();
    const requests = await CreditRequest.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (err) {
    console.error("Error loading credit requests:", err);
    return new Response("Failed to load credit requests", { status: 500 });
  }
}
