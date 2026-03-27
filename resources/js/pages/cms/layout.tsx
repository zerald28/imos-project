import React, { ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Home, Pencil, FileText, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { route } from 'ziggy-js';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CMSLayoutProps {
  children: ReactNode;
  userName?: string;
  userRole?: 'admin' | 'enforcer' | 'author' | 'farmer' | 'buyer';
}

interface MenuItem {
  title: string;
  href: string;
  icon?: ReactNode;
  description?: string;
}

export default function CMSLayout({ children, userName, userRole }: CMSLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const page = usePage<{ url: string; flash?: { success?: string; error?: string } }>();

  // Menu configuration with descriptions
  const menuItems: MenuItem[] = [
    { 
      title: 'Author Page', 
      href: '/cms/author', 
      icon: <Home size={20} />,
      description: 'View your author dashboard'
    },
    { 
      title: 'Create Blog', 
      href: '/cms/create', 
      icon: <Pencil size={20} />,
      description: 'Write a new blog post'
    },
    { 
      title: 'Blogs', 
      href: '/cms/blog', 
      icon: <FileText size={20} />,
      description: 'Manage your blog posts'
    },
    { 
      title: 'Exit CMS', 
      href: route('cms.exit'), 
      icon: <LogOut size={20} />,
      description: 'Return to main site'
    },
  ];

  // Get user initials for avatar
  const getInitials = () => {
    if (!userName) return 'U';
    return userName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge color with dark mode support
  const getRoleColor = () => {
    switch(userRole) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'enforcer': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'author': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Determine active menu based on current URL
  const currentPath = page.url;
  const activeItem = menuItems.find(item => currentPath.startsWith(item.href));
  const currentTitle = activeItem?.title || 'Dashboard';

  useEffect(() => {
    if (page.props.flash?.success) toast.success(page.props.flash.success);
    if (page.props.flash?.error) toast.error(page.props.flash.error);
  }, [page.props.flash]);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative z-0">
        {/* Mobile overlay - dark mode support */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 dark:bg-black/80 backdrop-blur-sm md:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar - dark mode support */}
        <aside 
          className={`
            fixed z-50 inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-900 flex flex-col 
            transform md:translate-x-0 transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Sidebar Header - dark mode support */}
          <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">IMOSSF CMS</h2>
                <p className="text-emerald-100 dark:text-emerald-200 text-sm mt-1">Content Management System</p>
              </div>
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-emerald-500 dark:hover:bg-emerald-600 text-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* User Info - dark mode support */}
          {userName && (
            <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700 shadow-md">
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {userName}
                  </p>
                  {userRole && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleColor()}`}>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation - dark mode support */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {menuItems.map(item => {
              const isActive = currentPath.startsWith(item.href);
              
              return (
                <Tooltip key={item.href} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      preserveState
                      className={`
                        group flex items-center gap-3 rounded-lg px-3 py-3 transition-all relative
                        ${isActive 
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium shadow-sm' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-sm">{item.title}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  {item.description && (
                    <TooltipContent side="right" className="max-w-xs dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                      <p>{item.description}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>

          {/* Sidebar Footer - dark mode support */}
          <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Version 2.0.0
            </p>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:pl-72 z-0">
          {/* Mobile Header - dark mode support */}
          <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-30 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100">{currentTitle}</h1>
            </div>
            {userName && (
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium truncate max-w-[150px]">
                {userName}
              </span>
            )}
          </header>

          {/* Desktop Header - dark mode support */}
          <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hidden md:block shadow-sm sticky top-0 z-30">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{currentTitle}</h1>
                {userName && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Welcome,</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{userName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative z-0 dark:bg-gray-900">
            <div className="p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>

        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: 'white',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            },
            className: 'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
          }}
        />
      </div>
    </TooltipProvider>
  );
}