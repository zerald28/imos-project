import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Remove Wayfinder completely for Vercel
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        minify: 'esbuild',
        sourcemap: false,
        // Skip building if in Vercel environment
        ...(process.env.VERCEL && { build: false }),
    },
});