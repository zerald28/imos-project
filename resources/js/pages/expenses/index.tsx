// File: resources/js/Pages/Expenses/ExpenseIndex.tsx
import React, { useEffect, useState, useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/app-layout";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface ExpenseFormData {
  category: string;
  description: string;
  amount: string;
  quantity: string;
  unit: string;
  date: string;
  swine_ids: number[];
  group_id: number | null;
}

type Swine = {
  id: number;
  name: string;
  tag_number: string;
  group_id?: number | null;
  created_at: string;
};

type Group = {
  id: number;
  name: string;
  swine: Swine[];
};

export default function ExpenseIndex() {
  const { swine, groups, expenses } = usePage().props as any;
  const { selected_group_id, selected_swine_ids, selected_expense } = usePage().props as any;
  
  const [highlightedExpenseId, setHighlightedExpenseId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [delayedSelected, setDelayedSelected] = useState<Set<number>>(new Set());
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ExpenseFormData>({
    category: "feed",
    description: "",
    quantity: "",
    unit: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    swine_ids: [],
    group_id: null,
  });

  const { data, setData, post, put, reset, processing } = form;

  // Summary calculations
  const summary = {
    total: expenses?.reduce((sum: number, exp: any) => sum + parseFloat(exp.amount || 0), 0) || 0,
    breakdown: Object.entries(
      expenses?.reduce((acc: any, exp: any) => {
        acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount || 0);
        return acc;
      }, {}) || {}
    ).map(([category, amount]: [string, any]) => ({
      category,
      percentage: ((amount / (expenses?.reduce((s: number, e: any) => s + parseFloat(e.amount || 0), 0) || 1)) * 100).toFixed(1),
    })),
    latest: expenses?.slice(0, 5) || [],
  };

  // Handle selected props from parent
  useEffect(() => {
    if (selected_group_id) {
      setSelectedGroup(Number(selected_group_id));
    }

    if (selected_swine_ids?.length) {
      setData("swine_ids", selected_swine_ids.map((id: string | number) => Number(id)));
    }
  }, [selected_group_id, selected_swine_ids]);

  // Handle selected expense for editing
  useEffect(() => {
    if (selected_expense) {
      setData({
        category: selected_expense.category,
        description: selected_expense.description,
        quantity: selected_expense.quantity,
        unit: selected_expense.unit,
        amount: selected_expense.amount,
        date: selected_expense.date,
        swine_ids: selected_expense.swine_ids || [],
        group_id: selected_expense.swine_group_id || null,
      });
      setSelectedGroup(selected_expense.swine_group_id || null);
      setEditingExpenseId(selected_expense.id);
    }
  }, [selected_expense]);

  // Auto-select swines when group is selected
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g: Group) => g.id === selectedGroup);
      if (group) {
        const groupSwineIds = group.swine.map((s: Swine) => s.id);
        setData(
          "swine_ids",
          Array.from(new Set([...data.swine_ids, ...groupSwineIds]))
        );
      }
    }
  }, [selectedGroup]);

  // 20-second delayed top selection
  useEffect(() => {
    if (data.swine_ids.length === 0) return;

    const timer = setTimeout(() => {
      setDelayedSelected(new Set(data.swine_ids));
    }, 20000);

    return () => clearTimeout(timer);
  }, [data.swine_ids]);

  const toggleSwine = (swineId: number) => {
    if (data.swine_ids.includes(swineId)) {
      setData("swine_ids", data.swine_ids.filter((id) => id !== swineId));
    } else {
      setData("swine_ids", [...data.swine_ids, swineId]);
    }
  };

  const handleUncheckAll = () => {
    setData("swine_ids", []);
    setSelectedGroup(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData("group_id", selectedGroup || null);

    if (editingExpenseId) {
      put(route("expenses.update", editingExpenseId), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Expense updated successfully!");
          setEditingExpenseId(null);
        },
      });
    } else {
      post(route("expenses.store"), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Expense recorded successfully!");
          reset();
          setSelectedGroup(null);
        },
        onError: (errors: any) => {
          toast.error("Failed to save expense. Please check your input.");
          console.error(errors);
        },
      });
    }
  };

  const clearForm = () => {
    reset();
    setSelectedGroup(null);
    setEditingExpenseId(null);
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    axios
      .delete(route("expenses.destroy", expenseId))
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error.response?.data || error);
        toast.error("Failed to delete expense.");
      });
  };

  const handleEditExpense = (exp: any) => {
    setData({
      category: exp.category,
      description: exp.description,
      quantity: exp.quantity,
      unit: exp.unit,
      amount: exp.amount,
      date: exp.date,
      swine_ids: exp.swine_ids || [],
      group_id: exp.swine_group_id || null,
    });
    setSelectedGroup(exp.swine_group_id || null);
    setEditingExpenseId(exp.id);
    
    // Scroll to top
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;
    if (viewport) viewport.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute sorted swine
  const sortedSwine = React.useMemo(() => {
    if (!swine) return [];

    const delayedSet = delayedSelected;
    const groupSwine: Swine[] = selectedGroup
      ? groups.find((g: Group) => g.id === selectedGroup)?.swine || []
      : [];

    const groupSet = new Set(groupSwine.map((s: Swine) => s.id));

    const topSelected = swine.filter((s: Swine) => delayedSet.has(s.id));
    const remainingGroup = groupSwine.filter((s: Swine) => !delayedSet.has(s.id));
    const otherSwine = swine.filter((s: Swine) => !delayedSet.has(s.id) && !groupSet.has(s.id));

    return [...topSelected, ...remainingGroup, ...otherSwine];
  }, [swine, selectedGroup, groups, delayedSelected]);

  const selectedCount = data.swine_ids.length;

  return (
    <AppLayout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
        {/* LEFT SIDE: QUICK SUMMARY PANEL */}
        <div className="col-span-1 space-y-4">
          <Card className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
            <CardHeader className="text-lg font-bold text-green-700 dark:text-green-400">
              Quick Expense Summary
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Total Expenses */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Total Expenses
                </h3>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ₱{summary.total.toLocaleString()}
                </p>
              </div>

              <Separator />

              {/* Category Breakdown */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Category Breakdown (%)
                </h3>
                <div
                  className={`grid ${
                    summary.breakdown.length > 4
                      ? "grid-cols-2 gap-x-6 gap-y-3"
                      : "grid-cols-1 gap-y-3"
                  }`}
                >
                  {summary.breakdown.map((cat: any) => (
                    <div key={cat.category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize text-gray-700 dark:text-gray-300">
                          {cat.category}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {cat.percentage}%
                        </span>
                      </div>
                      <Progress
                        value={cat.percentage}
                        className="h-2 bg-gray-200 dark:bg-gray-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Latest Expenses */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Latest Expenses
                </h3>
                <ul className="space-y-2 max-h-56 overflow-y-auto">
                  {summary.latest.map((exp: any, idx: number) => {
                    const isSelected = highlightedExpenseId === exp.id;
                    return (
                      <li
                        key={idx}
                        className={`p-2 rounded-lg border flex justify-between items-start gap-2 cursor-pointer transition-all
                          ${
                            isSelected
                              ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600"
                              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        onClick={() => {
                          setHighlightedExpenseId(exp.id);
                          handleEditExpense(exp);
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-semibold">{exp.category}</span>
                            <span className="text-green-700 dark:text-green-400 font-medium">
                              ₱{parseFloat(exp.amount).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{exp.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                            {exp.quantity} {exp.unit} • {new Date(exp.date).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExpense(exp.id);
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 font-bold text-sm"
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE: EXPENSE FORM */}
        <div className="col-span-2">
          <ScrollArea ref={scrollAreaRef} className="h-[84vh] pt-2 pb-1">
            <div className="">
              {/* Expense Form */}
              <Card>
                <CardHeader className="font-bold text-lg">
                  {editingExpenseId ? "Edit Expense" : "Add New Expense"}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="flex flex-col gap-4">
                        {/* Category */}
                        <Select
                          value={data.category}
                          onValueChange={(value) => setData("category", value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feed">Feed</SelectItem>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="labor">Labor</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Description */}
                        <Input
                          placeholder="Description"
                          value={data.description}
                          onChange={(e) => setData("description", e.target.value)}
                          className="w-full"
                        />

                        {/* Quantity & Unit */}
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Quantity"
                            value={data.quantity}
                            onChange={(e) => setData("quantity", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="text"
                            placeholder="Unit"
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                            className="flex-1"
                          />
                        </div>

                        {/* Amount */}
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={data.amount}
                          onChange={(e) => setData("amount", e.target.value)}
                          className="w-full"
                        />

                        {/* Date */}
                        <Input
                          type="date"
                          value={data.date}
                          onChange={(e) => setData("date", e.target.value)}
                          className="w-full"
                        />
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-4">
                        {/* Select Group */}
                        <div>
                          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">
                            Assign to Group
                          </label>
                          <Select
                            value={selectedGroup ? String(selectedGroup) : "none"}
                            onValueChange={(value) =>
                              setSelectedGroup(value === "none" ? null : parseInt(value))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="-- None --" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-- None --</SelectItem>
                              {groups?.map((g: Group) => (
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
                            Assign to Swines
                          </label>
                          {selectedCount > 0 && (
                            <div className="flex items-center gap-3">
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
                        <div className="ml-1 grid grid-cols-1 gap-3 max-h-64 overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/50 p-2">
                          {sortedSwine.map((s: Swine) => {
                            const isSelected = data.swine_ids.includes(s.id);
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
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 mt-6">
                      {editingExpenseId && (
                        <Button
                          type="button"
                          className="bg-gray-300 text-gray-800 hover:bg-gray-400 flex-1"
                          onClick={clearForm}
                        >
                          Cancel Editing
                        </Button>
                      )}

                      <Button
                        type="submit"
                        className="btn btn-primary flex-1"
                        disabled={processing}
                      >
                        {processing
                          ? editingExpenseId
                            ? "Updating..."
                            : "Saving..."
                          : editingExpenseId
                          ? "Update Expense"
                          : "Add Expense"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Recent Expenses Table */}
              <Card className="mt-4">
                <CardHeader className="font-bold text-lg">Recent Expenses</CardHeader>
                <CardContent>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses?.data?.map((exp: any) => (
                        <tr key={exp.id} className="border-b">
                          <td className="p-2">{exp.date}</td>
                          <td className="p-2 capitalize">{exp.category}</td>
                          <td className="p-2">₱{exp.amount}</td>
                          <td className="p-2">{exp.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
    </AppLayout>
  );
}