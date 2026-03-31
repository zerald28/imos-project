import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Skip wayfinder on Vercel — no PHP available at build time
        ...(!isVercel ? [wayfinder({ formVariants: true })] : []),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        minify: 'esbuild',
        sourcemap: false,
    },
});