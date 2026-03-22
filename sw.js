const CACHE_NAME = 'jeshrohn-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './assets/new_jeshrohn_logo.jpg',
  './assets/bot_avatar.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
