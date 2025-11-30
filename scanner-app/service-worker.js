const CACHE_NAME = 'qr-scanner-v1';
const ASSETS = [
    '/ikigai-qr-scanner',
    '/ikigai-qr-scanner/index.html',
    '/ikigai-qr-scanner/manifest.json',
    '/ikigai-qr-scanner/icon.png',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
