import React, { useRef, useEffect, useState } from "react";
import SettingsLayout from "@/layouts/management-layout";
import AppLayout from "@/layouts/app-layout";
import { Calendar, CalendarPlus, Edit3, X } from "lucide-react"; // 🖋 Add Edit3 icon
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Head, usePage, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine-management/swine" },
  { title: "Schedules", href: "/schedules" },
];

interface Swine {
  id: number;
  tag_number?: string;
}

interface Schedule {
  id: number;
  title: string;
  description?: string;
  time?: string;
  category: string;
  swine: Swine[];
}

interface Props {
  schedule: Record<string, Schedule[]>;
}

const SchedulePage: React.FC<Props> = ({ schedule }) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const today = new Date().toISOString().split("T")[0];




  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  // Filter schedules
  const upcomingSchedules = Object.entries(schedule)
    .filter(([date]) => date >= today)
    .sort(([a], [b]) => (a > b ? 1 : -1));

  const pastSchedules = Object.entries(schedule)
    .filter(([date]) => date < today)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  // Group by month
  const groupByMonth = (entries: [string, Schedule[]][]) =>
    entries.reduce((acc, [date, schedules]) => {
      const monthName = new Date(date).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!acc[monthName]) acc[monthName] = [];
      acc[monthName].push([date, schedules]);
      return acc;
    }, {} as Record<string, [string, Schedule[]][]>);



// const { flash } = usePage().props as { flash?: any };

// useEffect(() => {
//   if (flash?.success && flash?.update_info) {
//     const { changed_fields, added_swine, removed_swine } = flash.update_info;

//     let message = `${flash.success}\n`;

//     // Show only changed fields
//     Object.entries(changed_fields).forEach(([field, change]) => {
//       const formattedField = field.replace("_", " ").toUpperCase();
//       message += `• ${formattedField} updated to "${(change as any).new}"\n`;
//     });

//     // Swine changes summary
//     if (added_swine > 0) message += `• ${added_swine} swine added\n`;
//     if (removed_swine > 0) message += `• ${removed_swine} swine removed\n`;

//     toast.success(message.trim(), {
//       duration: 7000,
//       position: "top-right",
//     });
//   }
// }, [flash]);
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [scheduleToDelete, setScheduleToDelete] = useState<any>(null);

