import React, { useRef, useEffect, useState } from "react";
import SettingsLayout from "@/layouts/admin";
import AppLayout from "@/layouts/admin-layout";
import { Calendar, CalendarPlus, Edit3, X } from "lucide-react"; // 🖋 Add Edit3 icon
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Head, usePage, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { route } from "ziggy-js";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine-management/swine" },
  { title: "Schedules", href: "/schedules" },
];



interface Event {
  id: number;
  title: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  description: string;
  blog_id: number;
  added_by: string;
  is_global: boolean;
  type: string;          // add type
  year: number;          // ensure year is a number
}


interface BlogPost {
  id: number;
  title: string;

}

interface Props {
  // schedule: Record<string, Schedule[]>;
  event:Record<string, Event[]>;
   blogPosts?: BlogPost[];
}

const SchedulePage: React.FC<Props> = ({ event, blogPosts  }) => {
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
  const upcomingEvents = Object.entries(event)
    .filter(([date]) => date >= today)
    .sort(([a], [b]) => (a > b ? 1 : -1));

  const pastEvents = Object.entries(event)
    .filter(([date]) => date < today)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  // Group by month
  const groupByMonth = (entries: [string, Event[]][]) =>
    entries.reduce((acc, [date, events]) => {
      const monthName = new Date(date).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!acc[monthName]) acc[monthName] = [];
      acc[monthName].push([date, events]);
      return acc;
    }, {} as Record<string, [string, Event[]][]>);



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
const [eventToDelete, setEventToDelete] = useState<any>(null);

