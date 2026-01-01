#!/usr/bin/env python3
import sys
import os
import time
import argparse
from testcontainers.postgres import PostgresContainer

def start_postgres():
    print("Starting PostgreSQL container via Testcontainers...")
    # Fixed port for local development convenience
    port = 5432
    postgres = PostgresContainer("postgres:16-alpine", username="postgres", password="postgres", dbname="polaris", driver=None)
    postgres.start()
    
    # Get the dynamic port assigned by testcontainers
    port = postgres.get_exposed_port(5432)
    db_url = f"postgresql://postgres:postgres@localhost:{port}/polaris"
    
    print(f"PostgreSQL started successfully on port {port}!")
    print(f"Connection URL: {db_url}")
    print(f"Container ID: {postgres.get_wrapped_container().id}")
    
    # Save container ID and URL to a temp file for cleanup
    with open(".dev_db_info", "w") as f:
        f.write(f"ID={postgres.get_wrapped_container().id}\n")
        f.write(f"URL={db_url}\n")
    
    print("\nPress Ctrl+C to stop the database and exit.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping PostgreSQL container...")
        postgres.stop()
        if os.path.exists(".dev_db_info"):
            os.remove(".dev_db_info")
        print("Cleanup complete.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage local dev infrastructure.")
    parser.add_argument("command", choices=["up", "down"], help="Command to run")
    args = parser.parse_args()


    if args.command == "up":
        start_postgres()
    elif args.command == "down":
        if os.path.exists(".dev_db_info"):
            print("Stopping PostgreSQL container...")
            with open(".dev_db_info", "r") as f:
                lines = f.readlines()
                container_id = lines[0].strip().split("=")[1]
            os.system(f"docker stop {container_id}")
            os.remove(".dev_db_info")
            print("Container stopped and info file removed.")
        else:
            print("No active dev database found (.dev_db_info missing).")

