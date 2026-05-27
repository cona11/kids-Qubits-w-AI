const CACHE_NAME = 'quantum-app-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data/lessons.json',
  '/scripts/db.js',
  '/scripts/aiTutor.js',
  '/scripts/lessonsUI.js',
  '/scripts/sync.js',
  '/scripts/qubitSimulator.js',
  '/assets/icon-192.svg',
  '/assets/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).catch(() => caches.match('/index.html')))
  );
});
