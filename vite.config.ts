import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
     server: {
        host: '127.0.0.1',  // Use localhost instead of true
        port: 5175,       // fixed port (avoid auto-changing each run)
        cors: true,       // allows Laravel (8000) to load assets
        // hmr: {
        //     host: '192.168.0.103',  // ⚡ your laptop's IPv4 LAN address
        //     port: 5175,           // must match server.ports
        //     protocol: 'ws',
        // },
    },
});

