# Guide de Déploiement - GitHub Pages

## 📋 Pré-requis

- Compte GitHub
- Repository `lesalondefredsite`
- Domaine personnalisé configuré (lesalondefred.fr)
- OpenSSL installé (pour générer le hash SRI)

## 🚀 Déploiement version 4.0

### 1. Générer le hash SRI pour le CSS

```bash
# Générer le hash SHA-384 du fichier CSS minifié
openssl dgst -sha384 -binary css/style.min.css | openssl base64 -A

# Exemple de sortie :
# 4Rh7X9kMvE3... (hash de ~64 caractères)
```

### 2. Mettre à jour index.html

```html
<!-- Remplacer cette ligne dans index.html -->
<link rel="stylesheet" href="css/style.min.css" 
      integrity="sha384-PLACEHOLDER_HASH_TO_GENERATE" 
      crossorigin="anonymous">

<!-- Par -->
<link rel="stylesheet" href="css/style.min.css" 
      integrity="sha384-VOTRE_HASH_GENERE_ICI" 
      crossorigin="anonymous">
```

### 3. Pousser les modifications

```bash
git add .
git commit -m "v4.0.0: corrections audit sécurité, performance et accessibilité"
git push origin main
```

### 4. Configuration GitHub Pages

1. Aller dans **Settings** → **Pages**
2. Source : `Deploy from a branch`
3. Branch : `main` / `root`
4. Domaine personnalisé : `lesalondefred.fr`
5. ✅ Enforce HTTPS

### 5. Vérification du CNAME

Le fichier `CNAME` doit contenir :
```
lesalondefred.fr
```

### 6. Configuration DNS (chez votre registrar)

#### Type A Records (IPv4)
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### Type AAAA Records (IPv6 - optionnel)
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

#### Type CNAME Record (si sous-domaine www)
```
www → votre-username.github.io
```

## ✅ Tests Post-Déploiement

### Performance (score attendu : 90-95)
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://lesalondefred.fr --view

# PageSpeed Insights
# https://pagespeed.web.dev/?url=https://lesalondefred.fr
```

### SEO (score attendu : 100)
- [ ] [Google Search Console](https://search.google.com/search-console)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Accessibilité (score attendu : 98-100)
- [ ] [WAVE](https://wave.webaim.org/)
- [ ] [axe DevTools](https://www.deque.com/axe/devtools/)
- [ ] Lighthouse Accessibility

### PWA (score attendu : 95-100)
- [ ] Installation possible sur mobile
- [ ] Mode hors ligne fonctionnel
- [ ] [PWA Builder](https://www.pwabuilder.com/)
- [ ] Chrome DevTools > Application > Manifest

### Sécurité (score attendu : A+)
- [ ] [Mozilla Observatory](https://observatory.mozilla.org/)
- [ ] [Security Headers](https://securityheaders.com/)
- [ ] [SSL Labs](https://www.ssllabs.com/ssltest/)

## 🔍 Validation des fichiers

### HTML
```bash
# Validation W3C
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.w3.org/nu/?out=gnu
```

### JSON-LD (données structurées)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results](https://search.google.com/test/rich-results)

### Manifest PWA
```bash
# Dans Chrome DevTools
# Application > Manifest
# Vérifier les erreurs et avertissements
```

### Service Worker
```javascript
// Console navigateur
navigator.serviceWorker.getRegistrations().then(regs => {
    console.log('Service Workers actifs:', regs.length);
    regs.forEach(reg => console.log('Scope:', reg.scope));
});
```

## 📊 Monitoring

### Google Analytics (si configuré)
- Trafic en temps réel
- Pages les plus visitées
- Taux de rebond
- Temps de chargement

### Google Search Console
- Indexation des pages
- Erreurs d'exploration
- Requêtes de recherche
- Core Web Vitals
- Mobile Usability

### Vérifications manuelles
```bash
# Vérifier que le Service Worker est actif
curl -I https://lesalondefred.fr/ | grep -i cache

# Vérifier les headers de sécurité (limités sur GitHub Pages)
curl -I https://lesalondefred.fr/ | grep -i security

