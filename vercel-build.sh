#!/bin/bash

# Install PHP dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Create required directories
mkdir -p bootstrap/cache
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# Set permissions
chmod -R 775 bootstrap/cache
chmod -R 775 storage

# Generate application key (if not set in Vercel env)
php artisan key:generate --force

# Clear all cache first
php artisan optimize:clear

# Cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Run migrations (force for production)
php artisan migrate --force

# Build frontend assets
npm install
npm run build