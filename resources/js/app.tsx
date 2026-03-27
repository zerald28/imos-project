import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import axios from 'axios';
import { useEffect } from "react";
import { router } from '@inertiajs/react';


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Safely get the CSRF token as a string
const csrfToken =
  document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content") || "";

    

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// ✅ Make Pusher globally available before initializing Echo
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY, // your key
  wsHost: import.meta.env.VITE_REVERB_HOST,  // 192.168.1.13
  wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
  wssPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws'], // make sure to use 'ws' in LAN

    // ✅ Auth config — now type-safe
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  },
    withCredentials: true, // ✅ <— Add this
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: { color: '#4B5563' },
});

initializeTheme();


