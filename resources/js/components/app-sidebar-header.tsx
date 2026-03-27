import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Check, MessageSquare, User, StoreIcon, Syringe, HandCoins } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  user_id: number;
  actor_id: number;
  type: string;
  action: string;
  message: string;
  url: string;
  is_read: boolean;
  created_at: string;
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

interface UnreadConversation {
  id: number;
  unread_count: number;
  other_user: {
    id: number;
    name: string;
  };
}

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  const userId = Number(document.querySelector('meta[name="user-id"]')?.getAttribute('content'));

  // Fetch notifications and unread messages
  useEffect(() => {
    // Fetch notifications
    axios.get('/imos-notifications').then((res) => {
      console.log("Fetched notifications:", res.data);
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n: Notification) => !n.is_read).length);
    });

    // Fetch unread messages count
    fetchUnreadMessages();

    // Real-time notifications
    if (window.Echo && userId) {
      window.Echo.private(`user-notifications.${userId}`)
        .listen('ImosNotificationCreated', (e: { notification: Notification }) => {
          console.log("🔔 Notification Received:", e.notification);
          setNotifications((prev) => [e.notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        });
    }

    // Real-time message updates
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
  }, []);

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

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper function to get actor's display name
  const getActorName = (actor: Notification['actor']) => {
    if (!actor) return 'System';
    
    if (actor.user_information?.farm_name) {
      return actor.user_information.farm_name;
    }
    
    if (actor.user_information?.firstname && actor.user_information?.lastname) {
      return `${actor.user_information.firstname} ${actor.user_information.lastname}`;
    }
    
    return actor.name || 'User';
  };

  // Helper function to get actor's initial
  const getActorInitial = (actor: Notification['actor']) => {
    if (!actor) return 'S';
    
    const name = getActorName(actor);
    return name.charAt(0).toUpperCase();
  };

  // Get notification icon based on type with dark mode colors
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

  // Avatar component with error handling and dark mode
  const ActorAvatar = ({ actor }: { actor: Notification['actor'] }) => {
    const [imageError, setImageError] = useState(false);
    
    if (!actor) {
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

  return (
    <header className="flex lg:h-10 h-10 shrink-0 pt-2 sticky top-0 z-30 bg-background dark:bg-gray-900 items-center gap-2 border-sidebar-border/50 dark:border-gray-800 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">

      {/* LEFT SIDE: Sidebar + Breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 dark:text-gray-300 dark:hover:bg-gray-800" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* RIGHT SIDE: Messenger + Notifications */}
      <div className="flex items-center gap-4 ml-auto">

        {/* Messenger Icon with Badge */}
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

        {/* NOTIFICATIONS DROPDOWN - WITH DARK MODE SUPPORT */}
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
                    {/* Actor avatar */}
                    <ActorAvatar actor={n.actor} />

                    {/* Message content */}
                    <div className="flex flex-col text-sm flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {getActorName(n.actor)}
                        </span>
                        {getNotificationIcon(n.type)}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
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
      </div>
    </header>
  );
}