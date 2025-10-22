// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Service Worker enregistré avec succès
        }).catch(function (registrationError) {
            // Échec d'enregistrement du Service Worker
        });
    });
}