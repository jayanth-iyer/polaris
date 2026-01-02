use axum::{routing::get, Router};
use tracing::info;
use std::net::SocketAddr;
use tonic::{transport::Server, Request, Response, Status};
use sqlx::postgres::PgPoolOptions;
use sqlx::{Pool, Postgres};
use std::env;
use std::fs;
use polaris_core::k8s::K8sClient;
use polaris_core::workflow::provision_kafka_cluster;
use std::sync::Arc;

pub mod polaris {
    tonic::include_proto!("polaris");
}

use polaris::cluster_manager_server::{ClusterManager, ClusterManagerServer};
use polaris::{GetClustersRequest, GetClustersResponse, CreateClusterRequest, ClusterResponse, ClusterInfo};

#[derive(Debug)]
pub struct MyClusterManager {
    #[allow(dead_code)]
    pool: Pool<Postgres>,
    k8s: Arc<K8sClient>,
}

impl MyClusterManager {
    pub fn new(pool: Pool<Postgres>, k8s: Arc<K8sClient>) -> Self {
        Self { pool, k8s }
    }
}

#[tonic::async_trait]
impl ClusterManager for MyClusterManager {
    async fn get_clusters(
        &self,
        _request: Request<GetClustersRequest>,
    ) -> Result<Response<GetClustersResponse>, Status> {
        // In a real implementation, we would query the database here
        let reply = GetClustersResponse {
            clusters: vec![
                ClusterInfo {
                    id: "1".to_string(),
                    name: "default-cluster".to_string(),
                    provider: "Local".to_string(),
                    status: "Ready".to_string(),
                }
            ],
        };
        Ok(Response::new(reply))
    }

    async fn create_cluster(
        &self,
        request: Request<CreateClusterRequest>,
    ) -> Result<Response<ClusterResponse>, Status> {
        let req = request.into_inner();
        
        info!("Creating cluster: {} with provider: {}", req.name, req.provider);

        // For now, we assume namespace "default" and 3 replicas
        provision_kafka_cluster(&self.k8s, "default", &req.name, 3)
            .await
            .map_err(|e| Status::internal(format!("Failed to provision cluster: {}", e)))?;

        let reply = ClusterResponse {
            id: uuid::Uuid::new_v4().to_string(),
            status: "Provisioning".to_string(),
        };
        Ok(Response::new(reply))
    }
}

fn get_database_url() -> String {
    if let Ok(url) = env::var("DATABASE_URL") {
        return url;
    }
    
    // Check for .dev_db_info in parent directories (up to 4 levels)
    let mut current_dir = env::current_dir().unwrap_or_else(|_| std::path::PathBuf::from("."));
    for _ in 0..4 {
        let file_path = current_dir.join(".dev_db_info");
        if let Ok(content) = fs::read_to_string(&file_path) {
            for line in content.lines() {
                if line.starts_with("URL=") {
                    return line[4..].to_string();
                }
            }
        }
        if !current_dir.pop() {
            break;
        }
    }
    
    "postgres://postgres:postgres@localhost:5432/polaris".to_string()
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    
    let db_url = get_database_url();
    println!("Connecting to database at: {}", db_url);
    
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;

    // Run migrations
    sqlx::migrate!("./migrations").run(&pool).await?;
    println!("Database migrations completed.");

    // gRPC server setup
    let k8s_client = Arc::new(K8sClient::new().await?);
    k8s_client.check_health().await?;
    println!("Kubernetes connection verified.");

    let grpc_addr = "[::1]:50051".parse()?;
    let cluster_manager = MyClusterManager::new(pool.clone(), k8s_client);

    println!("gRPC server listening on {}", grpc_addr);
    let grpc_server = Server::builder()
        .add_service(ClusterManagerServer::new(cluster_manager))
        .serve(grpc_addr);

    // Axum server setup
    let app = Router::new().route("/health", get(|| async { "OK" }));
    let http_addr: SocketAddr = "0.0.0.0:3000".parse()?;
    
    println!("HTTP server listening on {}", http_addr);
    let http_listener = tokio::net::TcpListener::bind(http_addr).await?;
    let http_server = axum::serve(http_listener, app);

    // Run both servers concurrently
    tokio::select! {
        res = grpc_server => res.map_err(Into::into),
        res = http_server => res.map_err(Into::into),
    }
}


