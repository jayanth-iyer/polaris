use clap::Parser;

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(clap::Subcommand)]
enum Commands {
    Status,
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();
    match &cli.command {
        Some(Commands::Status) => println!("Polaris CLI: Status OK"),
        None => println!("Polaris CLI: Use --help for commands"),
    }
}
