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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine" },
  { title: "Schedules", href: "/swine-management/schedules" },
  { title: "Edit", href: "#" },
];

type Swine = {
  id: number;
  name: string;
  tag_number: string;
  group_id?: number | null;
};

type Group = {
  id: number;
  name: string;
  swine: Swine[];
};

type Schedule = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  swine: Swine[];
};

type Props = {
  swine: Swine[];
  groups: Group[];
  schedule: Schedule;
};

export default function EditSchedule({ swine, groups, schedule }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  // ✅ Preload schedule data into form
  const form = useForm({
    title: schedule.title || "",
    description: schedule.description || "",
    date: schedule.date || "",
    category: schedule.category || "",
    swine_ids: schedule.swine.map((s) => s.id), // preselected swine
  });

  // ✅ Auto-select group swines
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g) => g.id === selectedGroup);
      if (group) {
        const groupSwineIds = group.swine.map((s) => s.id);
        const merged = Array.from(
          new Set([...form.data.swine_ids, ...groupSwineIds])
        );
        form.setData("swine_ids", merged);
      }
    }
  }, [selectedGroup]);

  const toggleSwine = (id: number) => {
    if (form.data.swine_ids.includes(id)) {
      form.setData(
        "swine_ids",
        form.data.swine_ids.filter((swineId) => swineId !== id)
      );
    } else {
      form.setData("swine_ids", [...form.data.swine_ids, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  form.put(`/swine-management/schedules/${schedule.id}`, {
  preserveScroll: true,
  onSuccess: () => toast.success("Schedule updated successfully!"),
  onError: () => toast.error("Please fix the errors in the form."),
});

  };

  const selectedCount = form.data.swine_ids.length;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto mt-5 bg-white dark:bg-gray-900 shadow rounded p-4">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-gray-100">
          Edit Schedule
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={form.data.title}
              onChange={(e) => form.setData("title", e.target.value)}
              className="w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={form.data.description}
              onChange={(e) => form.setData("description", e.target.value)}
              className="w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Date
            </label>
            <input
              type="date"
              value={form.data.date}
              onChange={(e) => form.setData("date", e.target.value)}
              className="w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Category
            </label>
            <input
              type="text"
              value={form.data.category}
              onChange={(e) => form.setData("category", e.target.value)}
              className="w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Group Select */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
              Select Group
            </label>
            <Select
              value={selectedGroup ? String(selectedGroup) : "none"}
              onValueChange={(val) =>
                setSelectedGroup(val === "none" ? null : parseInt(val))
              }
            >
              <SelectTrigger className="w-full border rounded px-3 py-2 h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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

          {/* Swine Selection */}
          <div className="flex justify-between items-center mb-2 mt-4">
            <label className="block font-medium text-gray-800 dark:text-gray-200">
              Select Swines
            </label>

            {selectedCount > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Selected: {selectedCount}
                </span>
                <button
                  type="button"
                  onClick={() => form.setData("swine_ids", [])}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Uncheck All
                </button>
              </div>
            )}
          </div>

          <div className="ml-5 grid grid-cols-1 gap-3 max-h-64 overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/50 p-1">
            {swine.map((s) => {
              const isSelected = form.data.swine_ids.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSwine(s.id)}
                  className={`grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSwine(s.id)}
                    className="w-4 h-4 accent-green-600"
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
            {form.processing ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
