# Guide de Déploiement - GitHub Pages

## 📋 Pré-requis

- Compte GitHub
- Repository `lesalondefredsite`
- Domaine personnalisé configuré (lesalondefred.fr)

## 🚀 Déploiement

### 1. Pousser les modifications

```bash
git add .
git commit -m "feat: améliorations PWA, accessibilité et performance"
git push origin main
```

### 2. Configuration GitHub Pages

1. Aller dans **Settings** → **Pages**
2. Source : `Deploy from a branch`
3. Branch : `main` / `root`
4. Domaine personnalisé : `lesalondefred.fr`
5. ✅ Enforce HTTPS

### 3. Vérification du CNAME

Le fichier `CNAME` doit contenir :
```
lesalondefred.fr
```

### 4. Configuration DNS (chez votre registrar)

#### Type A Records
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### Type CNAME Record (si www)
```
www → lesalondefredsite.github.io
```

## ✅ Tests Post-Déploiement

### Performance
- [ ] Lighthouse (score > 90)
- [ ] PageSpeed Insights
- [ ] WebPageTest

### SEO
- [ ] Google Search Console
- [ ] Rich Results Test
- [ ] Mobile-Friendly Test

### Accessibilité
- [ ] WAVE (Web Accessibility Evaluation)
- [ ] axe DevTools
- [ ] Lighthouse Accessibility (score > 95)

### PWA
- [ ] Installation possible sur mobile
- [ ] Mode hors ligne fonctionnel
- [ ] Manifest valide
- [ ] Service Worker actif

### Sécurité
- [ ] Mozilla Observatory
- [ ] Security Headers
- [ ] SSL Labs

## 🔍 Outils de Test

### Performance
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://lesalondefred.fr --view
```

### Validation HTML
- https://validator.w3.org/
- https://validator.w3.org/feed/

### Validation Schema.org
- https://validator.schema.org/
- https://search.google.com/test/rich-results

### Test PWA
- https://www.pwabuilder.com/
- Chrome DevTools > Application > Manifest

## 📊 Monitoring

### Google Analytics (si configuré)
- Trafic en temps réel
- Pages les plus visitées
- Taux de rebond

### Google Search Console
- Indexation
- Erreurs d'exploration
- Requêtes de recherche
- Core Web Vitals

## 🔄 Mises à jour

### Incrémenter le cache du Service Worker

Après chaque modification :

1. Ouvrir `sw.js`
2. Changer `CACHE_NAME` :
   ```javascript
   const CACHE_NAME = 'lesalondefred-v4'; // v3 → v4
   ```
3. Commiter et pousser

### Forcer le rafraîchissement

Les utilisateurs verront les changements :
- Au prochain chargement de page
- Après fermeture/réouverture du navigateur
- Le Service Worker se met à jour automatiquement

## 🐛 Débogage

### Service Worker ne se met pas à jour
```javascript
// Dans la console navigateur
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

### Vider le cache
```javascript
// Console navigateur
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

### Vérifier les erreurs CSP
Ouvrir la Console → vérifier les erreurs de sécurité

## 📞 Support

Pour toute question technique :
- GitHub Issues : https://github.com/lesalondefredsite/lesalondefredsite/issues
- Documentation GitHub Pages : https://docs.github.com/pages
