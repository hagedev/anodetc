const CACHE_NAME = 'ai-cctv-v1';
const urlsToCache = [
  'anodetc.html',
  'manifest.json',
  // Kita tidak cache file eksternal tensorflow di sini secara agresif 
  // karena ukurannya besar dan sering diupdate oleh CDN, 
  // tapi browser akan menangani cache HTTP standarnya.
];

// Install Event
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event (Offline Capability)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
