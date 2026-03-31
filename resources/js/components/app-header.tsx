import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftRightIcon, BookOpen, CornerDownLeft, Folder, LayoutGrid, Menu, MessageSquare, Search, SquareArrowUpRight, StoreIcon, Syringe } from 'lucide-react';
import AppLogo from './app-logo-marketplace';
import AppLogoIcon from './app-logo-icon';
import { PigIcon } from '@/components/icons'; 
import { HandCoins, HouseIcon, Calendar1, Store, UserCheck, Bell, ListCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check } from 'lucide-react';
import user from '@/routes/user';
import { route } from "ziggy-js";

const mainNavItems: NavItem[] = [
    {
        title: 'Marketplace',
        href: "/marketplace",
        icon: StoreIcon,
    },
    {
        title: 'Services',
        href: "/marketplace/services",
        icon: Syringe,
    },
    {
        title: 'Profile',
        href: `/marketplace/profile`,
        icon: UserCheck,
    },
    {
        title: 'Create Listing',
        href: '/marketplace/seller/create',
        icon: PigIcon,
    },
    {
        title: 'Exit',
        href: `/cms/exit`,
        icon: SquareArrowUpRight,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles = 'text-neutral-900';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

interface UnreadConversation {
    id: number;
    unread_count: number;
    other_user: {
        id: number;
        name: string;
    };
}

// 🔥 CHANGED: Updated Notification interface to match ImosNotification structure
interface Notification {
    id: number;
    user_id: number;        // Receiver
    actor_id: number;        // Who triggered the action
    type: string;            // marketplace, veterinary, etc.
    action: string;          // seller_review, completed, etc.
    message: string;
    url: string;
    is_read: boolean;
    created_at: string;
    // 🔥 CHANGED: Actor relationship instead of seller
    actor?: {
        id: number;
        name: string;
        user_information?: {
            profile_picture?: string | null;
            firstname?: string;
            lastname?: string;
            farm_name?: string;
        };
    };
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    
    // ----------------- Notifications State -----------------
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [messageUnreadCount, setMessageUnreadCount] = useState(0);

    const userId = Number(document.querySelector('meta[name="user-id"]')?.getAttribute('content'));

    // ✅ Fetch notifications on mount
    useEffect(() => {
        // 🔥 CHANGED: Updated endpoint to use imos-notifications
        axios.get('/imos-notifications', { withCredentials: true })
            .then(res => {
                console.log("Fetched notifications:", res.data);
                setNotifications(res.data);
                setUnreadCount(res.data.filter((n: Notification) => !n.is_read).length);
            })
            .catch(error => {
                console.error("Failed to fetch notifications:", error);
            });
    }, []);

    // ✅ Listen to real-time events
    useEffect(() => {
        if (!auth.user?.id) return;
        
        const channel = `user-notifications.${auth.user.id}`;

        if (window.Echo) {
            window.Echo.private(channel)
                .listen('ImosNotificationCreated', (e: any) => {
                    console.log("🔔 Notification Received:", e.notification);
                    setNotifications(prev => [e.notification, ...prev]);
                    setUnreadCount(prev => prev + 1);
                });

            return () => {
                window.Echo.leave(channel);
            };
        }
    }, [auth.user?.id]);

    // ✅ Message unread count logic (unchanged)
    useEffect(() => {
        fetchUnreadMessages();

        if (window.Echo && userId) {
            window.Echo.private(`user-messages.${userId}`)
                .listen('.MessageSent', () => {
                    setMessageUnreadCount((prev) => prev + 1);
                })
                .listen('.MessagesRead', () => {
                    fetchUnreadMessages();
                });
        }

        const interval = setInterval(fetchUnreadMessages, 30000);

        return () => {
            clearInterval(interval);
            if (window.Echo && userId) {
                window.Echo.leave(`user-messages.${userId}`);
            }
        };
    }, [userId]);

    const fetchUnreadMessages = async () => {
        try {
            const res = await axios.get('/conversations');
            const conversations = res.data.data || [];
            
            const total = conversations.reduce((sum: number, conv: any) => {
                return sum + (conv.unread_count || 0);
            }, 0);
            
            setMessageUnreadCount(total);
        } catch (error) {
            console.error('Failed to fetch unread messages:', error);
        }
    };

    // format date nicely
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = (now.getTime() - date.getTime()) / 1000;

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // 🔥 CHANGED: Updated endpoints to use imos-notifications
    const markAsRead = (id: number, url: string) => {
        axios.post(`/imos-notifications/${id}/read`).then(() => {
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
            );
            setUnreadCount((prev) => prev - 1);
            window.location.href = url;
        });
    };

    const markAllAsRead = () => {
        axios.post('/imos-notifications/read-all').then(() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
            setUnreadCount(0);
        });
    };

    const goToMessenger = () => {
        window.location.href = '/messenger';
    };

    // 🔥 CHANGED: Helper function to get actor's display name (instead of seller)
    const getActorName = (actor: Notification['actor']) => {
        if (!actor) return 'System';
        
        // Try farm name first for sellers
        if (actor.user_information?.farm_name) {
            return actor.user_information.farm_name;
        }
        
        // Then try firstname/lastname
        if (actor.user_information?.firstname && actor.user_information?.lastname) {
            return `${actor.user_information.firstname} ${actor.user_information.lastname}`;
        }
        
        // Fallback to name
        return actor.name || 'User';
    };

    // 🔥 CHANGED: Helper function to get actor's initial
    const getActorInitial = (actor: Notification['actor']) => {
        if (!actor) return 'S'; // S for System
        
        const name = getActorName(actor);
        return name.charAt(0).toUpperCase();
    };

    // 🔥 CHANGED: Get actor type for display (optional)
    const getActorType = (notification: Notification) => {
        if (!notification.actor) return 'System';
        return notification.actor_id === notification.user_id ? 'You' : 'Actor';
    };

    // 🔥 CHANGED: Avatar component using actor instead of seller - WITH DARK MODE
    const ActorAvatar = ({ actor }: { actor: Notification['actor'] }) => {
        const [imageError, setImageError] = useState(false);
        
        if (!actor) {
            // Default system avatar
            return (
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white dark:text-gray-100 bg-gray-500 dark:bg-gray-600 border border-gray-300 dark:border-gray-700">
                    S
                </div>
            );
        }
        
        const profilePicture = actor.user_information?.profile_picture;
        const initial = getActorInitial(actor);
        
        const colors = [
            'bg-blue-500 dark:bg-blue-600', 
            'bg-green-500 dark:bg-green-600', 
            'bg-yellow-500 dark:bg-yellow-600', 
            'bg-red-500 dark:bg-red-600', 
            'bg-purple-500 dark:bg-purple-600', 
            'bg-pink-500 dark:bg-pink-600', 
            'bg-indigo-500 dark:bg-indigo-600', 
            'bg-teal-500 dark:bg-teal-600',
            'bg-orange-500 dark:bg-orange-600', 
            'bg-cyan-500 dark:bg-cyan-600', 
            'bg-emerald-500 dark:bg-emerald-600', 
            'bg-rose-500 dark:bg-rose-600'
        ];
        
        const colorIndex = actor.id ? actor.id % colors.length : 
                          (actor.name ? actor.name.charCodeAt(0) % colors.length : 0);
        
        if (profilePicture && !imageError) {
            return (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 dark:bg-gray-100 border border-gray-300 dark:border-gray-700">
                    <img 
                        src={profilePicture.startsWith('http') ? profilePicture : `/storage/${profilePicture}`}
                        alt={getActorName(actor)}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                </div>
            );
        }
        
        return (
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white dark:text-white border border-gray-300 dark:border-gray-700 ${colors[colorIndex]}`}>
                {initial}
            </div>
        );
    };

    // 🔥 CHANGED: Get notification icon based on type - WITH DARK MODE
    const getNotificationIcon = (type: string) => {
        switch(type) {
            case 'marketplace':
                return <StoreIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
            case 'veterinary':
                return <Syringe className="h-4 w-4 text-green-500 dark:text-green-400" />;
            case 'insurance':
                return <HandCoins className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
        }
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-sidebar-border/80 dark:border-gray-800">
                <div className="mx-auto flex h-10 sm:h-12 items-center justify-between px-2 md:max-w-7xl relative">

                    {/* === LEFT: Logo / Mobile Menu === */}
                    <div className="flex items-center space-x-2 md:space-x-1">
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 dark:text-gray-300 dark:hover:bg-gray-800">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="flex flex-col bg-sidebar dark:bg-gray-900 dark:border-gray-800">
                                    <SheetHeader className="p-4">
                                        <AppLogo />
                                    </SheetHeader>
                                    <div className="flex flex-col px-4 space-y-4">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-2 font-medium text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200"
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div className="md:hidden flex items-center">
                            <span className="text-lg font-bold text-green-700 dark:text-green-400">IMOSSF Marketplace</span>
                        </div>

                        <Link href={route('cms.exit')} prefetch className="hidden md:flex items-center">
                            <AppLogo />
                        </Link>
                    </div>

                    {/* === CENTER: Menu Items === */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <NavigationMenu className="h-full">
                            <NavigationMenuList className="flex space-x-4 items-center">
                                {mainNavItems.map((item, index) => {
                                    const isActive = page.url === (typeof item.href === 'string' ? item.href : item.href.url);

                                    return (
                                        <NavigationMenuItem key={index} className="relative">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    'flex items-center px-2 text-sm transition-colors dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800',
                                                    isActive ? 'text-primary font-semibold dark:text-primary' : 'text-muted-foreground hover:text-foreground'
                                                )}
                                            >
                                                {item.icon && <Icon
                                                    iconNode={item.icon}
                                                    className={cn(
                                                        'h-5 w-5 mr-2 transition-colors',
                                                        isActive ? 'text-primary' : 'text-foreground dark:text-gray-400 group-hover:text-foreground'
                                                    )}
                                                />}
                                                <span className="hidden xl:inline">{item.title}</span>
                                            </Link>
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary dark:bg-primary"></div>
                                            )}
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* === RIGHT: Profile / Icons === */}
                    <div className="flex items-center space-x-2">
                        {/* Messenger Icon */}
                        <button
                            onClick={goToMessenger}
                            className="relative p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            title="Messenger"
                        >
                            <MessageSquare className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                            {messageUnreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 dark:bg-red-600 text-white text-xs min-w-4 h-4 px-1">
                                    {messageUnreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative dark:text-gray-300 dark:hover:bg-gray-800">
                                    <Bell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 dark:bg-red-600 text-white text-xs min-w-4 h-4 px-1">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto p-0 dark:bg-gray-900 dark:border-gray-800">
                                {notifications.length > 0 && (
                                    <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b dark:border-gray-800">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="w-full rounded-none h-9 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={markAllAsRead}
                                        >
                                            Mark all as read
                                        </Button>
                                    </div>
                                )}

                                {notifications.length === 0 ? (
                                    <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">No notifications</div>
                                ) : (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={cn(
                                                "px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-start border-b dark:border-gray-800 last:border-b-0",
                                                !n.is_read && "bg-gray-50 dark:bg-gray-800/50 font-semibold"
                                            )}
                                            onClick={() => {
                                                if (!n.is_read) {
                                                    markAsRead(n.id, n.url);
                                                } else {
                                                    window.location.href = n.url;
                                                }
                                            }}
                                        >
                                            <div className="flex items-start gap-3 flex-1">
                                                {/* ✅ Actor avatar with fallback */}
                                                <ActorAvatar actor={n.actor} />

                                                {/* ✅ Message content */}
                                                <div className="flex flex-col text-sm flex-1">
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                                            {getActorName(n.actor)}
                                                        </span>
                                                        {getNotificationIcon(n.type)}
                                                    </div>
                                                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                        {n.message}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                        {formatDate(n.created_at)}
                                                    </span>
                                                </div>

                                                {!n.is_read && <Check className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full p-1">
                                    <Avatar className="size-8">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-neutral-200 dark:bg-gray-700 text-black dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900 dark:border-gray-800">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    );
}