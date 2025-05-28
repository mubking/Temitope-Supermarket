// 📁 src/app/api/credit/status/route.js
import { connectToDB } from "@/utils/db";
import CreditApplication from "@/models/CreditApplication";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
  }

  await connectToDB();

  const application = await CreditApplication.findOne({ email });

  if (!application) {
    return new Response(JSON.stringify({ status: "not_found" }), { status: 200 });
  }

 return new Response(JSON.stringify({ application }), { status: 200 });
  
}