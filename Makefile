# Polaris Makefile

.PHONY: setup check test build clean dev

# Python/UV setup
setup:
	uv venv
	uv pip install -r requirements.txt

# Rust check
check:
	cargo check

# Run tests
test:
	cargo test

# Build the project
build:
	cargo build --release

# Clean artifacts
clean:
	cargo clean
	rm -rf .venv

# Run dev environment (placeholder)
dev:
	@echo "Starting Polaris dev environment..."
	cargo run
