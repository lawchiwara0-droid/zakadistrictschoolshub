const CACHE_VERSION = 'zaka-hub-v5-1-exam-test';
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './dummy_english_4005_01.pdf',
  './dummy_literature_4029_01.pdf',
  './dummy_frs_4047_01.pdf',
  './zimsec_olevel_timetable_nov2026.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Some resources failed to cache (this is OK for optional files like PDFs):', err);
        return cache.addAll(urlsToCache.filter(url => !url.includes('.pdf')));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
