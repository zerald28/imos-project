import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import appLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/management-layout";
// File: resources/js/Pages/Calendar/Index.tsx

import { type BreadcrumbItem } from '@/types';

import CalendarView from "@/components/calendar/schedule";
import AppLayout from "@/layouts/app-layout";

import { useRef, useMemo} from "react";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Swine Management", href: "/swine" },
  { title: "Schedule", href: "/schedules" },
  { title: "Calendar", href: "/swine-management/schedule" }
];

export default function CalendarPage({
  events,
  schedules,
}: {
  events: any[];
  schedules: any[];
}) {

  
    
  const memoizedEvents = useMemo(() => events, [events]);
  const memoizedSchedules = useMemo(() => schedules, [schedules]);

  return (
     <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6">
      <Head title="Calendar" />
      <h1 className="text-2xl font-bold mb-4">Integrated Calendar</h1>

      <CalendarView events={memoizedEvents} schedules={memoizedSchedules} />

      {/* Legend */}
     <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-sm sm:text-base">
  {/* <span className="flex items-center gap-2">
    <span className="w-4 h-4 bg-red-500 inline-block rounded"></span> Regular Holiday
  </span>
  <span className="flex items-center gap-2">
    <span className="w-4 h-4 bg-orange-500 inline-block rounded"></span> Special Holiday
  </span> */}
  <span className="flex items-center gap-2">
    <span className="w-4 h-4 bg-blue-500 inline-block rounded"></span> DA Program/Event
  </span>
  <span className="flex items-center gap-2">
    <span className="w-4 h-4 bg-green-500 inline-block rounded"></span> My Schedule
  </span>
</div>

    </div>
   </AppLayout>
  );
}
