.PHONY: init dev build lint format clean stop

init:
	node scripts/init.mjs
	npm ci
	npm ci --prefix backend
	npm ci --prefix frontend

dev:
	docker compose up -d --build

build:
	npm run build --prefix frontend

lint:
	npm run lint

format:
	npm run format

clean:
	rm -rf frontend/dist backend/coverage

stop:
	docker compose down
