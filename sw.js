// Service Worker minimal pour GitHub Pages
// Cache les ressources statiques pour améliorer les performances

const CACHE_NAME = 'lesalondefred-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/images/salon/introMobile-hq.webp',
    '/images/salon/introTablette.webp',
    '/images/salon/introDesktop-opt2.webp',
    '/images/logo/logoMobile-hq.webp',
    '/images/logo/logoTablette.webp',
    '/images/logo/logoDesktop.webp'
];

// Installation du service worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Stratégie cache-first pour les ressources statiques
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - retourner la réponse
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});