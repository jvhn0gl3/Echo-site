const CACHE_NAME = 'echo-os-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/profile.html',
  '/services.html',
  '/projects.html',
  '/resume.html',
  '/faq.html',
  '/pricing.html',
  '/connect.html',
  '/directory.html',
  '/legal.html',
  '/log.html',
  '/commits.html',
  '/styles.html',
  '/scripts.html',
  '/registry.html',
  '/typography.html',
  '/css/master.css',
  '/js/master.js',
  '/data/links.json',
  '/data/site-content.json',
  '/logo.jpg',
  '/fonts/ShareTechMono-Regular.ttf',
  '/fonts/SpaceMono-Regular.ttf',
  '/fonts/JetBrainsMono-Regular.ttf',
  '/fonts/IBMPlexMono-Regular.ttf',
  '/fonts/FiraCode-Regular.ttf'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SERVICE WORKER] Pre-caching critical assets');
        return cache.addAll(ASSETS);
      })
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
    })
  );
});

// Fetch Event (Cache First, falling back to Network)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            // Optional: Dynamic caching of new requests
            // cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        });
      }).catch(() => {
        // Fallback for offline pages if needed
      })
  );
});
