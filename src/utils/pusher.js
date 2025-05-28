import PushNotifications from '@pusher/push-notifications-server';

export const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_BEAMS_INSTANCE_ID,
  secretKey: process.env.PUSHER_BEAMS_SECRET_KEY,
});
