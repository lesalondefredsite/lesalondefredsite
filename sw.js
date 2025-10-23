// Service Worker v4 - Stratégie hybride optimisée
// Cache First pour assets statiques, Network First pour HTML

// Pour forcer l'invalidation du cache lors d'un changement de fichier, ajoute le hash du CSS ici :
const CSS_HASH = 'FImzcM7mCafKcnHKWcK/eCkflQPDB9vouArO6dMMIACPNWI7uxWVbUWRc6JAo090';
const CACHE_NAME = 'lesalondefred-v4-' + CSS_HASH;
const OFFLINE_PAGE = '/offline.html';

const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.min.css',
    '/js/sw-register.js',
    '/js/structured-data.js',
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
                console.log('[SW] Mise en cache des ressources');
                return cache.addAll(urlsToCache);
            })
            .catch(function (error) {
                console.error('[SW] Erreur lors de la mise en cache:', error);
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
                        console.log('[SW] Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Prend le contrôle immédiatement
    return self.clients.claim();
});

// Stratégie hybride : Cache First pour assets, Network First pour HTML
self.addEventListener('fetch', function (event) {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorer les requêtes non-GET et externes
    if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
        return;
    }

    // Déterminer le type de ressource
    const isStaticAsset = url.pathname.match(/\.(css|js|webp|png|jpg|jpeg|svg|woff2|woff|ttf)$/i);
    const isHTML = request.headers.get('accept')?.includes('text/html');

    if (isStaticAsset) {
        // CACHE FIRST pour les assets statiques (CSS, JS, images, fonts)
        event.respondWith(
            caches.match(request).then(function (cachedResponse) {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si pas en cache, fetcher et mettre en cache
                return fetch(request).then(function (networkResponse) {
                    // Vérifier que la réponse est valide
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(function () {
                    console.log('[SW] Asset non disponible:', url.pathname);
                    return new Response('Asset non disponible', { status: 404 });
                });
            })
        );
    } else {
        // NETWORK FIRST pour HTML et autres requêtes
        event.respondWith(
            fetch(request)
                .then(function (networkResponse) {
                    // Vérifier si la réponse est valide
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    // Cloner et mettre en cache
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(request, responseToCache);
                    });

                    return networkResponse;
                })
                .catch(function (error) {
                    console.log('[SW] Erreur réseau, fallback cache:', error);

                    // Fallback sur le cache
                    return caches.match(request).then(function (cachedResponse) {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Si c'est du HTML et pas de cache, retourner la page d'accueil
                        if (isHTML) {
                            return caches.match('/index.html').then(function (indexPage) {
                                return indexPage || new Response(
                                    '<html><body><h1>Hors ligne</h1><p>Veuillez vérifier votre connexion internet.</p></body></html>',
                                    {
                                        headers: { 'Content-Type': 'text/html' },
                                        status: 503
                                    }
                                );
                            });
                        }

                        // Pour les autres types, retourner une erreur 503
                        return new Response('Service temporairement indisponible', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
                })
        );
    }
});