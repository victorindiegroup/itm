# ITM — Guide complet

Application d'inventaire PWA pour Indie Group.

## Contenu du dossier

```
itm-pwa/
├── index.html              ← l'app (chargée par les chefs de bar)
├── catalogue.json          ← le catalogue produits (à mettre à jour quand tu veux)
├── convertisseur.html      ← OUTIL ADMIN : pour convertir ton CSV Yokitup en catalogue.json
├── manifest.json           ← déclaration PWA
├── sw.js                   ← service worker (mode hors ligne)
├── icon-192.png            ← icône app
├── icon-512.png            ← idem, plus grande
├── icon-192-maskable.png   ← pour Android
├── icon-512-maskable.png   ← idem
├── mascot.png              ← mascotte utilisée dans l'app
└── README.md               ← ce fichier
```

---

## Installation initiale (première fois)

### Étape 1 — GitHub

1. Crée un compte sur https://github.com si tu n'en as pas
2. Crée un nouveau repo : `+` en haut à droite → "New repository" → nom : `itm` → Public → Create repository
3. Upload les 10 fichiers de ce dossier : "Add file" → "Upload files" → glisser-déposer → "Commit changes"

### Étape 2 — Activer GitHub Pages

1. Onglet "Settings" du repo → menu de gauche "Pages"
2. Source : "Deploy from a branch", Branch : `main`, dossier `/` (root) → Save
3. Attendre 1-2 min, l'URL de ton app apparaît : `https://TON-USERNAME.github.io/itm/`

### Étape 3 — Installation sur téléphone

**iPhone** (Safari obligatoire) : URL → icône Partager → "Sur l'écran d'accueil"

**Android** (Chrome) : URL → 3 points → "Installer l'application"

---

## Mettre à jour le catalogue produits

C'est la partie qui te concerne en tant qu'admin. Les chefs de bar n'ont **jamais** besoin de toucher à ça.

### Workflow complet

1. **Exporter depuis Yokitup** — tu exportes le CSV du catalogue complet (celui avec les colonnes `Produit identifiant Yokitup`, `Produit nom`, `Tags`, etc.)

2. **Convertir en JSON** — tu ouvres `convertisseur.html` dans ton navigateur (double-clic sur le fichier). La page te guide :
   - Tu uploades ton CSV
   - Elle analyse automatiquement et t'affiche les stats (nb produits par type, par établissement, overrides appliqués)
   - Tu cliques sur "Télécharger catalogue.json"

3. **Uploader sur GitHub** — dans ton repo ITM :
   - Clique sur le fichier `catalogue.json` existant
   - Icône crayon en haut à droite ("Edit this file")
   - Supprime tout → colle le nouveau contenu → Commit
   
   **OU plus simple** (recommandé pour gros fichiers) :
   - Dans le repo, "Add file" → "Upload files"
   - Glisse le nouveau `catalogue.json` (ça écrase l'ancien)
   - Commit

4. **C'est déployé** — les téléphones récupèrent la nouvelle version au prochain lancement avec réseau. Pas besoin de toucher à l'index.html ni de demander aux chefs de bar de réinstaller.

### Points importants

- Le convertisseur tourne **localement dans ton navigateur**, rien n'est envoyé en ligne
- Les règles appliquées (préfixes B./M./J./etc. → type bouteille, catégorisation par tags, overrides CORONA/GINGER BEER VERSE) sont **identiques** à celles de l'app
- Les overrides sont mémorisés dans `convertisseur.html` — si tu veux en ajouter/supprimer, éditer le fichier manuellement dans la section `OVERRIDES = { ... }`
- Les produits **sans tag d'établissement** sont conservés dans le catalogue mais ne s'affichent dans aucun inventaire (considérés comme archives)

---

## Mettre à jour l'app elle-même

Si on modifie `index.html` (nouvelle fonctionnalité, correction de bug) :

1. Upload le nouveau `index.html` sur GitHub (écrase l'ancien)
2. **Important** : dans `sw.js`, change `CACHE_VERSION = 'itm-v3'` en `'itm-v4'`, `'itm-v5'`, etc. Uploade aussi le sw.js modifié.
3. Les téléphones récupèrent la mise à jour automatiquement au prochain lancement avec réseau (peut prendre 1-2 lancements pour que le service worker détecte la nouvelle version)

---

## Troubleshooting

**L'app affiche "Chargement du catalogue..." indéfiniment**
→ Vérifie que `catalogue.json` est bien présent à la racine du repo GitHub.
→ Regarde la console du navigateur (F12) : tu verras un message d'erreur explicite en cas de souci de fetch.

**Un produit a disparu de l'app après mise à jour catalogue**
→ Vérifie qu'il a bien un tag d'établissement dans Yokitup (INDIE BEACH, ORMEAU, etc.)

**Un préfixe nouveau que le convertisseur ne reconnaît pas**
→ Éditer `convertisseur.html`, section `PREFIXES = [ ... ]`, ajouter ta ligne.

**Le chat IA ne répond pas**
→ Normal : il faudrait un backend pour cacher la clé API Anthropic. Feature non-bloquante pour les inventaires.

**Besoin d'aide ?**
→ Dis-moi précisément à quelle étape ça coince et ce que tu vois.
