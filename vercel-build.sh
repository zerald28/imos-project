#!/bin/bash
echo "🚀 Starting Vercel build..."

# Only install PHP dependencies
composer install --no-dev --optimize-autoloader --no-interaction --classmap-authoritative

# Verify assets exist
if [ ! -d "public/build" ]; then
    echo "⚠️ Warning: public/build not found! Assets may be missing."
    exit 1
fi

echo "✅ Build completed in $(($SECONDS / 60)) minutes"