use serde::{Deserialize, Serialize};

pub mod k8s;
pub mod strimzi;
pub mod workflow;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Cluster {
    pub id: String,
    pub name: String,
    pub provider: CloudProvider,
    pub status: ClusterStatus,
    pub kafka_version: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum CloudProvider {
    AWS,
    GCP,
    Azure,
    Local,
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum ClusterStatus {
    Provisioning,
    Ready,
    Scaling,
    Degraded,
    Deleting,
}

pub fn version() -> &'static str {
    "0.1.0"
}

