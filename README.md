
# Le Salon de Fred

Site vitrine du salon de coiffure à Thônes (74230).

## Fonctionnalités principales

- Sécurité renforcée (CSP, sandbox iframe, SRI, liens externes sécurisés)
- Performance optimisée (Service Worker, cache, CSS minifié, preload)
- Accessibilité WCAG 2.1 AA (navigation clavier, focus visible, ARIA, contraste)
- SEO avancé (données structurées, sitemap, Open Graph, Twitter Cards)
- PWA installable (manifest, offline, standalone)

## Déploiement

1. Générer le hash SRI pour le CSS :
  ```bash
  openssl dgst -sha384 -binary css/style.min.css | openssl base64 -A
  ```
2. Mettre à jour le hash dans `index.html`
3. Commit & push :
  ```bash
  git add .
  git commit -m "fix: corrections audit"
  git push origin main
  ```

## Maintenance

- Vérifier horaires et photos
- Mettre à jour liens réseaux sociaux
- Surveiller Google Search Console
- Tester sur mobiles/tablettes
- Incrémenter `CACHE_NAME` dans `sw.js` après chaque modification importante

## Contact

- **Adresse** : 6 Rue de la Saulne, 74230 Thônes  
- **Téléphone** : 04 50 02 03 01  
- **Facebook** : facebook.com/lesalondefred  
- **Instagram** : instagram.com/lesalondefred

## Technologies

- HTML5, CSS3, JavaScript vanilla
- WebP, PWA, JSON-LD
- Hébergement : GitHub Pages

© 2024 Le Salon de Fred  