# ✅ CHECKLIST — TEMPLATE BACKEND API EXPRESS + MONGODB

Objectif : créer un backend Express propre, réutilisable et prêt à connecter
à un frontend React existant.

Stack :
- Node.js
- Express
- MongoDB
- Mongoose
- JWT pour l'authentification
- bcrypt pour les mots de passe

---

# 1. INITIALISATION DU PROJET

## 1.1 Créer le dossier backend

- [ ] Créer un dossier `backend`
- [ ] Ouvrir un terminal dans ce dossier
- [ ] Initialiser le projet Node.js
- [ ] Configurer le projet en modules ES (`import` / `export`)

## 1.2 Installer les dépendances

- [ ] Installer Express
- [ ] Installer Mongoose
- [ ] Installer dotenv pour les variables d'environnement
- [ ] Installer cors pour autoriser le frontend React
- [ ] Installer bcrypt pour sécuriser les mots de passe
- [ ] Installer jsonwebtoken pour l'authentification JWT

## 1.3 Installer les outils de développement

- [ ] Installer nodemon pour redémarrer le serveur automatiquement
- [ ] Configurer les scripts `dev` et `start` dans `package.json`

## 1.4 Créer les fichiers de base

- [ ] Créer `src/server.js`
- [ ] Créer `src/app.js`
- [ ] Créer `.env`
- [ ] Créer `.env.example`
- [ ] Créer `.gitignore`
- [ ] Ignorer `node_modules` et `.env` dans Git

---

# 2. ORGANISATION DES DOSSIERS

## 2.1 Créer l'architecture

- [ ] Créer le dossier `src/config`
- [ ] Créer le dossier `src/routes`
- [ ] Créer le dossier `src/controllers`
- [ ] Créer le dossier `src/entities`
- [ ] Créer le dossier `src/entityManagers`
- [ ] Créer le dossier `src/middlewares`
- [ ] Créer le dossier `src/utils`

## 2.2 Structure finale

backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── index.js
│   │   └── user.routes.js
│   ├── controllers/
│   │   └── user.controller.js
│   ├── entities/
│   │   └── User.js
│   ├── entityManagers/
│   │   └── user.entityManager.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── notFound.middleware.js
│   ├── utils/
│   │   └── apiResponse.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json

---

# 3. CONFIGURATION DU SERVEUR EXPRESS

## 3.1 Configurer app.js

- [ ] Initialiser Express
- [ ] Activer le parsing JSON
- [ ] Configurer CORS pour React
- [ ] Importer les routes principales
- [ ] Ajouter une route GET `/api/health`
- [ ] Ajouter le middleware 404
- [ ] Ajouter le middleware global de gestion des erreurs

## 3.2 Configurer server.js

- [ ] Charger les variables d'environnement
- [ ] Connecter MongoDB
- [ ] Démarrer le serveur Express
- [ ] Lire le port depuis `.env`
- [ ] Afficher un message lorsque le serveur démarre
- [ ] Gérer proprement les erreurs de démarrage

## 3.3 Vérifier le serveur

- [ ] Lancer le serveur en développement
- [ ] Vérifier que le serveur démarre sans erreur
- [ ] Tester GET `/api/health`
- [ ] Vérifier le code HTTP 200
- [ ] Vérifier que le serveur répond en JSON

---

# 4. CONFIGURATION MONGODB

## 4.1 Préparer la base de données

- [ ] Créer une base MongoDB locale ou MongoDB Atlas
- [ ] Récupérer l'URI de connexion
- [ ] Ajouter l'URI dans `.env`
- [ ] Vérifier les identifiants de connexion
- [ ] Configurer les autorisations réseau si nécessaire

## 4.2 Créer config/database.js

- [ ] Centraliser la connexion Mongoose
- [ ] Exporter une fonction de connexion
- [ ] Afficher un message en cas de connexion réussie
- [ ] Gérer les erreurs de connexion
- [ ] Empêcher le démarrage normal de l'API si la base est indispensable et inaccessible

