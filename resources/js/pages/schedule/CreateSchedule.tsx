import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ make sure you import this at the top


const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine" },
  { title: "Schedules", href: "/swine-management/schedules" },
  { title: "Create", href: "/schedules/create" },
];

type Swine = {
  id: number;
  name: string;
  group_id?: number | null;
  tag_number: string;
   created_at: string; // 🟢 Add this
};

type Group = {
  id: number;
  name: string;
  swine: Swine[];
};

type Props = {
  swine: Swine[];
  groups: Group[];
   selectedSwineIds?: number[];
};

export default function CreateSchedule({ swine, groups,selectedSwineIds = [] }: Props) {
 const normalizedIds = (selectedSwineIds || []).map((id) => Number(id));

const form = useForm({
  title: "",
  description: "",
  date: "",
  category:"Schedule",
  swine_ids: normalizedIds,
});
useEffect(() => {
  console.log("Swine IDs in form:", form.data.swine_ids);
}, [form.data.swine_ids]);


  

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  // Automatically select group swines
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g) => g.id === selectedGroup);
      if (group) {
        const groupSwineIds = group.swine.map((s) => s.id);
        const merged = Array.from(new Set([...form.data.swine_ids, ...groupSwineIds]));
        form.setData("swine_ids", merged);
      }
    }
  }, [selectedGroup]);

  const toggleSwine = (swineId: number) => {
    if (form.data.swine_ids.includes(swineId)) {
      form.setData(
        "swine_ids",
        form.data.swine_ids.filter((id) => id !== swineId)
      );
    } else {
      form.setData("swine_ids", [...form.data.swine_ids, swineId]);
    }
  };

  

  const handleUncheckAll = () => {
    form.setData("swine_ids", []);
    setSelectedGroup(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  form.post('/swine-management/schedules', {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Schedule created successfully!");
      form.reset();
      setSelectedGroup(null);
    },
    onError: (errors) => {
      if (errors) {
        toast.error("Please fix the errors in the form. Select a Swine.");
        console.error("Validation errors:", errors);
      }
    },
  });
};

  const selectedCount = form.data.swine_ids.length;

  const sortedSwine = React.useMemo(() => {
  if (!swine) return [];

  const prioritizedIds = new Set<number>();

  // 1️⃣ Add swine from selected group
  if (selectedGroup) {
    const group = groups.find((g: Group) => g.id === selectedGroup);
    if (group) {
      group.swine.forEach((s: Swine) => prioritizedIds.add(s.id)); // ✅ type added here
    }
  }

  // 2️⃣ Add explicitly passed swine_ids (from another page)
  form.data.swine_ids.forEach((id: number) => prioritizedIds.add(id)); // optional typing

  // Sort: prioritized swine first
  return [...swine].sort((a: Swine, b: Swine) => { // ✅ type added here
    const aPrioritized = prioritizedIds.has(a.id);
    const bPrioritized = prioritizedIds.has(b.id);

    if (aPrioritized && !bPrioritized) return -1;
    if (!aPrioritized && bPrioritized) return 1;

    // If both are same (both prioritized or not), newest first
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}, [swine, selectedGroup, groups, form.data.swine_ids]);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl sm:mt-5 mx-auto bg-white dark:bg-gray-900 shadow rounded p-4">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-gray-100">
          Create Schedule
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={form.data.title}
              onChange={(e) => form.setData("title", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={form.data.description}
              onChange={(e) => form.setData("description", e.target.value)}
            />
          </div>

          {/* Date */}
        {/* Date */}
<div>
  <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
    Date
  </label>
  <input
    type="date"
    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
               px-3 py-2 text-base shadow-sm
               focus:outline-none focus:ring-2 focus:ring-green-500 
               focus:border-green-500 transition-all
               [color-scheme:light] 
               [&::-webkit-calendar-picker-indicator]:cursor-pointer 
               [&::-webkit-calendar-picker-indicator]:filter-green"
    value={form.data.date}
    onChange={(e) => form.setData("date", e.target.value)}
    required
  />
</div>


          {/* Category */}
         {/* Category */}
<div>
  <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
    Category
  </label>
  <Select
    value={form.data.category}
    onValueChange={(value) => form.setData("category", value)}
  >
    <SelectTrigger className="select-trigger w-full h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 focus:ring-2 focus:ring-green-500">
      <SelectValue placeholder="Select Category" />
    </SelectTrigger>
    <SelectContent className="dark:bg-gray-800">
      <SelectItem value="Health">Health</SelectItem>
      <SelectItem value="Marketplace">Marketplace</SelectItem>
      <SelectItem value="Schedule">Schedule</SelectItem>
    </SelectContent>
  </Select>
</div>


          {/* Select Group */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Select Group
            </label>

            <Select
              value={selectedGroup ? String(selectedGroup) : "none"}
              onValueChange={(value) =>
                setSelectedGroup(value === "none" ? null : parseInt(value))
              }
            >
              <SelectTrigger className="select-trigger w-full border rounded px-3 py-2 h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="-- None --" />
              </SelectTrigger>

              <SelectContent className="dark:bg-gray-800">
                <SelectItem value="none">-- None --</SelectItem>
                {groups.map((g) => (
                  <SelectItem key={g.id} value={String(g.id)}>
                    {g.name} ({g.swine.length} swine)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swine Selection Header */}
          <div className="flex justify-between items-center mb-2 mt-4">
            <label className="block font-medium text-gray-800 dark:text-gray-200">
              Select Swines
            </label>

            {/* Count & Uncheck All Button */}
            {selectedCount > 0 && (
              <div className="flex items-center gap-3 ">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Selected: {selectedCount}
                </span>
                <button
                  type="button"
                  onClick={handleUncheckAll}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  
                >
                  Uncheck All
                </button>
              </div>
            )}
          </div>

          {/* Swine List */}
          <div className="ml-5 grid grid-cols-1 gap-3 max-h-64 overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/50 p-1">
            {sortedSwine.map((s: Swine) => {
  const isSelected = form.data.swine_ids.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSwine(s.id)}
                  className={`grid grid-cols-[auto_1fr] select-trigger items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all
                    ${
                      isSelected
                        ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSwine(s.id)}
                    className="w-4 h-4 ml-[2px] accent-green-600"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {s.name || "Unnamed Swine"}
                    </span>
                    {s.tag_number && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        Tag: {s.tag_number}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="btn btn-primary w-full"
            disabled={form.processing}
          >
            {form.processing ? "Saving..." : "Create Schedule"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
