import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
        {
            name: 'ensure-routes-file',
            buildStart() {
                // Ensure routes file exists
                const routesPath = path.resolve(__dirname, 'resources/js/routes.js');
                const routesTsPath = path.resolve(__dirname, 'resources/js/routes.ts');
                
                if (!fs.existsSync(routesPath) && !fs.existsSync(routesTsPath)) {
                    fs.writeFileSync(routesPath, 'export default {};');
                    console.log('✓ Created placeholder routes file');
                }
            }
        }
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        rollupOptions: {
            // Don't externalize these - bundle them instead
            external: [],
            onwarn(warning, warn) {
                // Ignore missing module warnings during build
                if (warning.code === 'MODULE_NOT_FOUND' || 
                    warning.message?.includes('Failed to resolve import')) {
                    console.warn('⚠️ Warning:', warning.message);
                    return;
                }
                warn(warning);
            },
        },
        // Ensure dependencies are properly bundled
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true,
        },
    },
    optimizeDeps: {
        include: ['laravel-echo', 'pusher-js', 'react', 'react-dom'],
    },
});