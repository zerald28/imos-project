#!/bin/bash

# Install Composer dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Install NPM dependencies and build assets
npm ci
npm run build

# Create storage structure
mkdir -p storage/framework/{cache,sessions,views}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Set permissions (Vercel handles this differently)
chmod -R 775 storage bootstrap/cache

# Cache Laravel configurations (optional, but helps performance)
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Build completed successfully"