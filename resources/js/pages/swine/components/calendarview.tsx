import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
  id?: number;
  title: string;
  date: string;
  type?: "Regular" | "Special" | "da_program";
}

interface Schedule {
  id?: number;
  title: string;
  date: string;
  category?: string;
}

interface CalendarViewProps {
  events?: Event[];   // <-- make optional
  schedules?: Schedule[]; // <-- make optional
  onDateClick?: (dateStr: string) => void;
}

export default function CalendarView({
  events = [],       // <-- default to empty array
  schedules = [],    // <-- default to empty array
  onDateClick,
}: CalendarViewProps) {
  const [allEvents, setAllEvents] = useState<any[]>([]);

  useEffect(() => {
    const merged = [
      ...(events || []).map((e) => ({
        title: e.title,
        start: e.date,
        color:
          e.type === "Regular"
            ? "red"
            : e.type === "Special"
            ? "orange"
            : "blue",
      })),
      ...(schedules || []).map((s) => ({
        title: s.title,
        start: s.date,
        color: "green",
      })),
    ];
    setAllEvents(merged);
  }, [events, schedules]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={allEvents}
        height="auto"
        dateClick={(info) => {
          if (onDateClick) {
            onDateClick(info.dateStr);
          } else {
            alert(`Clicked on: ${info.dateStr}`);
          }
        }}
      />
    </div>
  );
}
