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
   npm run db:seed     # crée un compte admin, 100 clés de licence et ~18 textes
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

Le seed affiche dans la console l'email/mot de passe admin, et écrit les
**100 clés de licence de démarrage** (format `XXXXX-XXXXX-XXXXX`, 15
caractères alphanumériques non ambigus, façon clé produit Windows) dans le
fichier `starter-license-keys.txt` à la racine du projet — ce fichier n'est
jamais commité (voir `.gitignore`). N'importe laquelle de ces clés s'active
sur `/activate`.

## Système de licence (anti-piratage)

- Les clés font **15 caractères alphanumériques en 3 groupes de 5**
  (`XXXXX-XXXXX-XXXXX`), sur un alphabet sans caractères ambigus (pas de
  `0`/`O`, `1`/`I`) — inspiré du format des clés de produit Windows.
- Chaque enseignant crée un compte, puis doit **activer une clé** (`/activate`)
  pour accéder à l'application. Sans licence active, toutes les pages
  protégées redirigent vers cette page.
- Une clé se lie au **premier compte** qui l'active, et à un **nombre limité
  d'appareils** (empreinte stockée dans un cookie httpOnly). Au-delà de la
  limite, l'activation sur un nouvel appareil est refusée tant qu'un appareil
  existant n'a pas été désactivé depuis `/account`.
- Le statut de la licence est **revérifié en base à chaque requête protégée**
  (pas seulement au login) : si un administrateur révoque une clé, l'accès de
  l'utilisateur est coupé dès sa prochaine requête, sans attendre l'expiration
  de sa session.
- Les administrateurs (`/admin/keys`) génèrent, révoquent et réactivent les
  clés ; `/admin/users` permet de promouvoir un compte administrateur.

### Créer le premier compte administrateur en production

Aucun identifiant admin n'est codé en dur. Pour promouvoir un compte déjà
inscrit :

```bash
curl -X POST https://votre-domaine/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email":"vous@exemple.com","token":"VALEUR_DE_ADMIN_SETUP_TOKEN"}'
```

Il est recommandé de retirer ou changer `ADMIN_SETUP_TOKEN` une fois le
premier admin créé.

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
18 textes originaux classés par niveau CECRL, plus import par les
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
