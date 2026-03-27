    // resources/js/Components/Calendar/CalendarView.tsx
    import React, { useEffect, useState } from "react";
    import FullCalendar from "@fullcalendar/react";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import listPlugin from "@fullcalendar/list";
    // --- types come from @fullcalendar/core, NOT @fullcalendar/react ---
    import type { EventInput, EventClickArg } from "@fullcalendar/core";
    import { ScrollArea } from "@radix-ui/react-scroll-area";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import styles from "./schedule.module.css";
    type BackendEvent = {
    id: string | number;
    title: string;
    date: string; // ISO date "YYYY-MM-DD" or full ISO
    type: "Regular" | "Special" | "da_program" | string;
        start_time?: string;   // HH:mm:ss
    end_time?: string;     // HH:mm:ss
    description?: string;
    };

    type BackendSchedule = {
    id: string | number;
    title: string;
    date: string;
    time?: string;         // HH:mm:ss
    category?: string;
    description?: string;
    };

    type Props = {
    events?: BackendEvent[]; // global holidays + DA programs
    schedules?: BackendSchedule[]; // user-specific schedules
    };

    export default function CalendarView({ events = [], schedules = [] }: Props) {
    const [fcEvents, setFcEvents] = useState<EventInput[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<{
        id: string;
        title: string;
        date: string;
        type?: string;
        extendedProps?: any;
    } | null>(null);

    

    const handleEventClick = (arg: EventClickArg) => {
        const ev = arg.event;
        // event.start may be Date | null
        const date = ev.start ? ev.start.toISOString().slice(0, 10) : "";

        setSelected({
        id: ev.id,
        title: ev.title,
        date,
        type: ev.extendedProps?.type ?? ev.extendedProps?.kind ?? undefined,
        extendedProps: ev.extendedProps,
        });
        setOpen(true);
    };

    // choose a suitable initial view for mobile vs desktop (client-side)
    const initialView = typeof window !== "undefined" && window.innerWidth < 640 ? "listWeek" : "dayGridMonth";
    useEffect(() => {
    const mapped: EventInput[] = [
        ...events.map((e) => ({
        id: String(e.id),
        title: e.title,
        start: e.start_time ? `${e.date}T${e.start_time}` : e.date,
        end: e.end_time ? `${e.date}T${e.end_time}` : undefined,
        allDay: !e.start_time,
        backgroundColor:
            e.type === "Regular"
            ? "#ef4444" // red
            : e.type === "Special"
            ? "#ef4444" // orange
            : e.type === "da_program"
            ? "#3b82f6" // blue
            : "var(--imos-primary)", // fallback
        borderColor:
            e.type === "Regular"
            ? "#ef4444"
            : e.type === "Special"
            ? "#ef4444"
            : e.type === "da_program"
            ? "#3b82f6"
            : "var(--imos-primary)",
        textColor: "#fff",
        extendedProps: {
            kind: "event",
            type: e.type,
            description: e.description ?? null,
            start_time: e.start_time ?? null,
            end_time: e.end_time ?? null,
        },
        })),
        ...schedules.map((s) => ({
        id: `sch-${String(s.id)}`,
        title: s.title,
        start: s.time ? `${s.date}T${s.time}` : s.date,
        allDay: !s.time,
        backgroundColor: "#22c55e", // green for schedule
        borderColor: "#16a34a",
        textColor: "#fff",
        extendedProps: {
            kind: "schedule",
            category: s.category ?? null,
            description: s.description ?? null,
            time: s.time ?? null,
            rawId: String(s.id),
        },
        })),
    ];

    setFcEvents(mapped);
    }, [events, schedules]);


    const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = +h % 12 || 12;
    const ampm = +h < 12 ? "AM" : "PM";
    return `${hour}:${m} ${ampm}`;
    };

    return (
        <div className={styles.calendarView}>
        
        <div className="w-full bg-red-10 rounded-xl shadow p-0 w-full overflow-x-auto">
            <div className="min-w-[320px]">
                {/* <ScrollArea className="max-h-[700px] flex-1"> */}
            <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
    initialView={window.innerWidth < 640 ? "listWeek" : "dayGridMonth"}
    headerToolbar={{
        center: "",
        left: "title",
        right: "dayGridMonth,timeGridWeek,listWeek prev,next",
    }}

    
    /** ✅ Show times normally in week/list, hide only in month */
    eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        omitZeroMinute: true,
    }}
    viewDidMount={(info) => {
        if (info.view.type === 'dayGridMonth') {
        const style = document.createElement("style");
        style.innerHTML = `
            .fc-daygrid-event .fc-event-time {
            display: none !important;
            }
        `;
        document.head.appendChild(style);
        }
    }}
    
    eventDisplay="block"  // <-- makes the whole event cell colored
    events={fcEvents}
    eventClick={handleEventClick}

    /** 🔑 Maintain same height across views */
    height="auto"
    contentHeight={412}      // fixed height for week/day views      // fixed height (scrollbar appears if content overflows)
    expandRows={false}        // don’t stretch rows

    /** 🔑 Scrollable hours setup */
    slotMinTime="06:00:00"    // show hours starting from 6AM
    slotMaxTime="20:00:00"    // show hours up to 8PM
    scrollTime="08:00:00"     // default scroll to morning

    slotDuration="00:30:00"   // 30-minute slots
    dayMaxEventRows={true}
    moreLinkClick="popover"
    views={{
        timeGridWeek: {
        dayHeaderFormat: {
            weekday: "short", // "Mon"
            day: "numeric",   // "5"
            month: undefined, // hide month
        },
        },
        dayGridMonth: {
        dayHeaderFormat: {
            weekday: "short", // "Mon"
        },
        },
    }}
    
    />
            </div>
        </div>

        {/* Legend */}
        {/* <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-500 rounded"></span> Holiday
            </span>
        
            <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded"></span> DA Program/Event
            </span>
            <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded"></span> My Schedule
            </span>
        </div> */}

        

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg w-full">
            <DialogHeader>
                <DialogTitle>{selected?.title ?? "Details"}</DialogTitle>
            </DialogHeader>

            <div className="mt-2 space-y-2 text-sm sm:text-base">
                <p>
                <strong>Date:</strong> {selected?.date}
                </p>
                <p>
    <strong>Time:</strong>{" "}
    {selected?.extendedProps?.start_time
        ? formatTime(selected.extendedProps.start_time) +
        (selected.extendedProps?.end_time ? ` - ${formatTime(selected.extendedProps.end_time)}` : "")
        : "All Day"}
    </p>
                <p>
                <strong>Type:</strong>{" "}
                {selected?.extendedProps?.kind === "schedule"
                    ? "Farmer Schedule"
                    : selected?.extendedProps?.type === "da_program"
                    ? "DA Program"
                    : selected?.extendedProps?.type === "Regular"
                    ? "Regular Holiday"
                    : selected?.extendedProps?.type === "Special"
                    ? "Special Holiday"
                    : selected?.type ?? "Event"}
                </p>
                {selected?.extendedProps?.description && (
                <p>
                    <strong>Notes:</strong> {selected.extendedProps.description}
                </p>
                )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setOpen(false)}>
                Close
                </Button>

                {/* Placeholder navigation — replace routes when you create pages */}
                {selected?.extendedProps?.kind === "schedule" && (
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => {
                    // extract raw id you stored
                    const raw = selected.id.startsWith("sch-") ? selected.id.replace(/^sch-/, "") : selected.id;
                    window.location.href = `/my-schedules/${raw}`; // placeholder
                    }}
                >
                    View Schedule
                </Button>
                )}

                {selected?.extendedProps?.type === "da_program" && (
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = `/da-programs/${selected?.id}`}
                >
                    View DA Program
                </Button>
                )}

                {(selected?.extendedProps?.type === "Regular" || selected?.extendedProps?.type === "Special") && (
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => window.location.href = `/holidays/${selected?.date}`}
                >
                    View Holiday Details
                </Button>
                )}
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>

    );
    }
