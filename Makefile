# Polaris Makefile

.PHONY: setup setup-backend setup-frontend check test build clean dev dev-api dev-frontend dev-db-up dev-db-down

# General setup
setup: setup-frontend
	uv venv
	uv pip install -r requirements.txt

setup-frontend:
	cd frontend && npm install

# Rust check
check:
	cd backend && cargo check

# Run tests
test:
	cd backend && cargo test

# Build the project
build:
	cd backend && cargo build --release
	cd frontend && npm run build

# Clean artifacts
clean:
	cd backend && cargo clean
	rm -rf .venv
	rm -rf frontend/dist
	rm -rf frontend/node_modules

# Run dev environment
dev: dev-db-up
	@echo "Starting Polaris dev environment..."
	@echo "Run 'make dev-api' in one terminal and 'make dev-frontend' in another."

dev-api:
	cd backend && cargo run -p polaris-api

dev-cli:
	cd backend && cargo run -p polaris-cli

dev-frontend:
	cd frontend && [ -d node_modules ] || npm install
	cd frontend && npm run dev

# Database management using Testcontainers
dev-db-up:
	uv run python scripts/dev_env.py up

dev-db-down:
	uv run python scripts/dev_env.py down
