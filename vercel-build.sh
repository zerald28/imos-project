#!/bin/bash

# Exit on error
set -e

echo "🔧 Creating Laravel directories..."
mkdir -p bootstrap/cache
mkdir -p storage/framework/{cache,sessions,views}
mkdir -p storage/logs
mkdir -p resources/js/routes

echo "🔧 Setting permissions..."
chmod -R 775 bootstrap/cache 2>/dev/null || true
chmod -R 775 storage 2>/dev/null || true

echo "🔧 Ensuring routes file exists..."
if [ ! -f resources/js/routes.js ] && [ ! -f resources/js/routes.ts ]; then
    echo "Creating placeholder routes file..."
    echo "export default {};" > resources/js/routes.js
fi

echo "📦 Installing dependencies..."
npm ci --only=production || npm install

echo "🏗️ Building assets..."
npm run build

echo "✅ Build completed successfully!"