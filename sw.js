const CACHE_NAME = 'echo-os-cache-v5';
const ASSETS = [
  '/',
  '/pages/index.html',
  '/pages/profile/',
  '/pages/profile/index.html',
  '/pages/services/',
  '/pages/services/index.html',
  '/pages/projects/',
  '/pages/projects/index.html',
  '/pages/resume/',
  '/pages/resume/index.html',
  '/pages/pricing/',
  '/pages/pricing/index.html',
  '/pages/connect/',
  '/pages/connect/index.html',
  '/pages/directory/',
  '/pages/directory/index.html',
  '/pages/blog/',
  '/pages/blog/index.html',
  '/pages/docs/',
  '/pages/docs/index.html',
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

// Fetch Event (Stale-While-Revalidate Strategy for most, Network-First for CSS)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Special handling for CSS to ensure it's always fresh
  if (url.pathname.endsWith('.css')) {
    event.respondWith(
      fetch(event.request)
        .then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

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
