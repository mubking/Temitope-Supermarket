import PushNotifications from '@pusher/push-notifications-server';

const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_BEAMS_INSTANCE_ID,
  secretKey: process.env.PUSHER_BEAMS_SECRET_KEY,
});

// This must accept an object with { title, body }
export const sendPushNotification = async ({ title, body }) => {
  await beamsClient.publishToInterests(['admin'], {
    web: {
      notification: {
        title,
        body,
        deep_link: "http://localhost:3000/admin/credit-requests",
      },
    },
  });
};
