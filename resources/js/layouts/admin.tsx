// File: SettingsLayout.tsx

import HeadingSmall from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Head, usePage } from "@inertiajs/react";
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

import CalendarView from "@/components/calendar/calendarview";
import { useRef, useEffect, useMemo } from "react";
const sidebarNavItems: NavItem[] = [
  { title: 'List', href: '/swine', icon: null },
  { title: 'Add Swine', href: '/swine/create', icon: null },
  { title: 'Expenses', href: '#', icon: null },
  { title: 'Profile Information', href: '/profile-information', icon: null }
];


type Event = {
  id: string | number;
  title: string;
  date: string;
  type: string;
  description?: string;
};

type Schedule = {
  id: string | number;
  title: string;
  date: string;
  category?: string;
  description?: string;
};

export default function SettingsLayout({ children }: PropsWithChildren) {
   const { events, schedules } = usePage<{
      events: Event[];
      schedules: Schedule[];
    }>().props;
  const memoizedEvents = useMemo(() => events, [events]);
  const memoizedSchedules = useMemo(() => schedules, [schedules]);

  if (typeof window === 'undefined') return null;

  const currentPath = window.location.pathname;


  return (
    <div className="flex flex-col lg:flex-row  dark:bg-gray-900 ">

      {/* ===== SIDEBAR ===== */}
      <aside className="mt-2 w-full lg:w-70 xl:w-84 flex-shrink-0  pb-block border-b lg:border-b-0 ">
        
        {/* <HeadingSmall className='pl-4 mb-2'
          title="Swine Management"
          description="Start your business now"
        /> */}
        {/* <nav className="mt-4 flex flex-col space-y-1 p-4">
          {sidebarNavItems.map((item, index) => (
            <Button
              key={`${item.href}-${index}`}
              size="sm"
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start transition-colors",
                currentPath === item.href
                  ? "bg-primary text-white"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Link href={item.href} prefetch preserveScroll>
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.title}
              </Link>
            </Button>
          ))}
        </nav> */}
          <>
        <ScrollArea className="flex-1 p-0 md:pt-0 pl-1 pr-1 pt-0 pb-0 hidden lg:block ">
      <div className="p-0 sm:p-0  ">
       

        {/* Calendar component */}
        <CalendarView events={memoizedEvents} schedules={memoizedSchedules} />
         {/* Legend */}
      <div className="mt-3 grid grid-cols-2 ml-2 sm:flex sm:flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded" /> Holiday
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded" /> DA Program/Event
        </span>
      
      </div>
      </div>
      </ScrollArea>
    </>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
    
        <main className="w-full max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mix-auto @container " >
          {children}
        </main>

      


    </div>
  );
}
