#!/bin/bash

set -e

echo "🔧 Creating Laravel directories..."
mkdir -p bootstrap/cache
mkdir -p storage/framework/{cache,sessions,views}
mkdir -p storage/logs

echo "🔧 Setting permissions..."
chmod -R 775 bootstrap/cache 2>/dev/null || true
chmod -R 775 storage 2>/dev/null || true

# REMOVE the placeholder file creation — these break the build

echo "📦 Installing dependencies..."
npm ci --production=false || npm install

echo "🏗️ Building assets..."
NODE_ENV=production npm run build

echo "✅ Build completed!"