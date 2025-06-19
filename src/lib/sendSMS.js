// lib/sendSMS.js
import axios from "axios";

export async function sendSMS({ to, message }) {
  try {
    const response = await axios.post(
      "https://api.ng.termii.com/api/sms/send",
      {
        to,
        from: "N-Alert", // use "N-Alert" or a verified sender
        sms: message,
        type: "plain",
        channel: "generic",
        api_key: process.env.TERMII_API_KEY,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    console.log("📨 Termii SMS Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
    throw new Error("SMS failed to send");
  }
}
