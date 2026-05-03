// resources/js/Components/Calendar/CalendarView.tsx
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type { EventInput, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, ChevronDown, ExternalLink } from "lucide-react";
import styles from "./calendarview.module.css";

type BackendEvent = {
  id: string | number;
  title: string;
  date: string;
  type?: "Regular" | "Special" | "da_program" | string;
  start_time?: string;
  end_time?: string;
  description?: string;
  blog_slug?: string | null;
};

type BackendSchedule = {
  id: string | number;
  title: string;
  date: string;
  time?: string;
  category?: string;
  description?: string;
};

type Props = {
  events?: BackendEvent[];
  schedules?: BackendSchedule[];
};

export default function CalendarView({ events = [], schedules = [] }: Props) {
  const calendarRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [calendarTitle, setCalendarTitle] = useState("");
  const [fcEvents, setFcEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [compact, setCompact] = useState(false);
  const [currentView, setCurrentView] = useState<string>(
    typeof window !== "undefined" && window.innerWidth < 640 ? "listWeek" : "dayGridMonth"
  );

  /* map backend -> FullCalendar events */
  useEffect(() => {
    const mapped: EventInput[] = [
      ...events.map((e) => {
        const start = e.start_time ? `${e.date}T${e.start_time}` : e.date;
        const end = e.end_time ? `${e.date}T${e.end_time}` : undefined;
        return {
          id: String(e.id),
          title: e.title,
          start,
          end,
          allDay: !e.start_time,
          color:
            e.type === "Regular"
              ? "#ef4444"
              : e.type === "Special"
              ? "#ef4444"
              : e.type === "da_program"
              ? "#3b82f6"
              : undefined,
          extendedProps: { 
            kind: "event", 
            type: e.type, 
            description: e.description, 
            start_time: e.start_time ?? null, 
            end_time: e.end_time ?? null,
            blog_slug: e.blog_slug ?? null,
          },
        } as EventInput;
      }),
      ...schedules.map((s) => {
        const start = s.time ? `${s.date}T${s.time}` : s.date;
        return {
          id: `sch-${String(s.id)}`,
          title: s.title,
          start,
          allDay: !s.time,
          color: "#22c55e",
          extendedProps: { 
            kind: "schedule", 
            category: s.category ?? null, 
            description: s.description ?? null, 
            time: s.time ?? null, 
            rawId: String(s.id) 
          },
        } as EventInput;
      }),
    ];
    setFcEvents(mapped);
  }, [events, schedules]);

  const handleEventClick = (arg: EventClickArg) => {
    const ev = arg.event;
    const date = ev.start ? ev.start.toISOString().slice(0, 10) : "";
    setSelected({
      id: ev.id,
      title: ev.title,
      date,
      extendedProps: ev.extendedProps,
    });
    setOpen(true);
  };

  // Listen for sidebar toggle and window resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setCompact(width < 520);
      
      // Force calendar to re-render on resize
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        setTimeout(() => {
          calendarApi.updateSize();
        }, 100);
      }
    });
    
    resizeObserver.observe(containerRef.current);
    
    // Also listen for window resize
    const handleWindowResize = () => {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        setTimeout(() => {
          calendarApi.updateSize();
        }, 100);
      }
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    // Listen for sidebar toggle events (custom event or mutation observer)
    const sidebarObserver = new MutationObserver(() => {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        setTimeout(() => {
          calendarApi.updateSize();
        }, 150);
      }
    });
    
    // Observe parent elements that might change when sidebar toggles
    const parentElement = containerRef.current.closest('.lg\\:col-span-1');
    if (parentElement) {
      sidebarObserver.observe(parentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'style'] 
      });
    }
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      sidebarObserver.disconnect();
    };
  }, []);

  const handleDatesSet = (arg: any) => {
    const viewType = arg.view?.type;
    const api = arg.view?.calendar;
    if (!api) return;

    setCalendarTitle(api.view?.title ?? "");

    if (viewType === "dayGridMonth" || viewType === "dayGridDay") {
      api.setOption("displayEventTime", false);
    } else {
      api.setOption("displayEventTime", true);
    }

    setCurrentView(viewType);
  };

  const getCalendarApi = () => calendarRef.current?.getApi ? calendarRef.current.getApi() : null;

  const eventRenderer = (arg: EventContentArg) => {
    const color = (arg.event.backgroundColor as string) || (arg.event.borderColor as string) || "#999";
    return (
      <div className="flex items-center gap-1 truncate" style={{ fontSize: compact ? "0.7rem" : "0.8rem" }}>
        <span style={{ width: compact ? 4 : 6, height: compact ? 4 : 6, borderRadius: 9999, background: color, display: "inline-block", flexShrink: 0 }} />
        <span className="truncate" style={{ color: 'var(--fc-text-color)' }}>
          {arg.event.title}
        </span>
      </div>
    );
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = (+h % 12) || 12;
    const ampm = +h < 12 ? "AM" : "PM";
    return `${hour}:${m} ${ampm}`;
  };

  const changeView = (viewName: string) => {
    const api = getCalendarApi();
    if (!api) return;
    try {
      api.changeView(viewName);
    } catch (err) {
      console.error("changeView error:", err);
    }
  };

  return (
    <div className={styles.calendarView}>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full h-full overflow-hidden p-3">
        <div 
          ref={containerRef} 
          className={`${compact ? "text-[12px]" : "text-[14px]"} transition-all w-full`}
          style={{ width: '100%' }}
        >
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2"> 
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.prev()}>
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4"/> 
              </Button>
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.today()}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.next()}>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4"/>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                {calendarTitle}
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center border-0 gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  >
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => changeView("dayGridMonth")}>Month</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeView("timeGridWeek")}>Week</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeView("listWeek")}>List</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView={currentView}
              headerToolbar={false}
              events={fcEvents}
              eventClick={handleEventClick}
              eventContent={eventRenderer}
              datesSet={handleDatesSet}
              fixedWeekCount={false}
              height="auto"
              contentHeight="auto"
              aspectRatio={1.2}
              expandRows={true}
              eventDisplay="block"
              slotMinTime="06:00:00"
              slotMaxTime="20:00:00"
              slotDuration="00:30:00"
              dayMaxEventRows={3}
              moreLinkClick="popover"
              views={{
                timeGridWeek: {
                  dayHeaderFormat: {
                    weekday: "short",
                    day: "numeric",
                  },
                },
                dayGridMonth: {
                  dayHeaderFormat: {
                    weekday: "short",
                  },
                },
                listWeek: {
                  listDayFormat: { weekday: "short", month: "numeric", day: "numeric" },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-neutral-900 sm:max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>{selected?.title ?? "Details"}</DialogTitle>
            <DialogDescription>
              {selected?.extendedProps?.type === "da_program" 
                ? "Event details and information" 
                : "View details for this calendar item"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-2 text-sm sm:text-base">
            <p><strong>Date:</strong> {selected?.date}</p>
            <p>
              <strong>Time:</strong>{" "}
              {selected?.extendedProps?.start_time
                ? formatTime(selected.extendedProps.start_time) +
                  (selected.extendedProps?.end_time ? ` - ${formatTime(selected.extendedProps.end_time)}` : "")
                : "All Day"}
            </p>
            <p><strong>Type:</strong> {selected?.extendedProps?.kind === "schedule" ? "Farmer Schedule" : selected?.extendedProps?.type ?? "Event"}</p>
            {selected?.extendedProps?.description && <p><strong>Notes:</strong> {selected.extendedProps.description}</p>}
            
            {selected?.extendedProps?.blog_slug && (
              <p className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <strong>Blog Post:</strong>{" "}
                <a 
                  href={`/cms/blog/${selected.extendedProps.blog_slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1"
                >
                  View Blog Post
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}