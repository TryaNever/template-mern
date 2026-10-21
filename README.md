# Template MERN

Socle réutilisable avec React, Vite, Tailwind CSS 3, Express, MongoDB/Mongoose, JWT et Docker Compose.

## Prérequis

- Node.js 22 ou plus récent, npm et GNU Make.
- Docker Compose pour démarrer la stack complète.

## Initialiser un clone

```sh
make init
```

Cette commande crée les fichiers locaux `.env` uniquement s'ils n'existent pas, ajoute un secret JWT aléatoire s'il est absent ou vide, puis installe les dépendances racine, backend et frontend avec leurs fichiers lock. Elle peut être relancée sans remplacer les configurations ou secrets déjà renseignés. Les fichiers `.env` ne sont pas versionnés.

Renseignez `RESEND_API_KEY` et `EMAIL_FROM` dans `backend/.env` si les e-mails de réinitialisation de mot de passe sont utilisés. Le secret JWT est généré pour le développement local ; utilisez un gestionnaire de secrets pour les environnements déployés.

## Commandes

| Commande      | Action                                                                |
| ------------- | --------------------------------------------------------------------- |
| `make dev`    | Démarre MongoDB, l'API et Vite avec Docker Compose                    |
| `make build`  | Construit le frontend pour la production                              |
| `make lint`   | Vérifie le format Prettier et la syntaxe JavaScript du backend        |
| `make format` | Formate les fichiers reconnus par Prettier                            |
| `make clean`  | Supprime uniquement les sorties frontend `dist` et backend `coverage` |
| `make stop`   | Arrête les services sans supprimer les données MongoDB                |

Pour lancer un service sans Docker, utilisez `npm run dev --prefix backend` ou `npm run dev --prefix frontend`. Assurez-vous que MongoDB est joignable et que `backend/.env` contient la bonne URI.

## Structure

- `frontend/src/routes/` : pages React découvertes automatiquement à partir de leur nom de fichier.
- `frontend/src/components/ui/` : composants d'interface réutilisables.
- `frontend/src/global.css` et `frontend/tailwind.config.js` : tokens CSS et thème Tailwind v3.
- `backend/src/routes/`, `models/` et `middlewares/` : API, modèles et middleware Express.
- `backend/README.md` : routes API et détails de l'authentification.

La route `/register` et l'exemple CRUD `/api/examples` sont des exemples fonctionnels à adapter ou remplacer dans un nouveau projet.

## Qualité et hooks Git

`make init` installe Husky à partir du script `prepare` racine. Le hook `pre-commit` formate les fichiers staged pris en charge par Prettier, puis vérifie la syntaxe des fichiers JavaScript backend concernés. Le hook `commit-msg` applique Conventional Commits via Commitlint. Aucun framework de tests n'est configuré dans ce template.

Tailwind CSS reste en version 3 : personnalisez les variables HSL de `frontend/src/global.css`, y compris leur variante `.dark`, et réutilisez-les via les classes sémantiques.

L'audit complet du frontend signale encore des vulnérabilités dans des dépendances de développement transitives de Tailwind CSS 3 (`braces` et `postcss-selector-parser`). Les versions corrigées ne sont pas compatibles avec cette configuration v3 ; l'option automatique de npm bascule Tailwind en v4 et n'est donc pas appliquée. Les audits de production (`npm audit --omit=dev`) du frontend, du backend et de la racine ne signalent aucune vulnérabilité.
