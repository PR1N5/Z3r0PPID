#!/bin/bash

set -e  # Exit immediately if a command fails

echo "[*] Restoring file permissions..."
sudo chown -R "$USER":"$USER" .

echo "[*] Removing frontend node_modules and dist directories..."
rm -rf frontend/node_modules frontend/dist

echo "[*] Reinstalling frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

