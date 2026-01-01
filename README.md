# Polaris

Polaris is a robust Control Plane for managing self-hosted Kafka infrastructure across multi-cloud Kubernetes environments. Built with Rust for high performance, resource efficiency, and type-safe state management.

## Key Features
- **Automated Provisioning**: Spin up Kafka clusters with Strimzi on any K8s cluster.
- **Intelligent Scaling**: Metric-based auto-scaling and partition rebalancing.
- **Zero-Downtime Upgrades**: Automated rolling upgrades for Kafka and Strimzi.
- **Self-Healing**: Automatic detection and recovery from broker or storage failures.
- **Multi-Cloud Support**: Native management of clusters across AWS, GCP, and Azure.

## Tech Stack
- **Control Plane (Backend)**: Rust (Axum, Tonic, Tokio)
- **Dashboard (Frontend)**: React + Vite + Vanilla CSS
- **Workflow Engine**: Temporal
- **Infrastructure**: Kubernetes, Strimzi Apache Kafka Operator, Istio
- **Database**: PostgreSQL (Metadata Store)
- **Observability**: Prometheus, Grafana, Jaeger

## Project Structure
- `backend/`: Rust source code for the Control Plane.
- `frontend/`: React + Vite application for the Dashboard.
- `docs/`: Design documents and implementation plans.

## Getting Started

### Prerequisites
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Node.js](https://nodejs.org/) & [npm/yarn](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (for Frontend)
- [UV](https://github.com/astral-sh/uv) (for Python tools)
- [Docker](https://www.docker.com/) & [Kubernetes](https://kubernetes.io/) (Local or Cloud)

### Development
1. Clone the repository
2. Install dependencies:
   ```bash
   make setup
   ```
3. Run the development environment:
   ```bash
   make dev
   ```

## Documentation
- [Implementation Plan](docs/implementation-plan.md)
- [Design Document](docs/design-doc.md)
- [Infrastructure Vision](docs/self-hosted-kafka-infra.md)
