# ITM — Déploiement sur GitHub Pages

Guide pas à pas pour mettre ITM en ligne sur ton téléphone via GitHub Pages.

## Contenu du dossier

```
itm-pwa/
├── index.html              ← l'app (385 produits Indie Beach, mascotte intégrée)
├── manifest.json           ← déclare l'app à iOS/Android
├── sw.js                   ← service worker (fonctionne hors ligne)
├── icon-192.png            ← icône app (mascotte sur fond crème)
├── icon-512.png            ← idem, plus grande
├── icon-192-maskable.png   ← version "maskable" pour Android (fond vert)
├── icon-512-maskable.png   ← idem
├── mascot.png              ← mascotte utilisée dans l'app (bouton + chat)
└── README.md               ← ce fichier
```

Les icônes et la mascotte sont déjà générées avec le bon personnage. Rien à remplacer.

## Étape 1 — Créer un compte GitHub

Si tu n'en as pas :

1. Va sur https://github.com
2. Clique sur "Sign up" (en haut à droite)
3. Crée ton compte (email + mot de passe + username)

## Étape 2 — Créer un nouveau repository

1. Une fois connecté, clique sur le "+" en haut à droite → "New repository"
2. Nom du repo : `itm` (ou ce que tu veux, c'est ce qui apparaîtra dans l'URL)
3. Laisse **Public** coché
4. Coche **"Add a README file"**
5. Clique sur "Create repository"

## Étape 3 — Uploader les fichiers

1. Sur la page du repo fraîchement créé, clique sur "Add file" → "Upload files"
2. Glisse-dépose les 8 fichiers de ce dossier
3. En bas, clique sur "Commit changes"

## Étape 4 — Activer GitHub Pages

1. Sur le repo, va dans l'onglet **"Settings"** (en haut)
2. Dans le menu de gauche, clique sur **"Pages"**
3. Sous "Build and deployment" :
   - **Source** : "Deploy from a branch"
   - **Branch** : sélectionne `main` (ou `master`), dossier `/` (root)
4. Clique sur "Save"
5. Attends 1-2 minutes, puis recharge la page

Tu verras alors une URL du type :
```
https://TON-USERNAME.github.io/itm/
```

C'est l'URL de ton app en ligne.

## Étape 5 — Installer l'app sur ton téléphone

### Sur iPhone (Safari obligatoire, pas Chrome)
1. Ouvre Safari
2. Va sur l'URL de ton app
3. Appuie sur l'icône "Partager" (carré avec flèche vers le haut)
4. Fais défiler vers le bas et choisis **"Sur l'écran d'accueil"**
5. Valide — l'icône ITM (avec ta mascotte) apparaît sur l'écran d'accueil

### Sur Android (Chrome)
1. Ouvre Chrome
2. Va sur l'URL de ton app
3. Appuie sur les 3 points en haut à droite
4. Choisis **"Installer l'application"** (ou "Ajouter à l'écran d'accueil")
5. L'icône apparaît sur l'écran d'accueil

## Étape 6 — Tester le hors-ligne

Une fois l'app installée :
1. Active le mode avion sur ton téléphone
2. Ouvre l'app ITM
3. Elle doit fonctionner (le catalogue et tes saisies restent en mémoire locale)

## Limite connue : le chat IA

Le bouton mascotte ouvre un chat IA qui appelle directement l'API Anthropic. Dans la config actuelle, il ne fonctionnera pas en production parce que la clé API n'est pas fournie. Pour l'activer il faudra soit héberger un petit backend (pour cacher la clé API), soit désactiver cette feature pour l'instant.

Ce n'est pas bloquant pour utiliser ITM : toute la partie saisie / zones / export CSV marche à 100% sans backend.

## Pour mettre à jour l'app plus tard

Quand on modifie le code (nouveau catalogue, nouvelle fonctionnalité) :

1. Sur le repo GitHub, va dans les fichiers
2. Clique sur le fichier à modifier (ex: `index.html`)
3. Clique sur le crayon "Edit" (en haut à droite du fichier)
4. Colle le nouveau contenu
5. Commit les changements
6. Important : pour forcer les téléphones à télécharger la nouvelle version, dans `sw.js`, change `const CACHE_VERSION = 'itm-v1';` en `'itm-v2'`, `'itm-v3'`, etc.

Les téléphones recevront la mise à jour au prochain lancement avec réseau.

## Besoin d'aide ?

Si ça coince à une étape, dis-moi à quelle étape précise et ce que tu vois à l'écran — je débugue avec toi.
