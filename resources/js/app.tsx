import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { initializeTheme } from './hooks/use-appearance';

// Conditionally import Echo only if available
let Echo: any = null;
try {
    // Dynamic import to avoid build failures
    const echoModule = await import('laravel-echo');
    Echo = echoModule.default;
} catch (error) {
    console.warn('Laravel Echo not available:', error);
}

// Initialize Echo if available and Pusher is configured
if (Echo && (window as any).pusherKey) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: (window as any).pusherKey,
        cluster: (window as any).pusherCluster,
        forceTLS: true,
    });
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();