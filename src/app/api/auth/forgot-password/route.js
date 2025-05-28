import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();
  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "No user with that email." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Generate token and expiry
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpires = Date.now() + 1000 * 60 * 15; // 15 minutes

  user.resetToken = resetToken;
  user.resetTokenExpires = resetTokenExpires;
  await user.save();

  // Email config (using Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password",
    html: `<p>Hello ${user.firstName || "User"},</p>
           <p>You requested to reset your password. Click below:</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>This link expires in 15 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
