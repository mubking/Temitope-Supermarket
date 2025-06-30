const payWithPaystack = async (email) => {
  const orderRes = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "email": `${email}` },
    body: JSON.stringify(payload),
  });
  const order = await orderRes.json();

  const paymentRes = await fetch("/api/payment/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `${form.phone}@temitope.com`,
      amount: calculatedSubtotal,
      metadata: { orderId: order._id },
    }),
  });

  const paymentData = await paymentRes.json();
  window.location.href = paymentData.authorization_url;
};