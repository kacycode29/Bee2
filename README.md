# Bee2

Application de préparation de fiches de leçon pour les enseignants d'anglais
du post-primaire (Burkina Faso) : générateur de **fiches pédagogiques
conformes au canevas officiel APC/PI**, alimenté par le programme réel
(classes 6e à 3e), bibliothèque de textes de complément, export PDF, et accès
protégé par un système de clé de licence.

## Stack technique

- **Next.js 16** (App Router, Server Actions, Turbopack) + TypeScript
- **PostgreSQL** + **Prisma** (`prisma/schema.prisma`)
- **NextAuth v5** (credentials + JWT) pour l'authentification
- **@react-pdf/renderer** pour l'export PDF
- **Tailwind CSS v4** pour l'UI

## Démarrage local

1. Copier `.env.example` en `.env` et renseigner :
   - `DATABASE_URL` : connexion PostgreSQL
   - `NEXTAUTH_SECRET` : chaîne aléatoire longue (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` : URL de l'app (`http://localhost:3000` en local)
   - `ADMIN_SETUP_TOKEN` : secret utilisé une fois pour créer le premier admin en prod

2. Installer les dépendances et préparer la base :
   ```bash
   npm install
   npm run db:push     # crée les tables à partir du schéma Prisma
   npm run db:seed     # crée un compte admin, 100 clés de licence et ~45 textes
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

Le seed affiche dans la console le nom d'utilisateur/mot de passe admin, et
écrit les **100 clés de licence de démarrage** (format `XXXXX-XXXXX-XXXXX`,
15 caractères alphanumériques non ambigus, façon clé produit Windows) dans le
fichier `starter-license-keys.txt` à la racine du projet — ce fichier n'est
jamais commité (voir `.gitignore`).

## Système de licence (anti-piratage)

- **Il n'y a pas de compte gratuit** : la création de compte demande
  uniquement un **nom d'utilisateur**, un **mot de passe** et une **clé
  d'accès** valide — les trois dans le même formulaire (`/signup`). Le
  compte et l'activation de la licence sont créés en une seule opération
  atomique : si la clé est invalide, expirée, révoquée, déjà utilisée ou a
  atteint sa limite d'appareils, **aucun compte n'est créé**.
- Les clés font **15 caractères alphanumériques en 3 groupes de 5**
  (`XXXXX-XXXXX-XXXXX`), sur un alphabet sans caractères ambigus (pas de
  `0`/`O`, `1`/`I`) — inspiré du format des clés de produit Windows.
- Une clé se lie au **premier compte** qui l'active, et à un **nombre limité
  d'appareils** (empreinte stockée dans un cookie httpOnly). Au-delà de la
  limite, l'activation sur un nouvel appareil est refusée tant qu'un appareil
  existant n'a pas été désactivé depuis `/account`.
- Le statut de la licence est **revérifié en base à chaque requête protégée**
  (pas seulement au login) : si un administrateur révoque une clé, l'accès de
  l'utilisateur est coupé dès sa prochaine requête, sans attendre l'expiration
  de sa session. `/activate` reste disponible pour renouveler/changer de clé
  (licence expirée ou révoquée).
- Les administrateurs (`/admin/keys`) génèrent, révoquent et réactivent les
  clés ; `/admin/users` permet de promouvoir un compte administrateur.

### Créer le premier compte administrateur en production

Aucun identifiant admin n'est codé en dur. Pour promouvoir un compte déjà
inscrit :

```bash
curl -X POST https://votre-domaine/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"username":"votre_nom_utilisateur","token":"VALEUR_DE_ADMIN_SETUP_TOKEN"}'
```

Il est recommandé de retirer ou changer `ADMIN_SETUP_TOKEN` une fois le
premier admin créé.

### Limitation du taux de requêtes (rate limiting)

`/api/auth/signup`, la connexion (`authorize` de NextAuth), `/api/activate`,
`/api/auth/forgot-password` et `/api/admin/bootstrap` sont protégés contre
le brute-force par une limite en mémoire (voir `src/lib/rate-limit.ts`). La
clé combine l'adresse IP et le cookie d'appareil (`bee2_device`, déjà minté
par `src/proxy.ts`) plutôt que l'IP seule : sans proxy inverse de confiance
qui renseigne `X-Forwarded-For`, tous les visiteurs anonymes retomberaient
sur la même IP « inconnue », et les échecs de connexion d'une personne
bloqueraient tout le monde. C'est une protection basique (mémoire du
processus, pas de store partagé) : suffisante pour freiner un brute-force
occasionnel, pas un mécanisme de sécurité absolu contre un attaquant qui
maîtrise les en-têtes/cookies qu'il envoie.

### Mot de passe oublié

Comme il n'y a pas d'adresse e-mail, `/forgot-password` prouve l'identité
avec le nom d'utilisateur **et** la clé de licence exacte liée au compte
(seul le propriétaire payant connaît les deux). Un administrateur peut
aussi réinitialiser le mot de passe de n'importe quel enseignant depuis
`/admin/users` (mot de passe temporaire affiché une seule fois, à
communiquer manuellement) ; l'enseignant peut ensuite changer son mot de
passe depuis `/account`.

## Paiement en ligne (Stripe, optionnel)

`/acheter` propose l'achat direct d'une clé de licence (Stripe Checkout).
**C'est désactivé par défaut** — sans `STRIPE_SECRET_KEY`, la page affiche
un message « pas encore activé » et les routes `/api/checkout` /
`/api/webhooks/stripe` répondent proprement en 503, sans rien casser
ailleurs dans l'application.

Pour l'activer :

1. Renseignez `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
   `STRIPE_CURRENCY` et au moins un des deux
   `STRIPE_PRICE_ANNUAL_CENTS` / `STRIPE_PRICE_LIFETIME_CENTS` (voir
   `.env.example`) — les prix ne sont jamais codés en dur, ils viennent
   uniquement de ces variables.
2. Configurez un webhook Stripe pointant vers
   `https://votre-domaine/api/webhooks/stripe`, événement
   `checkout.session.completed`.
3. Après un paiement confirmé, la clé est générée automatiquement (webhook,
   avec la page de succès `/acheter/success` comme filet de sécurité si le
   webhook n'est pas encore arrivé) et affichée à l'acheteur — à noter
   précieusement, car elle sert aussi de preuve d'identité pour
   `/forgot-password`.

**Limite connue** : ce code n'a pas pu être testé avec un vrai paiement de
bout en bout dans l'environnement de développement de cet agent (pas
d'accès sortant vers Stripe ni d'URL publique pour recevoir le webhook).
La structure suit l'intégration officielle Stripe Checkout et le
comportement « désactivé proprement sans clés » a été vérifié ; un test
réel avec vos propres clés Stripe (mode test) est recommandé avant mise en
production.

## Générateur de fiches pédagogiques (canevas officiel APC/PI)

Le programme (unités, leçons, fonctions, structures/lexis, objectifs, volume
horaire par trimestre) pour les classes **6e, 5e, 4e et 3e** est transcrit
depuis les documents officiels dans `src/data/curriculum.ts` — ce n'est pas
du contenu inventé, c'est la donnée réelle de la planification détaillée du
Ministère.

Sur `/lesson-plans/new`, l'enseignant choisit **classe → unité → leçon →
type de séance**, et Bee2 génère la fiche complète selon le canevas décrit
dans le *Guide d'utilisation des curricula* (partie III) :

- **Séance d'apprentissage (Learning session)** : Discovery Phase (warm-up,
  révision, mise en contexte, présentation du vocabulaire/de la grammaire/de
  la compétence) → Practice Phase (activités contrôlées puis
  semi-contrôlées) → devoirs → tâches administratives, avec le minutage
  officiel (proportionnel à la durée choisie).
