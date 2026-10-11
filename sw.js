const CACHE_NAME = 'mecapl-v1';
const ASSETS = [
  'index.html',
  'flier.html',
  'storefront.html',
  'pharmacy_portal.html',
  'reference_submission.html',
  'app_config.json'
];

// Install Lifecycle Event - Caches Core System Modules for Offline Field Use
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Lifecycle Event - Purges Deprecated Cache Buffers
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => { if(key !== CACHE_NAME) return caches.delete(key); })
      );
    }).then(() => self.clients.claim())
  );
});

// Background Listener for Incoming Corporate Server Push Notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.text() : 'MECAPL SECURITY: Inbound Doorstep Diagnostic Request Logged.';
  const options = {
    body: data,
    icon: 'icon.png',
    badge: 'icon.png',
    vibrate:,
    actions: [
      { action: 'explore', title: '🔓 Access Director Control Console' }
    ]
  };
  e.waitUntil(
    self.registration.showNotification('🔬 MECAPL CORE INTERCEPT', options)
  );
});
