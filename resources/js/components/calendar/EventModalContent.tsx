// EventModalContent.tsx
import React from "react";
import { formatTime } from "./utils"; // or your existing formatTime function

export function EventModalContent({ data }: { data: any }) {
  return (
    <div className="mt-2 space-y-2 text-sm sm:text-base">
      <p><strong>Date:</strong> {data.date}</p>
      <p>
        <strong>Time:</strong>{" "}
        {data.extendedProps?.start_time
          ? formatTime(data.extendedProps.start_time) +
            (data.extendedProps?.end_time ? ` - ${formatTime(data.extendedProps.end_time)}` : "")
          : "All Day"}
      </p>
      <p><strong>Type:</strong> {data.extendedProps?.type ?? "Event"}</p>
      {data.extendedProps?.description && <p><strong>Notes:</strong> {data.extendedProps.description}</p>}
      {/* Add more event-specific info here */}
    </div>
  );
}

// ScheduleModalContent.tsx
import React from "react";
import { formatTime } from "./utils";

export function ScheduleModalContent({ data }: { data: any }) {
  return (
    <div className="mt-2 space-y-2 text-sm sm:text-base">
      <p><strong>Date:</strong> {data.date}</p>
      <p>
        <strong>Time:</strong>{" "}
        {data.extendedProps?.time ? formatTime(data.extendedProps.time) : "All Day"}
      </p>
      <p><strong>Category:</strong> {data.extendedProps?.category ?? "Farmer Schedule"}</p>
      {data.extendedProps?.description && <p><strong>Notes:</strong> {data.extendedProps.description}</p>}
      {/* Add more schedule-specific info here */}
    </div>
  );
}
