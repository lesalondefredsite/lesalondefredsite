# Le Salon de Fred - Site Web Officiel

Site web vitrine pour Le Salon de Fred, salon de coiffure à Thônes (74230).

## ✨ Version 4.0 - Corrections Audit (Octobre 2025)

### 🔒 Sécurité renforcée
- ✅ CSP optimisée (hash inutile retiré)
- ✅ Sandbox iframe sécurisé (`allow-same-origin` retiré)
- ✅ SRI préparé sur CSS (hash à générer en production)
- ✅ `rel="noopener noreferrer"` sur tous les liens externes

### ⚡ Performance optimisée
- ✅ Service Worker v4 avec stratégie hybride
  - Cache First pour assets statiques (CSS, JS, images)
  - Network First pour HTML
- ✅ Animations GPU avec `translateZ(0)`
- ✅ CSS minifié unique (6.7KB)
- ✅ Preload simplifié

### ♿ Accessibilité WCAG 2.1 AA
- ✅ IDs SVG uniques (4 icônes corrigées)
- ✅ Footer avec `role="contentinfo"`
- ✅ Navigation au clavier optimisée
- ✅ Focus visible amélioré
- ✅ Respect de `prefers-reduced-motion`

### 🎯 SEO Avancé
- ✅ Données structurées JSON-LD complètes
- ✅ Sitemap.xml avec images (date corrigée)
- ✅ Open Graph pointant vers images existantes
- ✅ Twitter Cards
- ✅ Métadonnées géographiques

### 📱 PWA
- ✅ Manifest.json avec icônes existantes
- ✅ Service Worker avec fallback offline
- ✅ Mode standalone
- ✅ Installable sur mobile/desktop

## 📊 Scores Lighthouse estimés

| Critère | Score | Amélioration |
|---------|-------|--------------|
| Performance | 90-95 | +5 points |
| Accessibility | 98-100 | +3 points |
| Best Practices | 90-95 | +15 points |
| SEO | 100 | +5 points |
| PWA | 95-100 | +10 points |

## 🎯 Optimisations techniques

### Performance
- Images WebP optimisées
- CSS minifié (-23%)
- Service Worker intelligent
- Preload des ressources critiques (LCP)
- DNS prefetch pour Google Maps
- Lazy loading sur images non-critiques

### Sécurité
- Content Security Policy stricte
- Sandbox iframe sécurisé
- HTTPS activé (GitHub Pages)
- Headers de sécurité (référence .htaccess)

### Accessibilité
- Navigation au clavier complète
- Attributs ARIA appropriés
- Contraste WCAG 2.1 AA
- Textes alternatifs descriptifs
- Langue déclarée (lang="fr")
- Focus visible sur tous les éléments interactifs

## 📞 Informations de contact

**Adresse** : 6 Rue de la Saulne, 74230 Thônes  
**Téléphone** : 04 50 02 03 01  
**Facebook** : facebook.com/lesalondefred  
**Instagram** : instagram.com/lesalondefred

## 🚀 Déploiement

### Prérequis
- Compte GitHub
- Nom de domaine (lesalondefred.fr)
- GitHub Pages activé

### Mise en production

```bash
# 1. Générer le hash SRI pour le CSS
openssl dgst -sha384 -binary css/style.min.css | openssl base64 -A

# 2. Mettre à jour index.html avec le hash
# Remplacer PLACEHOLDER_HASH_TO_GENERATE par le hash généré

# 3. Commiter et pousser
git add .
git commit -m "fix: corrections audit sécurité et performance"
git push origin main
```

### Configuration DNS (Infomaniak)
1. Ajouter un enregistrement CNAME : `lesalondefred.fr` → `votre-username.github.io.`
2. Ou 4 enregistrements A vers les IPs GitHub Pages :
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

### Vérification post-déploiement

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://lesalondefred.fr --view

# Validation HTML
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.w3.org/nu/?out=gnu

# Test PWA
# Chrome DevTools > Application > Manifest
```

## 📝 Maintenance

### À faire régulièrement
- [ ] Vérifier les horaires (changements saisonniers)
- [ ] Mettre à jour les photos de réalisations
- [ ] Vérifier les liens réseaux sociaux
- [ ] Surveiller Google Search Console
- [ ] Tester le site sur mobiles/tablettes

### Service Worker
Après chaque modification importante :
1. Incrémenter `CACHE_NAME` dans `sw.js` (v4 → v5)
2. Commiter et pousser
3. Le SW se mettra à jour automatiquement

### Debug Service Worker

```javascript
// Console navigateur - Désinscrire le SW
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
});

// Vider le cache
caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
});
```

## 🛠️ Technologies utilisées

- **HTML5** sémantique
- **CSS3** avec media queries
- **JavaScript** vanilla (Service Worker)
- **WebP** pour les images
- **Progressive Web App** (PWA)
- **JSON-LD** pour le SEO
- **GitHub Pages** pour l'hébergement

## 📄 Licence

© 2024 Le Salon de Fred - Tous droits réservés

**Version** : 4.0.0  
**Dernière mise à jour** : 23 octobre 2025
**Prochaine révision** : Janvier 2026