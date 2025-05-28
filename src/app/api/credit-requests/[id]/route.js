import { connectToDB } from "@/utils/db";
import CreditRequest from "@/models/CreditRequest";
import { sendEmail } from "@/utils/email";
import { sendPushNotification } from "@/utils/sendPushNotification";
import { sendSMS } from "@/utils/sendSMS";

export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  try {
    await connectToDB();

    const request = await CreditRequest.findById(id);
    if (!request) {
      return new Response("Credit request not found", { status: 404 });
    }

    request.status = status;
    await request.save();

    // Send email
    await sendEmail({
      to: request.email,
      subject: `Your Credit Application has been ${status}`,
      html: `
        <h3>Hello ${request.firstName},</h3>
        <p>Your credit application has been <strong>${status}</strong>.</p>
        <p>Thank you for choosing <strong>Temitope Supermarket</strong>.</p>
      `,
    });

    // Send push notification
    await sendPushNotification({
      title: `Credit ${status}`,
      body: `${request.firstName} ${request.lastName}'s application was ${status.toLowerCase()}.`,
    });

    // Send SMS — NOTE: Only use active sender ID or remove 'from'
    await sendSMS({
      to: request.phone,
      message: `Hello ${request.firstName}, your credit application has been ${status}.`,
    });

    return new Response(JSON.stringify(request), { status: 200 });

  } catch (error) {
    console.error("❌ Update Error:", error);
    return new Response("Failed to update status", { status: 500 });
  }
}
