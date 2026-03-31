#!/bin/bash

set -e

echo "🔧 Creating Laravel directories..."
mkdir -p bootstrap/cache
mkdir -p storage/framework/{cache,sessions,views}
mkdir -p storage/logs
mkdir -p resources/js/routes

echo "🔧 Setting permissions..."
chmod -R 775 bootstrap/cache 2>/dev/null || true
chmod -R 775 storage 2>/dev/null || true

echo "🔧 Creating placeholder files..."
cat > resources/js/routes.js << 'EOF'
// Placeholder for Vercel build
export default {};
EOF

cat > resources/js/routes.ts << 'EOF'
// Placeholder for Vercel build
declare const routes: any;
export default routes;
EOF

echo "📦 Installing dependencies..."
npm ci --production=false || npm install

echo "🏗️ Building assets..."
NODE_ENV=production npm run build

echo "✅ Build completed!"