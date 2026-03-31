#!/bin/bash

echo "=== Creating required directories ==="
mkdir -p bootstrap/cache
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p resources/js/routes

echo "=== Setting permissions ==="
chmod -R 775 bootstrap/cache 2>/dev/null || true
chmod -R 775 storage 2>/dev/null || true

echo "=== Creating routes file for build ==="
# Create a placeholder routes file so Vite can build
cat > resources/js/routes.js << 'EOF'
// Placeholder for Vercel build - actual routes will be generated at runtime
export default {};
EOF

# Also create TypeScript version if needed
cat > resources/js/routes.ts << 'EOF'
// Placeholder for Vercel build
declare const routes: any;
export default routes;
EOF

echo "=== Building frontend assets ==="
npm run build

echo "=== Copying build to public directory ==="
# Ensure Vite build output is in the right place
if [ -d "dist" ]; then
    cp -r dist/* public/ 2>/dev/null || true
fi

echo "=== Build completed successfully ==="