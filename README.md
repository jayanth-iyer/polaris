# Polaris

Polaris is a robust Control Plane for managing self-hosted Kafka infrastructure across multi-cloud Kubernetes environments. Built with Rust for high performance, resource efficiency, and type-safe state management.

## Project Structure

- `backend/`: Rust workspace containing the control plane logic.
  - `core/`: Shared data models and core business logic.
  - `api/`: gRPC (Tonic) and HTTP (Axum) API server.
  - `cli/`: Command-line interface for interaction.
- `frontend/`: React + Vite application for the Dashboard.
- `docs/`: Design documents and implementation plans.
- `scripts/`: Helper scripts for development (e.g., Testcontainers).

## Prerequisites

- **Rust**: Latest stable version.
- **Node.js**: v18+ and npm.
- **Python/UV**: For development tools and dependency management.
- **Docker**: Required for running the local database via Testcontainers.

## Getting Started

### 1. Project Setup

Initialize the Python environment and install frontend dependencies:
```bash
make setup
```

### 2. Start the Development Database

Polaris uses Testcontainers to spin up a managed PostgreSQL instance for local development:
```bash
make dev-db-up
```
*Note: This will keep running in the foreground or background depending on how you run it. It creates a `.dev_db_info` file with connection details.*

### 3. Start the Backend API

In a new terminal:
```bash
make dev-api
```
The API server listens on:
- **HTTP**: `http://localhost:3000` (Health checks at `/health`)
- **gRPC**: `http://localhost:50051`

### 4. Start the Frontend Dashboard

In another terminal:
```bash
make dev-frontend
```
The dashboard will be available at `http://localhost:5173`.

### 5. Using the CLI

You can interact with the control plane using the CLI:
```bash
make dev-cli -- status
```

## Development Commands

| Command | Description |
| :--- | :--- |
| `make setup` | Install all dependencies (Python & Node) |
| `make dev-db-up` | Start the local PostgreSQL container |
| `make dev-db-down` | Stop and clean up the database container |
| `make dev-api` | Run the Rust API server |
| `make dev-frontend` | Run the Vite dev server |
| `make check` | Run `cargo check` on the backend |
| `make test` | Run backend tests |
| `make build` | Build both backend and frontend for production |

## Documentation

- [Implementation Plan](docs/implementation-plan.md)
- [Design Document](docs/design-doc.md)
- [UI Design Document](docs/polaris-ui-design.md)
- [Phase 1 Walkthrough](docs/walkthrough-phase-1.md)
