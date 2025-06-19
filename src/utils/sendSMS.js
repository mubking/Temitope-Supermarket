// utils/sendSMS.js
export async function sendSMS({ to, message }) {
  // Convert Nigerian number from 090... to 23490...
  const formattedTo = to.startsWith("0") ? "234" + to.slice(1) : to;

  const response = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: formattedTo,
      sms: message,
      type: "plain",
      channel: "generic",
      api_key: process.env.TERMII_API_KEY,
      from: "N-Alert" // Optional: must be active. Remove if not approved.
    })
  });

  const data = await response.json();
  console.log("📨 Termii SMS Response:", data);

  if (data.code !== "ok") {
    throw new Error(`Termii error: ${data.message || "Unknown error"}`);
  }

  return data;
}