# Vérifier le certificat SSL
echo | openssl s_client -connect lesalondefred.fr:443 2>/dev/null | openssl x509 -noout -dates
```

## 🔄 Mises à jour du Service Worker

### Après chaque modification importante

1. **Modifier `sw.js`**
```javascript
// Incrémenter le numéro de version
const CACHE_NAME = 'lesalondefred-v5'; // v4 → v5
```

2. **Commiter et pousser**
```bash
git add sw.js
git commit -m "chore: bump Service Worker cache to v5"
git push origin main
```

3. **Vérifier la mise à jour**
- Ouvrir le site dans Chrome
- F12 → Application → Service Workers
- Cliquer sur "Update" si nécessaire
- Vérifier dans la console : `[SW] Mise à jour détectée`

### Forcer la mise à jour pour les utilisateurs

Le Service Worker se met à jour automatiquement, mais peut prendre jusqu'à 24h.

**Option 1 : Notification utilisateur**
```javascript
// Dans sw-register.js (déjà implémenté)
function showUpdateNotification() {
    if (confirm('Une nouvelle version est disponible. Rafraîchir ?')) {
        window.location.reload();
    }
}
```

**Option 2 : Auto-reload (à utiliser avec précaution)**
```javascript
// Dans sw.js
self.addEventListener('activate', event => {
    event.waitUntil(
        clients.claim().then(() => {
            return clients.matchAll({ type: 'window' });
        }).then(clients => {
            clients.forEach(client => client.navigate(client.url));
        })
    );
});
```

## 🐛 Débogage

### Service Worker ne se met pas à jour

**Solution 1 : Désinscrire manuellement**
```javascript
// Console navigateur
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
    window.location.reload();
});
```

**Solution 2 : Hard refresh**
- Chrome : `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
- Firefox : `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)

### Vider le cache

**Console navigateur**
```javascript
caches.keys().then(names => {
    names.forEach(name => {
        console.log('Suppression cache:', name);
        caches.delete(name);
    });
}).then(() => {
    console.log('Tous les caches supprimés');
});
```

**Chrome DevTools**
- F12 → Application → Storage → Clear storage
- Cocher "Service Workers" et "Cache Storage"
- Cliquer sur "Clear site data"

### Erreurs CSP

**Console navigateur**
```
Refused to load script... violates Content Security Policy...
```

**Solution :**
1. Identifier la ressource bloquée
2. Vérifier que la source est dans la CSP
3. Mettre à jour la balise `<meta http-equiv="Content-Security-Policy">`

### Images ne se chargent pas

**Vérifier dans DevTools :**
- Network → vérifier le code HTTP (200, 404, etc.)
- Console → erreurs CORS ou CSP
- Elements → `srcset` et `sizes` corrects

## 📞 Support

### Resources utiles
- [Documentation GitHub Pages](https://docs.github.com/pages)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

### En cas de problème
1. Vérifier les [GitHub Status](https://www.githubstatus.com/)
2. Consulter les logs de déploiement (Actions → Pages build)
3. Ouvrir une issue sur le repository

## 🎯 Checklist finale

Avant de considérer le déploiement terminé :

### Fonctionnel
- [ ] Site accessible sur https://lesalondefred.fr
- [ ] Toutes les images se chargent
- [ ] Liens téléphone/réseaux sociaux fonctionnent
- [ ] Google Maps s'affiche correctement
- [ ] Navigation entre sections fluide

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Service Worker actif
- [ ] Images WebP chargées
- [ ] CSS minifié chargé

### SEO
- [ ] Lighthouse SEO = 100
- [ ] Sitemap soumis à Google Search Console
- [ ] Données structurées validées
- [ ] Open Graph testé (Facebook Debugger)

### Accessibilité
- [ ] Lighthouse Accessibility > 95
- [ ] Navigation au clavier complète
- [ ] Lecteur d'écran fonctionnel (NVDA/JAWS)
- [ ] Contraste validé

### PWA
- [ ] Installable sur mobile
- [ ] Mode hors ligne fonctionne
- [ ] Manifest valide
- [ ] Service Worker cache les assets

### Sécurité
- [ ] HTTPS activé
- [ ] CSP configurée
- [ ] Sandbox iframe sécurisé
- [ ] Liens externes avec noopener noreferrer

---

**Date de dernière mise à jour** : 23 octobre 2024  
**Version du guide** : 4.0  
**Prochaine révision** : Janvier 2025