const confirmDelete = () => {
  if (!scheduleToDelete) return;

  toast.loading("Deleting schedule...");
  router.delete(`/swine-management/schedules/${scheduleToDelete.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Schedule deleted successfully!");
      setShowDeleteDialog(false);
      setScheduleToDelete(null);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to delete schedule. Try again.");
    },
  });
};




const { flash } = usePage().props as { flash?: any };

  useEffect(() => {
    if (flash?.success && flash?.update_info) {
      const { title, changed_fields, added_swine, removed_swine } = flash.update_info;

      let message = `✅ ${flash.success}\n\n`;
      message += `📘 Title: ${title}\n\n`;

      // Changed fields
      Object.entries(changed_fields || {}).forEach(([field, change]) => {
        const formattedField = field.replace(/_/g, " ").toUpperCase();
        message += `• ${formattedField} updated to "${(change as any).new}"\n`;
      });

      // Swine summary
      if (added_swine > 0) message += `• ${added_swine} swine added\n`;
      if (removed_swine > 0) message += `• ${removed_swine} swine removed\n`;

    toast.custom(
  (t) => (
    <div
      className={`relative flex items-start gap-3 rounded-xl shadow-lg p-4 border transition-all
        ${document.documentElement.classList.contains("dark")
          ? "bg-[#1f1f1f] text-gray-100 border-gray-700"
          : "bg-white text-gray-800 border-gray-200"}
      `}
    >
      {/* ✅ Exit Button */}
      <button
       onClick={() => toast.dismiss((t as any).id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
      >
       <X/>
      </button>

      {/* Icon */}
      <div
        className={`rounded-full flex items-center justify-center w-8 h-8 flex-shrink-0
          ${document.documentElement.classList.contains("dark")
            ? "bg-green-900/30"
            : "bg-green-100"}
        `}
      >
        <CheckCircle
          size={22}
          className={`${
            document.documentElement.classList.contains("dark")
              ? "text-green-400"
              : "text-green-600"
          }`}
        />
      </div>

      {/* Message */}
      <div className="whitespace-pre-line text-sm leading-relaxed pr-6">
        {message.trim()}
      </div>
    </div>
  ),
  { duration: 8000, position: "top-right" }
);
    }
  }, [flash]);

 

    
  const groupedUpcoming = groupByMonth(upcomingSchedules);
  const groupedPast = groupByMonth(pastSchedules);

  const hasData =
    activeTab === "upcoming"
      ? upcomingSchedules.length > 0
      : pastSchedules.length > 0;

  const renderSchedules = (groupedData: Record<string, [string, Schedule[]][]>) =>
    Object.entries(groupedData).map(([month, monthSchedules]) => (
      <div key={month}>
        <h2 className="text-2xl mt-2 font-bold mb-3 text-gray-800 dark:text-gray-100">
          {month}
        </h2>

        {monthSchedules.map(([date, scheduleList]) => {
          const isToday = date === today;
            const isPast = activeTab === "past"; // 👈 Add this
          return (
            <div
              key={date}
              className="flex flex-row mb-4 items-start"
             
            >
              {/* Left Date */}
              <div
                className={`w-1/4 sm:w-1/5 flex justify-center items-start font-semibold px-2 ${
                  isToday
                    ? "text-white bg-green-600 dark:bg-green-500 rounded-lg py-1"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {formatDate(date)}
              </div>

              {/* Right Schedule List */}
              <div className="w-3/4 sm:w-4/5 flex flex-col space-y-2 ml-2">
                {scheduleList.map((s) => (
                  <div
  key={s.id}
  className={`relative shadow-md rounded-lg p-4 transition
    ${isToday
      ? "border-2 border-green-700 dark:border-green-400 animate-pulse"
      : "border border-transparent"}
    ${
      isPast
        ? "bg-gray-100 dark:bg-gray-900 opacity-70 grayscale hover:grayscale hover:opacity-70 cursor-not-allowed"
        : "bg-white dark:bg-gray-800 hover:shadow-lg"
    }`}
>

                    {/* Edit Button (top-right corner) */}
                 <Link
  href={`/swine-management/schedules/edit/${s.id}`}
  preserveScroll
  title="Edit schedule"
  className="absolute top-2 right-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition icon-click"
>
  <Edit3 size={18} />
</Link>

<Link
  href="#"
  title="Delete schedule"
    onClick={(e) => {
    e.preventDefault();
    setScheduleToDelete(s); // ✅ use 's', not 'schedule'
    setShowDeleteDialog(true);
  }}
  className="absolute top-2 right-8 text-gray-400 hover:text-destruction dark:hover:text-red-400 transition icon-click"

>
  <Trash2 size={18} />
</Link>

<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Schedule</DialogTitle>
    </DialogHeader>
    <p>
      Are you sure you want to delete{" "}
      <strong>{scheduleToDelete?.title || `Schedule ${scheduleToDelete?.id}`}</strong>?
      This action cannot be undone.
    </p>
    <DialogFooter>
      <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={confirmDelete}>
        Yes, Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>




                    {/* Schedule Info */}
                    <div className="flex justify-between items-center flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {s.title}
                      </h3>
                      {s.time && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTime(s.time)}
                        </span>
                      )}
                    </div>

                    {s.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {s.description}
                      </p>
                    )}

                    {s.swine.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.swine.map((sw) => (
                          <span
                            key={sw.id}
                            className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 text-xs px-2 py-1 rounded"
                          >
                            {sw.tag_number ?? "No Tag"}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-400">
                      {s.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SettingsLayout>
        <div className="">
          {/* Tabs */}
          <div className="flex border-b ">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "upcoming"
                  ? "border-green-600 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-green-600"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "past"
                  ? "border-green-600 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-green-600"
              }`}
            >
              Past
            </button>
          </div>

          {/* Schedule List */}  <ScrollArea className="flex-1 p-1  sm:p-4 md:pt-0 pt-0 pb-0  h-[85vh] ">
          <div className="flex flex-col space-y-8">
            {hasData ? (
              activeTab === "upcoming"
                ? renderSchedules(groupedUpcoming)
                : renderSchedules(groupedPast)
            ) : (
              // Empty State
              <div className="flex flex-col justify-center items-center h-[60vh] text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                  <Link href="/swine-management/schedules/create" preserveScroll>
                    <CalendarPlus
                      size={64}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </Link>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {activeTab === "upcoming"
                    ? "No upcoming schedules"
                    : "No past schedules"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeTab === "upcoming"
                    ? "You have no schedules for today or the next days."
                    : "No previous schedules were found."}
                </p>
              </div>
            )}
          </div>
          </ScrollArea>
          
        </div>

        {/* Floating Add Button */}
     <Link href="/swine-management/schedules/create" preserveScroll>
          <Button
            size="lg"
            className="hidden md:block rounded-lg fixed bottom-6 right-4 z-50 text-white shadow-4xl border-[var(--imos-primary)] bg-[var(--imos-primary)] hover:bg-primary hover:shadow-xl transition-all duration-300"
          >
            <CalendarPlus className="h-8 w-8" />
          </Button>
        </Link>

          <Link href="/swine-management/schedules/create" preserveScroll>
          <Button
            size="lg"
            className="block md:hidden fixed bottom-6 right-4 z-50 rounded-xl shadow-4xl border-1 border-[var(--imos-primary)] bg-[var(--imos-primary)] hover:bg-primary hover:shadow-xl transition-all duration-300"
          >
            <CalendarPlus className="h-20 w-20 text-white" />
          </Button>
        </Link>
      </SettingsLayout>
    </AppLayout>
  );
};

export default SchedulePage;
