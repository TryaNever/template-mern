lint:
	cd Front && npm run lint

lint-fix:
	cd Front && npm run lint -- --fix

prettier:
	cd Front && npx prettier --write .

lint-prettier: lint lint-fix prettier

dev-start:
	docker compose up -d --build

clear:
	docker compose down -v
	docker system prune -f
	docker volume prune -f
	docker network prune -f