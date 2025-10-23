// Service Worker Registration avec gestion d'erreur améliorée
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('[SW] Enregistrement réussi, portée:', registration.scope);

                // Vérifier les mises à jour toutes les heures
                setInterval(() => {
                    registration.update();
                }, 3600000);

                // Écouter les mises à jour du Service Worker
                registration.addEventListener('updatefound', function () {
                    const newWorker = registration.installing;
                    console.log('[SW] Mise à jour détectée');

                    newWorker.addEventListener('statechange', function () {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[SW] Nouvelle version disponible, rechargez la page');
                            // Optionnel : Afficher une notification à l'utilisateur
                            // showUpdateNotification();
                        }
                    });
                });
            })
            .catch(function (error) {
                console.error('[SW] Échec d\'enregistrement:', error);
            });

        // Écouter les messages du Service Worker
        navigator.serviceWorker.addEventListener('message', function (event) {
            console.log('[SW] Message reçu:', event.data);
        });
    });
}

// Fonction optionnelle pour notifier l'utilisateur d'une mise à jour
function showUpdateNotification() {
    if (confirm('Une nouvelle version du site est disponible. Voulez-vous rafraîchir la page ?')) {
        window.location.reload();
    }
}