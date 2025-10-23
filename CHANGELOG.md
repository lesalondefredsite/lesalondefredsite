# Changelog - Le Salon de Fred

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [4.0.0] - 2025-10-23

### 🔒 Sécurité
- **CSP optimisée** : Hash SHA-256 inutile retiré
- **Sandbox iframe** : `allow-same-origin` retiré pour éviter contournement
- **SRI préparé** : Attribut `integrity` ajouté sur CSS (hash à générer)

### ⚡ Performance
- **Service Worker v4** : Stratégie hybride
  - Cache First pour assets statiques (CSS, JS, images)
  - Network First pour HTML
  - Gestion d'erreur complète avec fallback
- **CSS optimisé** : `translateZ(0)` ajouté sur animations pour GPU
- **Preload simplifié** : Une seule balise au lieu de trois

### ♿ Accessibilité
- **IDs SVG uniques** : Tous les SVG ont des IDs différents
- **Footer landmark** : Ajout de `role="contentinfo"`
- **Bouton dupliqué** : Texte différencié "Appeler le salon"

### 🐛 Corrections
- **Date sitemap** : 2025-10-22 → 2024-10-22
- **Manifest** : Icônes shortcuts pointent vers logo-180x180.png (existant)
- **Open Graph** : Image pointe vers introDesktop-opt2.webp (existant)
- **Meta robots** : Balise redondante retirée
- **Classe CSS** : `.btn-call-spaced` supprimée (inutilisée)

### 📱 PWA
- **Service Worker** : Logs améliorés pour débogage
- **Registration** : Vérification mise à jour automatique toutes les heures
- **Offline fallback** : Page HTML d'erreur 503 en cas d'échec

### 💻 Code
- **CSS unifié** : Plus de doublon style.css/style.min.css
- **JavaScript** : Logs console ajoutés dans sw-register.js
- **Commentaires** : Documentation améliorée dans tous les fichiers

---

## [3.0.0] - 2024-10-22

### 🆕 Ajouté
- **manifest.json** : Progressive Web App complète
- **Métadonnées Apple PWA** pour iOS
- **openingHoursSpecification** détaillée dans JSON-LD
- **role="img"** et `<title>` sur tous les SVG
- **.htaccess** avec optimisations (référence)

### 🔧 Modifié
- **Service Worker v3** : Stratégie Network First
- **CSP** : Retrait du hash SHA-256 incorrect
- **CSS** : Minification (8.6KB → 6.7KB, -23%)

### 🐛 Corrigé
- Hash SHA-256 incorrect dans CSP
- Horaires manquants dans données structurées
- SVG sans accessibilité

---

## [2.0.0] - Date antérieure

### Fonctionnalités précédentes
- Site responsive
- Images WebP optimisées
- Service Worker v2
- Données structurées JSON-LD
- Open Graph et Twitter Cards

---

## [1.0.0] - Lancement initial

### Première version
- Site vitrine basique
- Informations de contact
- Horaires
- Services (Femme/Homme/Enfant)