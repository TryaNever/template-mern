# Backend API

## Démarrage

1. Copier `.env.example` vers `.env` et renseigner les valeurs.
2. Générer un secret JWT avec `openssl rand -base64 48`, puis le placer dans `JWT_SECRET`.
3. Configurer `RESEND_API_KEY` et `EMAIL_FROM` pour activer les e-mails de réinitialisation.
4. Installer et démarrer : `npm install`, puis `npm run dev`.

Le serveur refuse de démarrer si `JWT_SECRET` est absent ou fait moins de 32 caractères, ou si `MONGO_DB_URL` est absent. Dans Docker, le service backend attend le fichier `backend/.env`.

## Routes

Toutes les routes sont préfixées par `/api`.

| Méthode | Route                   | Authentification | Description                                 |
| ------- | ----------------------- | ---------------- | ------------------------------------------- |
| POST    | `/auth/register`        | Non              | Créer un compte avec e-mail et mot de passe |
| POST    | `/auth/login`           | Non              | Obtenir un JWT Bearer de courte durée       |
| GET     | `/auth/me`              | Bearer           | Lire le compte authentifié                  |
| POST    | `/auth/forgot-password` | Non              | Demander un lien de réinitialisation        |
| POST    | `/auth/reset-password`  | Non              | Changer le mot de passe avec le jeton reçu  |
| GET     | `/examples`             | Bearer           | Lister ses exemples (maximum 100)           |
| POST    | `/examples`             | Bearer           | Créer un exemple                            |
| GET     | `/examples/:id`         | Bearer           | Lire un de ses exemples                     |
| PATCH   | `/examples/:id`         | Bearer           | Modifier un de ses exemples                 |
| DELETE  | `/examples/:id`         | Bearer           | Supprimer un de ses exemples                |

Les mots de passe d'inscription et de réinitialisation doivent faire au moins 12 caractères et ne peuvent dépasser la limite de 72 octets de bcrypt. Pour les routes Bearer, envoyer `Authorization: Bearer <token>`. Le client doit lire le jeton de réinitialisation dans le fragment de l'URL (`#token=...`) et le poster à `/auth/reset-password`.

## Sécurité mise en place

- Hash des mots de passe avec bcrypt, sélection du hash désactivée par défaut, validation Zod des entrées et réponses d'erreur sans détails internes.
- Jetons JWT signés en HS256, durée courte et vérification explicite de l'algorithme.
- Jeton de reset aléatoire, stocké uniquement sous forme de hash SHA-256, expirant et consommé une seule fois. La réponse de demande ne révèle pas si l'adresse existe.
- Limitation des tentatives d'authentification, limitation globale, taille du JSON limitée, CORS en liste d'autorisation, en-têtes Helmet et masquage de la signature Express.
- Les ressources d'exemple sont filtrées par propriétaire à chaque lecture, modification et suppression.

En production, servir l'API derrière HTTPS, utiliser un secret généré aléatoirement et gérer les secrets hors du dépôt. Le JWT est transmis au client (pas de cookie) : le conserver hors du stockage persistant accessible à JavaScript si possible et ne jamais l'inclure dans les URL.
