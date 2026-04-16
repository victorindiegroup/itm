# ITM — PINs d'accès

**CONFIDENTIEL — À conserver en lieu sûr**

## PIN Admin

| Utilisateur | PIN |
|---|---|
| **Admin (toi)** — accès à tous les établissements | **1304** |

## PINs Établissements (à distribuer aux chefs de bar)

| Établissement | PIN |
|---|---|
| Indie Beach | **6827** |
| Café de l'Ormeau | **9623** |
| La Sauvageonne (Ramatuelle) | **3241** |
| Playamigos | **4921** |
| Pablo (Saint-Tropez) | **1193** |
| Cherry (Saint-Tropez) | **6491** |
| Cat Club (Courchevel) | **6624** |
| La Sauvageonne (Megève) | **0719** |
| Cherry (Paris) | **7696** |
| Pablo (Saint-Barthélemy) | **2780** |

## Fonctionnement

- Chaque PIN est lié à un établissement. Un chef de bar qui entre le PIN "Indie Beach" est bloqué sur cet établissement, il ne peut pas en changer.
- Ton PIN admin (1304) donne accès à tous les établissements avec possibilité de basculer de l'un à l'autre (clic sur le nom de l'étab dans le header).
- La session reste active (pas besoin de re-entrer le PIN à chaque ouverture).
- Bouton "Se déconnecter" disponible dans l'onglet Session.

## Sécurité

- Ces PINs sont stockés **en clair** dans le code de l'app. Niveau de sécurité : empêcher les erreurs d'inventaire (qu'un chef compte sur le mauvais établissement), pas de protection contre un attaquant.
- Pour une vraie sécurité : il faudra passer à un backend d'authentification (étape ultérieure).

## Modifier les PINs plus tard

1. Sur GitHub, ouvre `index.html`
2. Icône crayon ("Edit this file")
3. Cherche `const PINS = {` (vers le début du script)
4. Modifie les valeurs (la clé = le PIN, le reste = l'étab lié)
5. Commit — la màj sera prise en compte au prochain lancement des téléphones

**Important** : si tu changes le PIN d'un chef de bar déjà connecté, il restera connecté avec son ancien PIN jusqu'à ce qu'il se déconnecte ou qu'on force un logout global. Pour forcer : change aussi la valeur de `AUTH_KEY` dans le code (ex: `itm_auth_v1` → `itm_auth_v2`).
