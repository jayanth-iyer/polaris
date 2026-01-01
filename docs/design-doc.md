# Polaris Design Document

Polaris is a Control Plane for managing self-hosted Kafka infrastructure across multi-cloud Kubernetes environments.

## Architecture Overview

```mermaid
graph TD
    User((User/Admin))
    CLI[Polaris CLI]
    WebUI[Polaris Dashboard - React + Vite]
    API[Polaris API Gateway - Rust Axum/Tonic]
    DB[(PostgreSQL - Meta Store)]
    Temporal[Temporal Workflow Engine]
    K8s[Kubernetes Cluster]
    Strimzi[Strimzi Operator]
    Kafka[Kafka Cluster]
    Prom[Prometheus]
    Grafana[Grafana]

    User --> CLI
    User --> WebUI
    CLI --> API
    WebUI --> API
    API --> DB
    API --> Temporal
    Temporal --> K8s
    K8s --> Strimzi
    Strimzi --> Kafka
    Prom --> Kafka
    Prom --> API
    Grafana --> Prom
```

## Component Breakdown

### 1. Polaris API (Rust)
- **REST/gRPC Handlers**: Exposes endpoints for cluster lifecycle management.
- **Validation Engine**: Ensures configurations adhere to organization policies.
- **Workflow Client**: Triggers Temporal workflows for long-running operations.

### 2. State Management (Temporal)
- **Provisioning Workflow**: Multi-step process to setup K8s namespaces, secrets, and Strimzi Kafka resources.
- **Scaling Workflow**: Safely scales brokers and coordinates partition rebalancing.
- **Upgrade Workflow**: Manages rolling restarts and version updates.

### 3. Metadata Store (PostgreSQL)
- Stores cluster definitions, status, history, and audit logs.
- Managed via `SQLx` with migrations.

### 4. Infrastructure Layer
- **Strimzi**: Manages the Kafka clusters within Kubernetes.
- **Istio**: Handles service-to-service communication, mTLS, and traffic shaping.

## Data Model

```mermaid
erDiagram
    CLUSTER ||--o{ BROKER : contains
    CLUSTER ||--o{ TOPIC : has
    CLUSTER {
        string id PK
        string name
        string provider
        string region
        string status
    }
    TOPIC {
        string id PK
        string name
        int partitions
        int replication_factor
    }
```