## 4.3 Configurer les variables d'environnement

Dans `.env` :

- [ ] Définir `PORT`
- [ ] Définir `MONGODB_URI`
- [ ] Définir `JWT_SECRET`
- [ ] Définir `CLIENT_URL`
- [ ] Vérifier que `.env` n'est pas versionné

Dans `.env.example` :

- [ ] Ajouter les noms des variables nécessaires
- [ ] Mettre des valeurs d'exemple sans secrets réels

## 4.4 Vérifier MongoDB

- [ ] Démarrer le serveur
- [ ] Vérifier la connexion à MongoDB
- [ ] Vérifier le comportement en cas d'URI invalide
- [ ] Vérifier que les erreurs sont compréhensibles

---

# 5. CRÉER LES ENTITIES

Une entity définit la structure des données stockées dans MongoDB.
Avec Mongoose, elle contient le schéma et le modèle de la collection.

## 5.1 Créer la première entity : User.js

- [ ] Définir le schéma utilisateur
- [ ] Ajouter les champs nécessaires
- [ ] Définir les types des champs
- [ ] Définir les champs obligatoires
- [ ] Ajouter les validations
- [ ] Configurer les timestamps `createdAt` et `updatedAt`
- [ ] Ajouter les contraintes d'unicité nécessaires
- [ ] Exporter le modèle Mongoose

## 5.2 Vérifier l'entity

- [ ] Vérifier que le modèle s'importe correctement
- [ ] Vérifier les validations
- [ ] Vérifier les contraintes d'unicité
- [ ] Vérifier que les mots de passe ne sont jamais enregistrés en clair

---

# 6. CRÉER LES ENTITY MANAGERS

Un entity manager regroupe les opérations d'accès aux données.
Il communique avec les modèles Mongoose.

## 6.1 Créer user.entityManager.js

- [ ] Créer la fonction pour récupérer tous les utilisateurs
- [ ] Créer la fonction pour récupérer un utilisateur par ID
- [ ] Créer la fonction pour rechercher un utilisateur par email
- [ ] Créer la fonction pour créer un utilisateur
- [ ] Créer la fonction pour modifier un utilisateur
- [ ] Créer la fonction pour supprimer un utilisateur
- [ ] Gérer les cas où aucun résultat n'est trouvé
- [ ] Éviter de renvoyer les mots de passe et données sensibles

## 6.2 Garder une séparation claire

- [ ] Ne pas mettre de logique HTTP dans l'entity manager
- [ ] Ne pas utiliser `req` ou `res` dans l'entity manager
- [ ] Utiliser les modèles Mongoose pour accéder à MongoDB
- [ ] Retourner les données ou laisser remonter les erreurs
- [ ] Éviter de dupliquer les mêmes requêtes MongoDB

---

# 7. CRÉER LES CONTROLLERS

Le controller reçoit la requête HTTP, appelle l'entity manager
et renvoie une réponse au frontend.

## 7.1 Créer user.controller.js

- [ ] Créer le controller pour récupérer tous les utilisateurs
- [ ] Créer le controller pour récupérer un utilisateur par ID
- [ ] Créer le controller pour créer un utilisateur
- [ ] Créer le controller pour modifier un utilisateur
- [ ] Créer le controller pour supprimer un utilisateur
- [ ] Lire les paramètres depuis `req.params`
- [ ] Lire les données envoyées depuis `req.body`
- [ ] Appeler les fonctions de l'entity manager
- [ ] Retourner des réponses JSON cohérentes
- [ ] Utiliser les bons codes HTTP
- [ ] Transmettre les erreurs au middleware global

## 7.2 Codes HTTP à utiliser

