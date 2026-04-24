const CACHE_NAME = 'echo-os-cache-v6';
const ASSETS = [
  '/',
  '/pages/index.html',
  '/assets/css/master.css',
  '/assets/js/master.js',
  '/assets/data/links.json',
  '/assets/data/site-content.json',
  '/assets/img/logo.jpg',
  '/assets/fonts/ShareTechMono-Regular.ttf',
  '/assets/fonts/SpaceMono-Regular.ttf',
  '/assets/fonts/JetBrainsMono-Regular.ttf',
  '/assets/fonts/IBMPlexMono-Regular.ttf',
  '/assets/fonts/FiraCode-Regular.ttf'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SERVICE WORKER] Pre-caching critical assets');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Special handling for CSS to ensure it's always fresh and has correct MIME type
  if (url.pathname.endsWith('.css')) {
    const freshRequest = new Request(`${event.request.url}${url.search ? '&' : '?'}t=${Date.now()}`, {
      cache: 'no-store'
    });

    event.respondWith(
      fetch(freshRequest)
        .then(fetchRes => {
          const newHeaders = new Headers(fetchRes.headers);
          newHeaders.set('Content-Type', 'text/css');

          const responseClone = new Response(fetchRes.body, {
            status: fetchRes.status,
            statusText: fetchRes.statusText,
            headers: newHeaders
          });

          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone.clone());
            return responseClone;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Standard Stale-While-Revalidate for other assets
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        const fetchPromise = fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.method === 'GET') {
                cache.put(event.request, fetchRes.clone());
            }
            return fetchRes;
          });
        });
        return cacheRes || fetchPromise;
      })
  );
});
