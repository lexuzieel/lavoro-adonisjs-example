#!/bin/bash

npm i

cp .env.example .env

# Generate random postgres port between 5433 and 6000
RANDOM_PORT=$((RANDOM % 568 + 5433))
sed -i "s/DB_PORT=5432/DB_PORT=${RANDOM_PORT}/" .env

node ace generate:key

docker compose up -d postgres

GREEN="\033[0;32m"
RESET="\033[0m"

echo -e "=========================================="
echo -e " Application is ready"
echo -e " Run ${GREEN}npm run dev${RESET} to start the application"
echo -e "=========================================="
