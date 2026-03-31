#!/bin/bash

echo "=== Creating required directories ==="
mkdir -p bootstrap/cache
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p resources/js/routes

echo "=== Setting permissions ==="
chmod -R 775 bootstrap/cache
chmod -R 775 storage

echo "=== Generating dummy routes file ==="
# Create a placeholder routes file for Vite build
cat > resources/js/routes.js << 'EOF'
// Auto-generated placeholder for Vercel build
export default {};
EOF

# Also create for TypeScript if needed
cat > resources/js/routes.ts << 'EOF'
// Auto-generated placeholder for Vercel build
declare const routes: any;
export default routes;
EOF

echo "=== Building frontend assets ==="
npm run build

echo "=== Build completed ==="