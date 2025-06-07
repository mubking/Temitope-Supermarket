import { connectToDB } from "@/utils/db";
import AbandonedCart from "@/models/AbandonedCart";
import User from "@/models/User";
import { sendEmail } from "@/utils/email";

export async function GET() {
  await connectToDB();

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const abandonedCarts = await AbandonedCart.find({ updatedAt: { $lt: thirtyMinutesAgo } });

  let sent = 0;

  for (const record of abandonedCarts) {
    const user = await User.findById(record.userId);
    if (user?.email) {
      await sendEmail(user.email, {
        subject: "🛒 Don't forget your cart - Temitope Supermarket",
        html: `
          <p>Hi ${user.firstName || "there"},</p>
          <p>You still have some great items in your cart!</p>
          <p><a href="https://temitopesupermarket.com/cart">Click here to complete your purchase</a></p>
          <p>We saved them for you 😊</p>
        `,
      });

      await AbandonedCart.deleteOne({ userId: user.id });
      sent++;
    }
  }

  return new Response(JSON.stringify({ sent }), { status: 200 });
}
