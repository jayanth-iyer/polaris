use kube::Client;
use anyhow::{Result, Context};
use tracing::info;

use std::fmt;

pub struct K8sClient {
    pub client: Client,
}

impl fmt::Debug for K8sClient {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("K8sClient").finish()
    }
}

impl K8sClient {
    pub async fn new() -> Result<Self> {
        info!("Initializing Kubernetes client");
        let client = Client::try_default().await
            .context("Failed to create Kubernetes client")?;
        Ok(Self { client })
    }

    pub async fn check_health(&self) -> Result<()> {
        let _ = self.client.list_core_api_versions().await
            .context("Failed to connect to Kubernetes API")?;
        Ok(())
    }
}
