import pusher from "@/lib/pusher";

await pusher.trigger("orders", "order-updated", {
  orderId: order._id,
  newStatus: status,
});
