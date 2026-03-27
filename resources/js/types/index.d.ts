import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
// icustomize this
import type { LucideIcon } from "lucide-react";
import type * as React from "react";

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    // ✅ Allow LucideIcon OR a plain React SVG component
    icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>> | null;
    isActive?: boolean;
}


export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


import Echo from 'laravel-echo';

declare global {
  interface Window {
    Echo: Echo;
  }
}

export {};
// global.d.ts
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: any;
  }
}
