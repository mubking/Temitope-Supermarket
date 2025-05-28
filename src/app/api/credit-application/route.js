import { connectToDB } from "@/utils/db";
import CreditApplication from "@/models/CreditApplication";
import CreditRequest from "@/models/CreditRequest";
import { sendPushNotification } from "@/utils/sendPushNotification";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDB();

    const existing = await CreditApplication.findOne({ email: body.email });
    if (existing) {
      return new Response("Application already exists", { status: 409 });
    }

    await sendPushNotification({
      title: "📥 New Credit Request",
      body: `${body.firstName} ${body.lastName} just applied for credit.`,
    });

    const savedApp = await CreditApplication.create({
      ...body,
      creditStatus: "Pending",
    });

    await CreditRequest.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      employmentStatus: body.employmentStatus,
      monthlyIncome: body.monthlyIncome,
      idType: body.idType,
      idNumber: body.idNumber,
      agreeToTerms: body.agreeToTerms,
      status: "Pending",
    });

    await sendPushNotification(body);

    return new Response(JSON.stringify(savedApp), { status: 201 });
  } catch (err) {
    console.error("Credit App Save Error:", err);
    return new Response("Failed to submit application", { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { email } = body;

  await connectToDB();
  const existing = await CreditApplication.findOne({ email });

  if (!existing) {
    return new Response("No application found to update", { status: 404 });
  }

  await CreditApplication.updateOne({ email }, { $set: body });
  return new Response("Updated successfully", { status: 200 });
}