- [ ] `200` : opération réussie
- [ ] `201` : ressource créée
- [ ] `204` : opération réussie sans contenu de réponse
- [ ] `400` : données invalides
- [ ] `401` : utilisateur non authentifié
- [ ] `403` : accès interdit
- [ ] `404` : ressource introuvable
- [ ] `409` : conflit, par exemple email déjà utilisé
- [ ] `500` : erreur serveur inattendue

---

# 8. CRÉER LES ROUTERS

Les routers définissent les URL de l'API et associent chaque route
à un controller et, si nécessaire, à des middlewares.

## 8.1 Créer user.routes.js

- [ ] Importer Express
- [ ] Créer un Router Express
- [ ] Importer les controllers utilisateur
- [ ] Définir la route GET `/`
- [ ] Définir la route GET `/:id`
- [ ] Définir la route POST `/`
- [ ] Définir la route PATCH `/:id`
- [ ] Définir la route DELETE `/:id`
- [ ] Exporter le router

## 8.2 Créer routes/index.js

- [ ] Créer le router principal
- [ ] Importer les routers de chaque ressource
- [ ] Monter le router utilisateur sur `/users`
- [ ] Prévoir les autres routers selon les besoins
- [ ] Exporter le router principal

## 8.3 Brancher les routes dans app.js

- [ ] Importer le router principal
- [ ] Monter les routes sous `/api`
- [ ] Vérifier que toutes les routes ont le bon préfixe
- [ ] Vérifier qu'une route inexistante retourne une erreur 404

## 8.4 Vérifier les URL

- [ ] GET `/api/users`
- [ ] GET `/api/users/:id`
- [ ] POST `/api/users`
- [ ] PATCH `/api/users/:id`
- [ ] DELETE `/api/users/:id`

---

# 9. CRÉER LES MIDDLEWARES

Un middleware intervient entre la réception de la requête
et l'exécution du controller.

## 9.1 Middleware d'authentification

Fichier : `middlewares/auth.middleware.js`

- [ ] Récupérer le token depuis l'en-tête Authorization
- [ ] Vérifier le format Bearer du token
- [ ] Vérifier le token JWT
- [ ] Récupérer l'identité de l'utilisateur
- [ ] Ajouter l'utilisateur authentifié à `req.user`
- [ ] Retourner 401 si le token est absent ou invalide
- [ ] Ne jamais faire confiance à un ID utilisateur fourni par le frontend

## 9.2 Middleware de gestion des erreurs

Fichier : `middlewares/error.middleware.js`

- [ ] Centraliser les erreurs de l'API
- [ ] Retourner une réponse JSON standardisée
- [ ] Éviter d'exposer les détails internes en production
- [ ] Gérer les erreurs Mongoose connues
- [ ] Gérer les erreurs de validation
- [ ] Gérer les erreurs de duplication
- [ ] Journaliser les erreurs utiles côté serveur

## 9.3 Middleware 404

Fichier : `middlewares/notFound.middleware.js`

- [ ] Détecter les routes inconnues
- [ ] Retourner le code HTTP 404
- [ ] Retourner un message JSON explicite

## 9.4 Vérifier l'ordre des middlewares

- [ ] Configurer CORS
- [ ] Configurer le parsing JSON
- [ ] Enregistrer les routes
- [ ] Enregistrer le middleware 404 après les routes
- [ ] Enregistrer le middleware d'erreur en dernier

---

# 10. GESTION DES ACCÈS

Objectif : contrôler qui peut consulter ou modifier les données.

## 10.1 Authentification

- [ ] Créer une route d'inscription
- [ ] Créer une route de connexion
- [ ] Hacher les mots de passe avec bcrypt
- [ ] Vérifier le mot de passe lors de la connexion
- [ ] Générer un token JWT
- [ ] Définir une durée d'expiration du token
- [ ] Ne jamais retourner le mot de passe dans les réponses
- [ ] Ne jamais stocker les secrets dans le code source

## 10.2 Autorisation

