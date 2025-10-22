// Service Worker optimisé pour GitHub Pages
// Cache les ressources statiques pour améliorer les performances

const CACHE_NAME = 'lesalondefred-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.min.css',
    '/js/sw-register.js',
    '/images/salon/introMobile-hq.webp',
    '/images/salon/introTablette.webp',
    '/images/salon/introDesktop-opt2.webp',
    '/images/logo/logoMobile-hq.webp',
    '/images/logo/logoTablette.webp',
    '/images/logo/logoDesktop.webp',
    '/images/gens/FEMMEMobile.webp',
    '/images/gens/ENFANTMobile.webp',
    '/images/gens/HOMMEMobile.webp',
    '/manifest.json'
];

// Installation du service worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
            .catch(function (error) {
                console.error('Erreur lors de la mise en cache:', error);
            })
    );
    // Force le nouveau SW à devenir actif immédiatement
    self.skipWaiting();
});

// Nettoyage des anciens caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Prend le contrôle immédiatement
    return self.clients.claim();
});

// Stratégie Network First avec fallback cache pour une meilleure fraîcheur
self.addEventListener('fetch', function (event) {
    // Ignorer les requêtes non-GET et externes (Google Maps, etc.)
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                // Vérifier si la réponse est valide
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Cloner la réponse pour la mettre en cache
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(function () {
                // En cas d'échec réseau, fallback sur le cache
                return caches.match(event.request)
                    .then(function (cachedResponse) {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Si pas de cache, retourner une réponse par défaut pour les pages HTML
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});