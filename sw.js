const CACHE_NAME = 'echo-os-cache-v7-reset';

// Nuclear Reset: Clear all caches and get out of the way
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Pass-through fetch (No caching, just network)
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
