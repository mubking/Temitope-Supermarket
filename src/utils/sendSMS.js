// utils/sendSMS.js
export async function sendSMS({ to, message }) {
  const response = await fetch("https://v3.api.termii.com/api/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.TERMII_API_KEY}`,
    },
    body: JSON.stringify({
      to,
      sms: message,
      type: "plain",
      channel: "generic",
      // Remove 'from' if sender ID is not active
    }),
  });

  const data = await response.json();
  console.log("📨 Termii SMS Response:", data);
  return data;
}
