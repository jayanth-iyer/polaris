use crate::k8s::K8sClient;
use crate::strimzi::{Kafka, KafkaSpec, KafkaConfig, ZookeeperConfig, Storage, StorageType, GenericKafkaListener};
use anyhow::{Result, Context};
use kube::api::{Api, PostParams};
use tracing::info;

pub async fn provision_kafka_cluster(
    k8s: &K8sClient,
    namespace: &str,
    name: &str,
    replicas: i32,
) -> Result<()> {
    info!("Provisioning Kafka cluster: {} in namespace: {}", name, namespace);

    let kafkas: Api<Kafka> = Api::namespaced(k8s.client.clone(), namespace);

    let kafka_cluster = Kafka {
        metadata: kube::api::ObjectMeta {
            name: Some(name.to_string()),
            ..Default::default()
        },
        spec: KafkaSpec {
            kafka: KafkaConfig {
                replicas,
                listeners: vec![
                    GenericKafkaListener {
                        name: "plain".to_string(),
                        port: 9092,
                        listener_type: "internal".to_string(),
                        tls: false,
                    },
                    GenericKafkaListener {
                        name: "tls".to_string(),
                        port: 9093,
                        listener_type: "internal".to_string(),
                        tls: true,
                    },
                ],
                storage: Storage {
                    storage_type: StorageType::Ephemeral,
                    ..Default::default()
                },
                config: Some(serde_json::json!({
                    "offsets.topic.replication.factor": replicas,
                    "transaction.state.log.replication.factor": replicas,
                    "transaction.state.log.min.isr": 1,
                    "default.replication.factor": replicas,
                    "min.insync.replicas": 1,
                })),
            },
            zookeeper: ZookeeperConfig {
                replicas: 3,
                storage: Storage {
                    storage_type: StorageType::Ephemeral,
                    ..Default::default()
                },
            },
            entity_operator: None, // Optional, can be added later
        },
        status: None,
    };

    kafkas.create(&PostParams::default(), &kafka_cluster).await
        .context("Failed to create Kafka custom resource")?;

    info!("Kafka cluster {} created successfully", name);
    Ok(())
}