- [ ] Définir les routes publiques
- [ ] Définir les routes protégées
- [ ] Ajouter le middleware d'authentification aux routes protégées
- [ ] Vérifier que l'utilisateur accède uniquement à ses ressources
- [ ] Prévoir un contrôle de rôle si nécessaire
- [ ] Retourner 403 si l'utilisateur n'a pas les droits nécessaires

## 10.3 Vérifier la sécurité

- [ ] Tester une route protégée sans token
- [ ] Tester avec un token invalide
- [ ] Tester avec un token expiré
- [ ] Tester avec un utilisateur authentifié
- [ ] Tester l'accès à une ressource appartenant à un autre utilisateur

---

# 11. STANDARDISER LES RÉPONSES API

## 11.1 Définir un format cohérent

- [ ] Utiliser JSON pour les réponses
- [ ] Retourner les données dans une propriété `data`
- [ ] Retourner les erreurs dans une propriété `error`
- [ ] Fournir un message compréhensible
- [ ] Utiliser le bon code HTTP
- [ ] Éviter de renvoyer des données inutiles

## 11.2 Vérifier les réponses

- [ ] Vérifier une réponse réussie
- [ ] Vérifier une réponse de validation
- [ ] Vérifier une ressource inexistante
- [ ] Vérifier une erreur serveur
- [ ] Vérifier que les réponses ne contiennent aucun secret

---

# 12. VALIDATION DES DONNÉES

## 12.1 Valider les entrées

- [ ] Vérifier les champs obligatoires
- [ ] Vérifier les types de données
- [ ] Vérifier le format des emails
- [ ] Vérifier la longueur des chaînes de caractères
- [ ] Vérifier les paramètres d'URL
- [ ] Vérifier les identifiants MongoDB
- [ ] Refuser les propriétés inattendues ou interdites
- [ ] Ne jamais transmettre directement `req.body` à une mise à jour MongoDB sans filtrage

## 12.2 Vérifier les erreurs

- [ ] Tester un body vide
- [ ] Tester des types incorrects
- [ ] Tester un ID invalide
- [ ] Tester une ressource inexistante
- [ ] Tester une valeur déjà utilisée

---

# 13. CONNECTER REACT AU BACKEND

Le frontend React est déjà configuré.
Il reste à le connecter à l'API.

## 13.1 Préparer la connexion

- [ ] Définir l'URL du backend dans les variables d'environnement React
- [ ] Configurer CORS avec l'origine exacte du frontend
- [ ] Vérifier que le frontend utilise la bonne URL
- [ ] Centraliser les appels API côté React
- [ ] Prévoir un mécanisme commun pour gérer les erreurs HTTP

## 13.2 Tester les échanges

- [ ] Appeler GET `/api/health` depuis React
- [ ] Vérifier la réception du JSON
- [ ] Envoyer une requête POST
- [ ] Vérifier les données retournées
- [ ] Vérifier la gestion des erreurs
- [ ] Vérifier l'authentification si nécessaire

---

# 14. TESTER L'API

## 14.1 Outils

- [ ] Installer ou utiliser Postman, Insomnia ou Bruno
- [ ] Créer une collection de requêtes
- [ ] Définir une variable pour l'URL de base de l'API
- [ ] Ajouter les en-têtes nécessaires
- [ ] Préparer des données de test

## 14.2 Tests fonctionnels

- [ ] Tester la route de santé
- [ ] Tester la création d'une ressource
- [ ] Tester la récupération d'une ressource
- [ ] Tester la modification d'une ressource
- [ ] Tester la suppression d'une ressource
- [ ] Tester les cas d'erreur
- [ ] Tester les routes protégées
- [ ] Vérifier les codes HTTP

## 14.3 Tests de régression

- [ ] Vérifier que les routes existantes fonctionnent toujours
- [ ] Vérifier qu'une modification n'affecte pas les autres ressources
- [ ] Tester les validations après chaque changement

---

