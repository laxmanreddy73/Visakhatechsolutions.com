const CACHE_NAME = 'vts-dynamic-cache-v3'; // Changed version
const ASSETS = [
  '/',
  '/fonts/archivo.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS)) // Only cache essential assets
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy for HTML
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Update cache with fresh response
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Fallback to cache only if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-first for assets
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
    );
  }
});

// Aggressive cache cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete ALL old caches, not just different named ones
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Force claim clients to ensure immediate control
      return self.clients.claim();
    })
  );
});