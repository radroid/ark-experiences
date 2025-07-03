#!/bin/bash

# Create certificates directory
mkdir -p .certificates

# Generate SSL certificate and key
openssl req -x509 -newkey rsa:2048 -keyout .certificates/key.pem -out .certificates/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Make the script executable
chmod +x scripts/generate-ssl.sh

echo "SSL certificates generated successfully!" 