- **Séance de consolidation** (fin de leçon) et **situation d'intégration /
  Problem-solving** (fin d'unité) : Preparation → Task Setting (contexte et
  consignes générés à partir des fonctions de la leçon/unité) → Task
  Execution → Performance, plus une **grille de correction critériée**
  (Pertinence / Language Accuracy / Coherence / Refinement) calculée
  automatiquement, sur le même principe de points que l'exemple officiel du
  guide.

Toute cette logique est déterministe (`src/lib/fiche-pedagogique.ts`), sans
dépendance à une API IA externe — reproductible et vérifiable.

## Bibliothèque de textes (support complémentaire)

En complément, Bee2 fournit une bibliothèque de textes de lecture (seed de
45 textes originaux classés par niveau CECRL, plus import par les
enseignants sur `/library/new`) que l'enseignant peut utiliser comme support
pendant une séance. Ce n'est pas le cœur du produit — la fiche pédagogique
officielle l'est — mais un outil annexe utile pour la partie
compréhension écrite.

## Scripts

| Commande            | Description                                   |
| -------------------- | ---------------------------------------------- |
| `npm run dev`         | Serveur de développement                       |
| `npm run build`       | Build de production                            |
| `npm run start`       | Démarre le build de production                 |
| `npm run db:push`     | Synchronise le schéma Prisma avec la base       |
| `npm run db:migrate`  | Crée une migration Prisma (dev)                 |
| `npm run db:seed`     | Peuple la base (admin, clés, textes)            |
| `npm run lint`        | ESLint                                          |

## Déploiement

L'app est un projet Next.js standard, déployable sur Vercel ou tout hébergeur
Node.js. Il faut une base PostgreSQL accessible (Neon, Supabase, RDS, etc.),
et configurer les variables d'environnement listées ci-dessus. Penser à lancer
`npm run db:push` (ou une migration) et `npm run db:seed` contre la base de
production lors du premier déploiement.
