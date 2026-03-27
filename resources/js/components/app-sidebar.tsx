import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartBar, CalendarPlus, Folder, HandCoins, HouseIcon, LayoutGrid, StoreIcon, Warehouse, User, Shield, Syringe, ShoppingBag, Newspaper } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from "@inertiajs/react";
import { PigIcon } from '@/components/icons';
import type { ComponentType } from 'react';
import {route} from 'ziggy-js';

// Main navigation items (core app features)
const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/farmer/home',
        icon: HouseIcon,
    },
    {
        title: 'Swine Management',
        href: '/swine-management',
        icon: LayoutGrid,
    },
    {
        title: 'My Swine',
        href: '/my-swine', 
        icon: PigIcon,
    },
    {
        title: 'Profile',
        href: '/farmer/profile',
        icon: User,
    },
    {
        title: 'DA',
        href: '/DA/personnels',
        icon: Shield,
    },
];

// Marketplace navigation items
const marketplaceNavItems: NavItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/marketplace/seller/index',
        icon: Warehouse,
    },
    {
        title: 'My Services',
        href: '/services/provider-bookings',
        icon: Syringe,
    },
    {
        title: 'Browse Marketplace',
        href: '/marketplace/profile/',
        icon: StoreIcon,
    },
];

// Content Management navigation items
const contentNavItems: NavItem[] = [
    {
        title: 'Blog Posts',
        href: '/cms/blog',
        icon: BookOpen,
    },
    // Add more CMS items as needed
    // {
    //     title: 'Categories',
    //     href: '/cms/categories',
    //     icon: Folder,
    // },
    // {
    //     title: 'Media Library',
    //     href: '/cms/media',
    //     icon: Image,
    // },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                          <Link href={route('cms.exit')} prefetch className="hidden md:flex items-center">
    <AppLogo />
</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Main Navigation Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <NavMain items={mainNavItems} />
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Marketplace Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-green-600 uppercase tracking-wider flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Marketplace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <NavMain items={marketplaceNavItems} />
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Content Management Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                        <Newspaper className="w-3.5 h-3.5" />
                        Content Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <NavMain items={contentNavItems} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}