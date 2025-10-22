# Changelog - Le Salon de Fred

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [3.0.0] - 2025-10-22

### 🆕 Ajouté
- **manifest.json** : Progressive Web App complète
  - Icônes multiples (16x16 à 512x512)
  - Screenshots du salon
  - Shortcuts pour RDV et horaires
  - Mode standalone
- **Métadonnées Apple PWA** pour iOS
- **openingHoursSpecification** détaillée dans JSON-LD
- **role="img"** et `<title>` sur tous les SVG
- **IDs uniques** pour chaque SVG (accessibilité)
- **.htaccess** avec optimisations (référence)

### 🔧 Modifié
- **Service Worker v3** : Stratégie Network First
  - Gestion d'erreur robuste
  - Fallback intelligent sur cache
  - skipWaiting() et clients.claim()
  - Filtre sur requêtes externes
- **CSP** : Retrait du hash SHA-256 inutile
- **CSS** : Minification (8.6KB → 6.7KB, -23%)
- **Cache version** : v2 → v3

### 🐛 Corrigé
- Hash SHA-256 incorrect dans Content Security Policy
- Horaires manquants dans données structurées
- SVG sans accessibilité pour lecteurs d'écran
- Service Worker sans gestion d'erreur réseau

### 📈 Améliorations
- **Sécurité** : CSP stricte sans hash inutile
- **Performance** : CSS 23% plus léger
- **Accessibilité** : Score WCAG amélioré
- **SEO** : Données structurées complètes
- **PWA** : Installable et mode hors ligne

---

## [2.0.0] - Date antérieure

### Fonctionnalités précédentes
- Site responsive (mobile/tablette/desktop)
- Images WebP optimisées
- Service Worker v2 (cache-first)
- Données structurées JSON-LD de base
- Open Graph et Twitter Cards
- Google Maps intégré
- Réseaux sociaux (Facebook/Instagram)

---

## [1.0.0] - Lancement initial

### Première version
- Site vitrine basique
- Informations de contact
- Horaires
- Services (Femme/Homme/Enfant)
