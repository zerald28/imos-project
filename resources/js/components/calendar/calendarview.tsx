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
  date: string; // YYYY-MM-DD
  type?: "Regular" | "Special" | "da_program" | string;
  start_time?: string; // HH:mm or HH:mm:ss
  end_time?: string;
  description?: string;
  blog_slug?: string | null; // Add blog slug
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
  const [calendarReady, setCalendarReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [currentView, setCurrentView] = useState<string>(
    typeof window !== "undefined" && window.innerWidth < 640 ? "listWeek" : "dayGridMonth"
  );

  /* map backend -> FullCalendar events (ensure valid ISO start) */
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

  /* handle event click (show dialog) */
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

  /* ResizeObserver to detect container width and toggle compact mode */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setCompact(width < 520);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* datesSet: runs after calendar changes view/dates; safe place to toggle time display */
  const handleDatesSet = (arg: any) => {
    setCalendarReady(true);
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

  /* helper to get fullcalendar api safely */
  const getCalendarApi = () => calendarRef.current?.getApi ? calendarRef.current.getApi() : null;

  /* custom small event renderer (React node) */
  const eventRenderer = (arg: EventContentArg) => {
    const color = (arg.event.backgroundColor as string) || (arg.event.borderColor as string) || "#999";
    return (
      <div className="flex items-center gap-1 truncate" style={{ fontSize: compact ? "0.8rem" : undefined }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: color, display: "inline-block", flexShrink: 0 }} />
        <span className="truncate" style={{ color: 'var(--fc-text-color)' }}>
          {arg.event.title}
        </span>
      </div>
    );
  };

  /* format helper for dialog times */
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = (+h % 12) || 12;
    const ampm = +h < 12 ? "AM" : "PM";
    return `${hour}:${m} ${ampm}`;
  };

  /* view-change handler (from dropdown) */
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
      <div className="bg-oklch(96.2% 0.03 145.8); dark:bg-gray-900 shadow w-full h-full overflow-hidden">
        <div ref={containerRef} className={`${compact ? "text-[12px]" : "text-[14px]"} transition-all`}>
          <div className="flex items-center justify-center mb-2 gap-2 mt-2"> 
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.prev()}>
                <ChevronLeft/> 
              </Button>
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.today()}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => getCalendarApi()?.next()}>
                <ChevronRight/>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
              {calendarTitle}
            </h2>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center border-0 gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeView("dayGridMonth")}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeView("timeGridWeek")}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeView("listWeek")}>List</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView={currentView}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
            }}
            events={fcEvents}
            eventClick={handleEventClick}
            eventContent={eventRenderer}
            datesSet={handleDatesSet}
            fixedWeekCount={false}
            height="auto"
            contentHeight="auto"
            aspectRatio={1.35}
            expandRows={false}
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
                  month: undefined,
                },
              },
              dayGridMonth: {
                dayHeaderFormat: {
                  weekday: "short",
                },
              },
            }}
          />
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
            
            {/* Blog Link - Show if there's a blog_slug */}
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