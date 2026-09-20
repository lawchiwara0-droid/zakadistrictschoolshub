const CACHE_VERSION = 'zaka-hub-v9-3-district-insights';
const urlsToCache = [
  './',
  './index.html',
  './ed46.html',
  './district-insights.html',
  './data/district-summary.json',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './dummy_english_4005_01.pdf',
  './dummy_literature_4029_01.pdf',
  './dummy_frs_4047_01.pdf',
  './zimsec_olevel_timetable_nov2026.pdf',
  './zimsec_alevel_timetable_nov2026.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(urlsToCache).catch(() => {
        return cache.addAll(urlsToCache.filter(u => !u.includes('.pdf')));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== CACHE_VERSION ? caches.delete(k) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request).catch(() => caches.match('./index.html')))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