# 15. SÉCURISER LE BACKEND

## 15.1 Protection générale

- [ ] Ne jamais versionner `.env`
- [ ] Configurer CORS avec les origines autorisées
- [ ] Ajouter une limite de taille aux requêtes JSON
- [ ] Ajouter une limitation de débit sur les routes sensibles
- [ ] Ajouter des en-têtes HTTP de sécurité
- [ ] Vérifier les données avant les requêtes MongoDB
- [ ] Ne jamais exposer les traces d'erreurs en production

## 15.2 Authentification et données

- [ ] Utiliser HTTPS en production
- [ ] Limiter les tentatives de connexion
- [ ] Définir une stratégie de gestion des tokens
- [ ] Vérifier les permissions sur chaque ressource privée
- [ ] Ne jamais renvoyer les mots de passe ou secrets
- [ ] Prévoir des sauvegardes MongoDB

---

# 16. PRÉPARER LA PRODUCTION

## 16.1 Configuration

- [ ] Configurer les variables d'environnement de production
- [ ] Vérifier l'URI MongoDB de production
- [ ] Vérifier les origines CORS autorisées
- [ ] Configurer le port du serveur
- [ ] Vérifier les scripts de démarrage
- [ ] Vérifier que les secrets sont configurés sur l'hébergeur

## 16.2 Déploiement

- [ ] Choisir un hébergeur backend
- [ ] Déployer le backend
- [ ] Configurer les variables d'environnement
- [ ] Vérifier la connexion à MongoDB
- [ ] Tester GET `/api/health`
- [ ] Tester les routes principales
- [ ] Connecter React à l'URL de production
- [ ] Vérifier CORS en production

## 16.3 Vérifications finales

- [ ] Vérifier les logs serveur
- [ ] Vérifier les erreurs de connexion
- [ ] Vérifier les routes publiques et privées
- [ ] Vérifier les permissions
- [ ] Vérifier que les secrets ne sont pas exposés
- [ ] Tester l'application complète depuis React

---

# 17. AJOUTER UNE NOUVELLE RESSOURCE

Exemple : ajouter une ressource `Product`.

## 17.1 Créer les fichiers

- [ ] Créer `entities/Product.js`
- [ ] Créer `entityManagers/product.entityManager.js`
- [ ] Créer `controllers/product.controller.js`
- [ ] Créer `routes/product.routes.js`

## 17.2 Développer la ressource

- [ ] Définir les champs dans l'entity
- [ ] Définir les opérations MongoDB dans l'entity manager
- [ ] Créer les controllers nécessaires
- [ ] Définir les routes
- [ ] Ajouter les middlewares d'accès
- [ ] Ajouter les validations
- [ ] Monter le router dans `routes/index.js`

## 17.3 Tester

- [ ] Tester la création
- [ ] Tester la récupération
- [ ] Tester la modification
- [ ] Tester la suppression
- [ ] Tester les permissions
- [ ] Tester les erreurs

---

# 18. CHECKLIST FINALE

## Backend fonctionnel

- [ ] Le serveur Express démarre
- [ ] MongoDB est connecté
- [ ] Les routes sont organisées
- [ ] Les controllers sont séparés des entity managers
- [ ] Les entities Mongoose sont validées
- [ ] Les middlewares sont en place
- [ ] Les erreurs sont gérées globalement
- [ ] Les réponses API sont cohérentes

## Sécurité

- [ ] Les mots de passe sont hachés
- [ ] Les routes privées sont protégées
- [ ] Les permissions sont vérifiées
- [ ] Les entrées utilisateur sont validées
- [ ] Les secrets ne sont pas versionnés
- [ ] CORS est correctement configuré

## Intégration

- [ ] React communique avec l'API
- [ ] Les requêtes principales fonctionnent
- [ ] Les erreurs sont correctement gérées
- [ ] Les tests passent
- [ ] Le backend est prêt à être déployé
