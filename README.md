# Système de Gestion Menuiserie

Application de bureau développée avec Electron, Angular, Prisma et SQLite.

## Technologies utilisées

- Electron
- Angular
- TypeScript
- Prisma ORM
- SQLite
- IPC Electron
- Angular Router
- Reactive Forms
- Signals Angular

## Fonctionnalités

- CRUD Clients
- CRUD Types de clients
- CRUD Catégories
- CRUD Produits
- CRUD Dimensions
- CRUD Commandes
- CRUD Lignes de commande
- CRUD Personnel
- Affectation du personnel aux commandes
- CRUD Codes postaux
- CRUD Chantiers
- Association clients / chantiers
- Dashboard avec statistiques

## Modélisation de la base de données

Le projet contient des relations :

- 1:N entre TypeClient et Client
- 1:N entre Categorie et Produit
- 1:N entre Client et Commande
- 1:N entre CodePostalChantier et Chantier
- N:M entre Commande et Produit via CommandeProduit
- N:M entre Personnel et Commande via PersonnelCommande
- N:M entre Client et Chantier via ClientChantier


## Schéma relationnel

Le schéma relationnel de la base de données est disponible dans :

docs/schema-relationnel.png

## Installation

npm install

Configuration de la base de données

Créer le fichier .env à la racine :

DATABASE_URL="file:./dev.db"

Puis lancer :

npx prisma migrate dev
npx prisma generate
npm run seed
Lancement de l'application
npm run start
Scripts utiles
npm run start
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
npm run seed

## Architecture

L'application respecte l'architecture Electron :

main : logique backend, Prisma, accès base de données
preload : pont sécurisé entre Electron et Angular
renderer : interface Angular

Les appels à la base de données passent par IPC :

Angular Service → window.electronAPI → preload → ipcMain → Prisma → SQLite
Commande de remise

Le projet peut être lancé avec :

npm run start

SystemeGestionMenuiserie/
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── src/
│   │
│   ├── main.ts
│   ├── preload.ts
│   │
│   ├── main/
│   │   │
│   │   ├── prisma.ts
│   │   │
│   │   └── ipc/
│   │       ├── client.ipc.ts
│   │       ├── categorie.ipc.ts
│   │       ├── produit.ipc.ts
│   │       ├── dimension.ipc.ts
│   │       ├── commande.ipc.ts
│   │       ├── commande-produit.ipc.ts
│   │       ├── personnel.ipc.ts
│   │       ├── personnel-commande.ipc.ts
│   │       ├── code-postal-chantier.ipc.ts
│   │       ├── chantier.ipc.ts
│   │       └── client-chantier.ipc.ts
│   │
│   └── renderer/
│       └── angular-app/
│           │
│           ├── angular.json
│           ├── package.json
│           │
│           └── src/
│               │
│               ├── main.ts
│               │
│               ├── types/
│               │   └── electron.d.ts
│               │
│               └── app/
│                   │
│                   ├── app.component.ts
│                   ├── app.component.html
│                   ├── app.component.css
│                   ├── app.routes.ts
│                   │
│                   ├── services/
│                   │   ├── client.service.ts
│                   │   ├── categorie.service.ts
│                   │   ├── produit.service.ts
│                   │   ├── dimension.service.ts
│                   │   ├── commande.service.ts
│                   │   ├── commande-produit.service.ts
│                   │   ├── personnel.service.ts
│                   │   ├── personnel-commande.service.ts
│                   │   ├── code-postal.service.ts
│                   │   ├── chantier.service.ts
│                   │   ├── client-chantier.service.ts
│                   │   └── dashboard.service.ts
│                   │
│                   └── pages/
│                       │
│                       ├── dashboard/
│                       │   ├── dashboard.component.ts
│                       │   ├── dashboard.component.html
│                       │   └── dashboard.component.css
│                       │
│                       ├── clients/
│                       ├── categories/
│                       ├── produits/
│                       ├── dimensions/
│                       ├── commandes/
│                       ├── commande-produits/
│                       ├── personnels/
│                       ├── personnel-commandes/
│                       ├── codes-postaux/
│                       ├── chantiers/
│                       └── client-chantiers/
│
├── .env
├── .gitignore
├── package.json
├── forge.config.ts
└── README.md

## Auteur
**Jean Pierre NSENGIYUMVA**
-GitHub : [@ietc-JPierre] (https://github.com/ietc-JPierre/SGBD_SystemeGestionMenuiserie.git)