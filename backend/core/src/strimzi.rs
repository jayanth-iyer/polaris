use kube::CustomResource;
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(CustomResource, Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
#[kube(
    group = "kafka.strimzi.io",
    version = "v1beta2",
    kind = "Kafka",
    plural = "kafkas",
    namespaced
)]
#[kube(status = "KafkaStatus")]
pub struct KafkaSpec {
    pub kafka: KafkaConfig,
    pub zookeeper: ZookeeperConfig,
    pub entity_operator: Option<EntityOperatorConfig>,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct KafkaConfig {
    pub replicas: i32,
    pub listeners: Vec<GenericKafkaListener>,
    pub config: Option<serde_json::Value>,
    pub storage: Storage,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct GenericKafkaListener {
    pub name: String,
    pub port: i32,
    #[serde(rename = "type")]
    pub listener_type: String,
    pub tls: bool,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct ZookeeperConfig {
    pub replicas: i32,
    pub storage: Storage,
}

#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum StorageType {
    Ephemeral,
    PersistentClaim,
}

impl Default for StorageType {
    fn default() -> Self {
        StorageType::Ephemeral
    }
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct Storage {
    #[serde(rename = "type")]
    pub storage_type: StorageType,
    pub size: Option<String>,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct EntityOperatorConfig {
    pub topic_operator: serde_json::Value,
    pub user_operator: serde_json::Value,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct KafkaStatus {
    pub conditions: Option<Vec<Condition>>,
}

#[derive(Serialize, Deserialize, Default, Clone, Debug, JsonSchema)]
pub struct Condition {
    #[serde(rename = "type")]
    pub condition_type: String,
    pub status: String,
    pub reason: Option<String>,
    pub message: Option<String>,
}
