document.addEventListener('DOMContentLoaded', function () {
    var placeholder = document.getElementById('maps-lazy-placeholder');
    if (!placeholder) return;
    var observer = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var iframe = document.createElement('iframe');
                iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173.58988517496388!2d6.325299725519681!3d45.88254913605064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478bf3e5a605a275%3A0xebba492aca414ddc!2sLe%20salon%20de%20Fred!5e0!3m2!1sfr!2sfr!4v1760686765123!5m2!1sfr!2sfr";
                iframe.width = "600";
                iframe.height = "300";
                iframe.allowFullscreen = true;
                iframe.loading = "lazy";
                iframe.referrerPolicy = "no-referrer-when-downgrade";
                iframe.title = "Localisation du Salon de Fred - 6 Rue de la Saulne, Thônes";
                iframe.setAttribute('aria-label', "Carte interactive montrant l'emplacement du salon");
                iframe.sandbox = "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox";
                iframe.className = "maps-iframe";
                placeholder.parentNode.replaceChild(iframe, placeholder);
                obs.disconnect();
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });
    observer.observe(placeholder);
});
