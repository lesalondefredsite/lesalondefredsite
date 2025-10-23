// Données structurées JSON-LD pour SEO
(function () {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "HairSalon",
        "name": "Le Salon de Fred",
        "logo": "https://lesalondefred.fr/images/logo/logo-512x512.png",
        "image": "https://lesalondefred.fr/images/salon/introDesktop-opt2.webp",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue de la Saulne",
            "addressLocality": "Thônes",
            "postalCode": "74230",
            "addressCountry": "FR",
            "addressRegion": "Haute-Savoie"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "45.882568623264596",
            "longitude": "6.325528650170037"
        },
        "telephone": "+33 4 50 02 03 01",
        "url": "https://lesalondefred.fr/",
        "sameAs": [
            "https://facebook.com/lesalondefred",
            "https://instagram.com/lesalondefred"
        ],
        "openingHours": [
            "Tu 08:30-12:00",
            "Tu 14:00-18:30",
            "We 08:30-12:00",
            "We 14:00-18:30",
            "Th 08:30-12:00",
            "Fr 08:30-18:30"
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday"],
                "opens": "08:30",
                "closes": "12:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday"],
                "opens": "14:00",
                "closes": "18:30"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Thursday",
                "opens": "08:30",
                "closes": "12:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Friday",
                "opens": "08:30",
                "closes": "18:30"
            }
        ],
        "priceRange": "€€",
        "description": "Coiffeur pour femmes, hommes et enfants à Thônes. Prise de rendez-vous, horaires, services et contact.",
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "EUR"
    };

    // Créer et injecter le script JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
})();