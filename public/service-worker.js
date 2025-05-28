importScripts('https://js.pusher.com/beams/service-worker.js');
// Basic empty service worker
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/logo.png",
  });
});
