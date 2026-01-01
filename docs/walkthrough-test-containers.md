# Walkthrough: Testcontainers for Local Development

This walkthrough demonstrates the setup and usage of Testcontainers to manage infrastructure dependencies (PostgreSQL) during local development.

## Implementation Details

- **Dependencies**: Added `testcontainers[postgres]` and `psycopg2-binary` to `requirements.txt`.
- **Helper Script**: Created `scripts/dev_env.py` to manage the PostgreSQL container lifecycle.
- **Makefile Integration**: Added `dev-db-up` and `dev-db-down` commands for easy management.

## Verification Results

### 1. Database Startup
Running `make dev-db-up` successfully spins up a PostgreSQL 16 container and maps it to port 5432.

### 2. Connection Info Persistence
The connection details are saved to `.dev_db_info` for use by other tools or manual inspection.

### 3. Cleanup
Running `make dev-db-down` stops the container and removes the `.dev_db_info` file.

---
*Created by Antigravity on 2026-01-01*