const confirmDelete = () => {
  if (!eventToDelete) return;

  toast.loading("Deleting events...");
  router.delete(`/admin/event/${eventToDelete.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Event deleted successfully!");
      setShowDeleteDialog(false);
      setEventToDelete(null);
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

 

    
  const groupedUpcoming = groupByMonth(upcomingEvents);
  const groupedPast = groupByMonth(pastEvents);

  const hasData =
    activeTab === "upcoming"
      ? upcomingEvents.length > 0
      : pastEvents.length > 0;

  const renderEvents = (groupedData: Record<string, [string, Event[]][]>) =>
    Object.entries(groupedData).map(([month, monthEvents]) => (
      <div key={month}>
        <h2 className="text-xl mt-2 font-bold mb-3 text-gray-800 dark:text-gray-100">
          {month}
        </h2>

        {monthEvents.map(([date, eventList]) => {
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
                {eventList.map((e) => (
                  <div
  key={e.id}
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
  href=""
   onClick={(ev) => { ev.preventDefault(); openEditModal(e); }}
  title="Edit Event"
  className="absolute top-2 right-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition icon-click"
>
  <Edit3 size={18} />
</Link>

<Link
  href="#"
  title="Delete Event"
    onClick={(ev) => {
    ev.preventDefault();
    setEventToDelete(e); // ✅ use 's', not 'schedule'
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
      <strong>{eventToDelete?.title || `Event ${eventToDelete?.id}`}</strong>?
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
                        {e.title}
                      </h3>
                     
                    </div>
 {e.start_time && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTime(e.start_time)}
                        </span>
                      )}
                      -
                       {e.end_time && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTime(e.end_time)}
                        </span>
                      )}
                    {e.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {e.description}
                      </p>
                    )}

                    {/* {s.swine.length > 0 && (
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
                    )} */}
{/* 
                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-400">
                      {s.category}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ));

    const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "",
    date: "",
   start_time: "08:00",   // default 8 AM
  end_time: "17:00",     // default 5 PM
    description: "",
    blog_id: blogPosts && blogPosts.length > 0 ? blogPosts[0].id : 0,
    is_global: true,
    type: "",
      year: new Date().getFullYear(), // automatically current year
  });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

const submitForm = () => {
  const newErrors: Record<string, string> = {};

  // Simple validation
  if (!form.title) newErrors.title = "Title is required";
  if (!form.date) newErrors.date = "Date is required";
  if (!form.start_time) newErrors.start_time = "Start time is required";
  if (!form.end_time) newErrors.end_time = "End time is required";
  if (!form.description) newErrors.description = "Description is required";

  // Stop if errors exist
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // clear previous errors

  // Force fixed values
  const payload = {
    ...form,
    type: "da_program",
    is_global: true,
      year: new Date().getFullYear(), // automatically current year
  };

  // ✅ Inertia POST
  router.post(route("admin.events.store"), payload, {
    onSuccess: () => {
      toast.success("Event created successfully!");
      setShowCreateModal(false);

      // Reset form, keep blog_id preselected
      setForm({
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        description: "",
        blog_id: blogPosts && blogPosts.length > 0 ? blogPosts[0].id : 0,
        type: "da_program",
        is_global: true,
          year: new Date().getFullYear(), // automatically current year
      });
    },
    onError: (serverErrors) => {
      // Server-side validation errors from Laravel
      setErrors(serverErrors);
    },
  });
};

const [showEditModal, setShowEditModal] = useState(false);
const [editForm, setEditForm] = useState({
  id: 0,
  title: "",
  date: "",
  start_time: "",
  end_time: "",
  description: "",
  blog_id: blogPosts && blogPosts.length > 0 ? blogPosts[0].id : 0,
  type: "da_program",
  is_global: true,
  year: new Date().getFullYear(),
});
const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({});

const openEditModal = (event: Event) => {
  setEditForm({
    id: event.id,
    title: event.title,
    date: event.date,
    start_time: event.start_time || "08:00",
    end_time: event.end_time || "17:00",
    description: event.description,
    blog_id: event.blog_id || (blogPosts?.[0]?.id ?? 0),
    type: event.type,
    is_global: event.is_global,
    year: event.year || new Date().getFullYear(),
  });
  setShowEditModal(true);
};

const submitEditForm = () => {
  const newErrors: Record<string, string> = {};

  if (!editForm.title) newErrors.title = "Title is required";
  if (!editForm.date) newErrors.date = "Date is required";
  if (!editForm.start_time) newErrors.start_time = "Start time is required";
  if (!editForm.end_time) newErrors.end_time = "End time is required";
  if (!editForm.description) newErrors.description = "Description is required";

  if (Object.keys(newErrors).length > 0) {
    setEditErrors(newErrors);
    return;
  }

  setEditErrors({});

  router.put(route("admin.events.update", editForm.id), editForm, {
    onSuccess: () => {
      toast.success("Event updated successfully!");
      setShowEditModal(false);
    },
    onError: (errors) => setEditErrors(errors),
  });
};

const handleEditChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  setEditForm({ ...editForm, [e.target.name]: e.target.value });
};



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
                ? renderEvents(groupedUpcoming)
                : renderEvents(groupedPast)
            ) : (
              // Empty State
              <div className="flex flex-col justify-center items-center h-[60vh] text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                  <Link href="/admin/events/create" preserveScroll>
                    <CalendarPlus
                      size={64}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </Link>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {activeTab === "upcoming"
                    ? "No upcoming Events"
                    : "No past EVentss"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeTab === "upcoming"
                    ? "You have no Events for today or the next days."
                    : "No previous Events were found."}
                </p>
              </div>
            )}
          </div>
          </ScrollArea>
          
        </div>

        {/* Floating Add Button */}
   <Button
          onClick={() => setShowCreateModal(true)}
          size="lg"
          className="fixed bottom-6 right-4 z-50 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <CalendarPlus className="h-6 w-6" />
        </Button>

          
          <Button
            size="lg"
             onClick={() => setShowCreateModal(true)}
            className="block md:hidden fixed bottom-6 right-4 z-50 rounded-xl shadow-4xl border-1 border-[var(--imos-primary)] bg-[var(--imos-primary)] hover:bg-primary hover:shadow-xl transition-all duration-300"
          >
            <CalendarPlus className="h-20 w-20 text-white" />
          </Button>
        


          {/* Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent>
             <DialogHeader>
    <DialogTitle>Create New Event</DialogTitle>
    <DialogDescription>
      Fill in the details below to create a new event.
    </DialogDescription>
  </DialogHeader>

          <div className="flex flex-col space-y-4 mt-4">

  {/* Title */}
  <div>
    <input
      type="text"
      name="title"
      placeholder="Event Title"
      value={form.title}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />
    {errors.title && (
      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
    )}
  </div>

  {/* Date */}
  <div>
    <input
      type="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />
    {errors.date && (
      <p className="text-red-500 text-sm mt-1">{errors.date}</p>
    )}
  </div>

  {/* Time fields */}
  <div className="flex gap-2">
    <div className="w-full">
      <input
        type="time"
        name="start_time"
        value={form.start_time}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
   
    </div>

    <div className="w-full">
      <input
        type="time"
        name="end_time"
        value={form.end_time}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
 
    </div>
  </div>

  {/* Description */}
  <div>
    <textarea
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />
    {errors.description && (
      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
    )}
  </div>



             {blogPosts && blogPosts.length > 0 && (
  <select
    name="blog_id"
    value={form.blog_id || ""} // default to empty if null
    onChange={handleChange}
    className="border rounded p-2 w-full"
  >
    {/* Empty option */}
    <option value="">-- Select Blog Post (optional) --</option>

    {blogPosts.map((b) => (
      <option key={b.id} value={b.id}>
        {b.title}
      </option>
    ))}
  </select>
)}


              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={submitForm}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>




        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogDescription>
        Update the details below.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col space-y-4 mt-4">
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={editForm.title}
        onChange={handleEditChange}
        className="border rounded p-2 w-full"
      />
      {editErrors.title && <p className="text-red-500 text-sm">{editErrors.title}</p>}

      <input
        type="date"
        name="date"
        value={editForm.date}
        onChange={handleEditChange}
        className="border rounded p-2 w-full"
      />
      {editErrors.date && <p className="text-red-500 text-sm">{editErrors.date}</p>}

      <div className="flex gap-2">
        <input
          type="time"
          name="start_time"
          value={editForm.start_time}
          onChange={handleEditChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="time"
          name="end_time"
          value={editForm.end_time}
          onChange={handleEditChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={editForm.description}
        onChange={handleEditChange}
        className="border rounded p-2 w-full"
      />
      {editErrors.description && <p className="text-red-500 text-sm">{editErrors.description}</p>}

      {blogPosts && blogPosts.length > 0 && (
        <select
          name="blog_id"
          value={editForm.blog_id}
          onChange={handleEditChange}
          className="border rounded p-2 w-full"
        >
          <option value="">-- Select Blog Post (optional) --</option>
          {blogPosts.map((b) => (
            <option key={b.id} value={b.id}>{b.title}</option>
          ))}
        </select>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
        <Button onClick={submitEditForm}>Update</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>


      </SettingsLayout>
    </AppLayout>
  );
};

export default SchedulePage;
