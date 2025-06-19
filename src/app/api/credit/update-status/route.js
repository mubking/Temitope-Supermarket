// app/api/credit/update-status/route.js
import { connectToDB } from "@/utils/db";
import CreditApplication from "@/models/CreditApplication";
import { sendSMS } from "@/lib/sendSMS";

export async function POST(req) {
  try {
    const { email, newStatus } = await req.json();

    if (!email || !newStatus) {
      return new Response(JSON.stringify({ error: "Email and newStatus are required" }), { status: 400 });
    }

    await connectToDB();

    const application = await CreditApplication.findOneAndUpdate(
      { email },
      { creditStatus: newStatus },
      { new: true }
    );

    if (!application) {
      return new Response(JSON.stringify({ error: "Application not found" }), { status: 404 });
    }

    const phone = formatPhone(application.phone);
    const name = application.firstName || "Customer";

    const message =
      newStatus === "Approved"
        ? `Hi ${name}, your credit application has been APPROVED! Please Visit your dashboard for more info.`
        : newStatus === "Rejected"
        ? `Hi ${name}, we're sorry to inform you that your credit application was REJECTED.`
        : `Hi ${name}, your credit status was updated to: ${newStatus}.`;

    await sendSMS({ to: phone, message });

    return new Response(JSON.stringify({ success: true, application }), { status: 200 });

  } catch (err) {
    console.error("Error updating credit status:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

function formatPhone(phone) {
  return phone?.startsWith("0") ? "234" + phone.slice(1) : phone;
}
