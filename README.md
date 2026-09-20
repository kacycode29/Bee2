# Bee2

Application de préparation de fiches de leçon pour les enseignants d'anglais :
bibliothèque de textes classés par niveau CECRL, générateur automatique de
fiches de leçon et d'exercices, export PDF, et accès protégé par un système
de clé de licence.

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
   npm run db:seed     # crée un compte admin, 5 clés de démo et ~18 textes
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

Le seed affiche dans la console l'email/mot de passe admin et les clés de
licence de démonstration à utiliser sur `/activate`.

## Système de licence (anti-piratage)

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

## Générateur de fiches de leçon

La génération est **algorithmique**, sans dépendance à une API IA externe :

- **Vocabulaire clé** : extraction heuristique des mots les plus distinctifs
  du texte (longueur, absence de la liste des mots courants).
- **Texte à trous** : suppression mécanique d'un mot par phrase choisie —
  fonctionne sur n'importe quel texte, réponse toujours vérifiable.
- **Objectifs, déroulé, évaluation** : générés à partir de modèles adaptés au
  niveau CECRL choisi et à la durée du cours.
- **Vrai/faux et questions de compréhension** : pour les textes de la
  bibliothèque (écrits pour Bee2), ces exercices sont rédigés à la main et
  stockés avec le texte. Pour un texte importé par un enseignant, l'appli
  fournit un éditeur simple (une ligne = un item) pour que l'enseignant les
  rédige lui-même — aucune IA ne « invente » de questions de compréhension
  sans supervision humaine, ce qui serait risqué en pédagogie.

## Contenu de la bibliothèque

Le seed fournit **18 textes originaux** (3 par niveau CECRL, de A1 à C2,
répartis sur plusieurs thèmes), chacun avec vocabulaire, vrai/faux et
questions de compréhension rédigés à la main. C'est un point de départ, pas
« des centaines de textes » : faites grandir la bibliothèque avec
`/library/new` (import par les enseignants) ou en ajoutant des entrées dans
`prisma/seed-data.ts` puis en relançant `npm run db:seed`.

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
