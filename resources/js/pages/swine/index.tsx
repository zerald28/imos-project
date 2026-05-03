// File: resources/js/Pages/Swine/index.tsx
import { useRef, useMemo, useEffect, useState } from "react";
import { type BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/management-layout";
import { Head, usePage, Link } from "@inertiajs/react";
import SwineCard from "./components/swine-card-index";
import AssignGroupMultipleModal from "./components/bulk_assign_modal"; // make sure this file exists
import { Button } from "@/components/ui/button";
import { PlusCircle, PlusIcon, Pencil, Trash2, CalendarPlus, Logs, Filter, X } from "lucide-react";
import { useScrollToRef } from "@/hooks/useScrollToRef";
import { SquareX } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import CalendarView from "@/components/calendar/schedule";
import AssignGroupModal from "./components/assign_group_modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { toast } from "sonner";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { List, Layers } from "lucide-react";
import { EllipsisVertical, Eye, CheckSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes } from "lucide-react";
import { PigIcon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine", href: "/swine-management/swine" }
];

type Group = { id: number; name: string; description?: string; group_type: string; };


type Swine = {
  id: number;
  tag_number: string;
  sex: "male" | "female";
  stage: string;
  breed?: { name: string } | null;
  cuztom_breed?: string | null;
  purpose: string;
  category: string;
  birthdate: string;
  created_at: string;
  assignedGroups: Group[];
  availableGroups: Group[];
  status: string;
};

type PageProps = {
  swine?: Swine[];
  breeds?: { id: number; name: string }[];
  groups: Group[];
};

export default function Index() {
  const { } = usePage<{


  }>().props;
  const { swine = [], breeds = [], groups = [] } = usePage<PageProps>().props;

  // selected ids for bulk operations
  const [selectedSwineIds, setSelectedSwineIds] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  // modal state for bulk assign
  const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    stage: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const categories = useMemo(() => {
    const unique = [...new Set(swine.map(s => s.category))].filter(Boolean).sort();
    return unique;
  }, [swine]);

  const stages = useMemo(() => {
    const unique = [...new Set(swine.map(s => s.stage))].filter(Boolean).sort();
    return unique;
  }, [swine]);

  const statuses = useMemo(() => {
    const unique = [...new Set(swine.map(s => s.status))].filter(Boolean).sort();
    return unique;
  }, [swine]);

  // Filter swine based on selected filters
  const filteredSwine = useMemo(() => {
    return swine.filter(s => {
      // Category filter
      if (filters.category && s.category !== filters.category) return false;
      
      // Stage filter
      if (filters.stage && s.stage !== filters.stage) return false;
      
      // Status filter
      if (filters.status && s.status !== filters.status) return false;
      
      return true;
    });
  }, [swine, filters]);

  // Check if any filters are active
  const hasActiveFilters = filters.category || filters.stage || filters.status;

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: "",
      stage: "",
      status: "",
    });
  };

  // Clear a specific filter
  const clearFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filterName]: "" }));
  };

  // Scroll ref
  const mainContentRef = useRef<HTMLDivElement>(null);
  useScrollToRef(mainContentRef as React.RefObject<HTMLElement>, 70);

  // toggle selection
  const toggleSelect = (id: number, checked: boolean) => {
    setSelectedSwineIds((prev) => {
      if (checked) {
        return prev.includes(id) ? prev : [...prev, id];
      }
      return prev.filter((sid) => sid !== id);
    });
  };

  const clearSelection = () => {
    setSelectedSwineIds([]);
  };

  const allSelected = filteredSwine.length > 0 && selectedSwineIds.length === filteredSwine.length;

  // Select All / Deselect All
  const selectAll = () => {
    if (allSelected) {
      setSelectedSwineIds([]);
    } else {
      setSelectedSwineIds(filteredSwine.map(s => s.id));
    }
  };


  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const [activeTab, setActiveTab] = useState<"swine" | "group">("swine");

  const handleBulkDelete = (selectedIds: number[]) => {
    if (selectedIds.length === 0) {
      toast.error("No swine selected.");
      return;
    }

    if (!confirm(`Delete ${selectedIds.length} swine(s)? This action cannot be undone.`)) {
      return;
    }

    router.delete(route('swine.multidelete'), {
      data: { swine_ids: selectedIds },
      onSuccess: () => {
        toast.success(`${selectedIds.length} swine(s) deleted.`);
        setSelectedSwineIds([]);
      },
      onError: () => toast.error("Failed to delete selected swine(s)."),
    });
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setEditForm({ name: group.name, description: group.description || "" });
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateGroup = async () => {
    if (!editingGroup) return;

    try {
      await axios.put(`/swine/groups/${editingGroup.id}`, editForm);
      toast.success("Group updated successfully.");
      setEditModalOpen(false);
      router.reload({ only: ["groups"] });
    } catch (error: any) {
      console.error(error.response?.data || error);
      toast.error("Failed to update group.");
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    if (!confirm("Are you sure you want to delete this group?")) return;
    try {
      await axios.delete(route("swine.groups.destroy", groupId));
      toast.success("Group deleted successfully!");
      router.reload({ only: ["groups"] });
    } catch (error) {
      toast.error("Failed to delete group.");
    }
  };

  const handleRemoveMember = async (groupId: number, swineId: number) => {
    if (!confirm("Remove this swine from group?")) return;

    try {
      await axios.delete(route("swine.groups.members.destroy", { group: groupId, swine: swineId }));
      toast.success("Swine removed from group.");
      router.reload({ only: ["groups", "swine"] });
    } catch (error: any) {
      console.error(error.response?.data || error);
      toast.error("Failed to remove swine.");
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Swine" />
      <SettingsLayout>
        <div className="space-y-6" ref={mainContentRef}>
          {/* Inside your component */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto ml-2">
              <Select
                value={activeTab}
                onValueChange={(val: "swine" | "group") => setActiveTab(val)}
              >
                <SelectTrigger
                  className="w-[140px] rounded-lg border border-green-300/40 dark:border-green-700/40
                             bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 
                             text-sm font-semibold shadow-sm
                             focus:ring-2 focus:ring-green-400/40
                             hover:bg-green-10 dark:hover:bg-green-900/30
                             transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {activeTab === "swine" ? (
                      <PigIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Boxes className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                    <span>{activeTab === "swine" ? "Swine" : "Group"}</span>
                  </div>
                </SelectTrigger>

                <SelectContent
                  className="rounded-xl shadow-md border border-green-200/30 
                             dark:border-green-700/40 dark:bg-gray-800"
                >
                  <SelectItem
                    value="swine"
                    className="flex items-center gap-2 py-2 text-gray-800 dark:text-gray-100 dark:border-transparent dark:border-0
                               hover:text-green-600 dark:hover:text-green-900 
                               data-[state=checked]:text-green-700 dark:data-[state=checked]:text-green-300
                               data-[state=checked]:bg-green-50 dark:data-[state=checked]:bg-green-900/30 
                               transition-all duration-150"
                  >
                    <span>Swine</span>
                  </SelectItem>

                  <SelectItem
                    value="group"
                    className="flex items-center gap-2 py-2 text-gray-800 dark:text-gray-100  dark:border-transparent dark:border-0
                               hover:text-green-600 dark:hover:text-green-900
                               data-[state=checked]:text-green-700 dark:data-[state=checked]:text-green-300
                               data-[state=checked]:bg-green-50 dark:data-[state=checked]:bg-green-900/30
                               transition-all duration-150"
                  >
                    <span>Group</span>
                  </SelectItem>
                </SelectContent>
              </Select>
{!selectMode && (
  <div className="text-sm text-gray-500 absolute right-15">
    {filteredSwine.length} of {swine.length} swine
  </div>
)}     </div>
          </div>

          {/* BUTTONS THAT SHOW IN SMALL SCREEN */}
          {selectMode && selectedSwineIds.length > 0 && (
            <div className="fixed bottom-6 right-6 z-50 flex gap-2 lg-top-6 lg-right-6">
              {/* Bulk Delete Button */}
              <Trash2 className="w-8 h-8 text-red-600 p-1 rounded-lg hover:bg-gray-100 transition-all duration-300"
                onClick={() => handleBulkDelete(selectedSwineIds)}
              ></Trash2>

              <Link
                href={route("marketplace.seller.create")}
                data={{ swine_ids: selectedSwineIds }}
                method="get"
                preserveScroll
              >
                <Button
                  size="lg"
                  className="p-2 rounded-xl bg-green-400 hover:bg-green-500 text-white shadow transition-all"
                >
                  Create Listing
                </Button>
              </Link>

              {/* Bulk Assign Button */}
              <Button
                onClick={() => setIsBulkAssignOpen(true)}
                size="lg"
                className="p-2 rounded-xl shadow-4xl bg-primary active-pulse text-green-900 rounded-xl shadow-4xl dark.bg-sidebar-primary/10  bg-green-400 hover:bg-primary hover:shadow-xl transition-all duration-300"
              >
                Assign to Group
              </Button>

              {/* Create Schedule Button */}
              <Link
                href="/swine-management/schedules/create"
                data={{ swine_ids: selectedSwineIds }}
                method="get"
                preserveScroll
              >
                <Button
                  size="lg"
                  className="p-2 rounded-xl shadow-4xl bg-primary active-pulse text-green-900 rounded-xl shadow-4xl dark.bg-sidebar-primary/10  bg-green-400 hover:bg-primary hover:shadow-xl transition-all duration-300"
                >
                  Create Schedule
                </Button>
              </Link>
              {/* Expenses Button */}
              <Link
                href="/swine-management/expenses"
                data={{ swine_ids: selectedSwineIds }}
                method="get"
                preserveScroll
              >
                <Button
                  size="lg"
                  className="p-2 rounded-xl shadow-4xl bg-primary active-pulse text-green-900 rounded-xl shadow-4xl dark.bg-sidebar-primary/10  bg-green-400 hover:bg-primary hover:shadow-xl transition-all duration-300"
                >
                  Expenses
                </Button>
              </Link>
              <label
                className="p-2 rounded-full  shadow-4xl bg-green-900 text-white hover:bg-sidebar-primary hover:shadow-xl transition-all duration-300"
              >
                {selectedSwineIds.length}
              </label>
            </div>
          )}

          {/* Bulk Assign button only appears when we have selection */}
          {selectedSwineIds.length === 0 && (
            <Link href="/swine-management/swine/create" preserveScroll>
              <Button
                size="lg"
                className=" block md:hidden fixed bottom-6 border-1 border-green-900/70 right-4 z-50 rounded-xl shadow-4xl bg-[var(--imos-primary)] hover:bg-primary hover:shadow-xl transition-all duration-300"
              >
                <PlusIcon className="w-5 h-5 text-white" />
              </Button>
            </Link>
          )}

          <div className="space-y-0" ref={mainContentRef}>
            <ScrollArea className="flex-1 p-1  sm:px-4  md:pt-0 pt-0 pb-0  h-[83vh] ">
              {activeTab === "swine" && (
                <div>
                  {/* Filter Section */}
                  <div className="mb-4 space-y-4">
                    {/* Filter Toggle Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="flex items-center gap-2"
                        >
                          <Filter className="h-4 w-4" />
                          Filters
                          {hasActiveFilters && (
                            <Badge variant="secondary" className="ml-1 bg-green-100 text-green-800">
                              {Object.values(filters).filter(Boolean).length}
                            </Badge>
                          )}
                        </Button> */}
                        
                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                          <div className="flex items-center gap-2">
                            {filters.category && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                Category: {filters.category}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('category')} />
                              </Badge>
                            )}
                            {filters.stage && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                Stage: {filters.stage}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('stage')} />
                              </Badge>
                            )}
                            {filters.status && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                Status: {filters.status}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('status')} />
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={resetFilters}
                              className="text-xs h-6"
                            >
                              Clear All
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Results Count */}
                     
                    </div>

                    {/* Filter Controls */}
              

{showFilters && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
    {/* Category Filter */}
    <div className="space-y-2">
      <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
      <Select
        value={filters.category || "all"}
        onValueChange={(value) => setFilters({...filters, category: value === "all" ? "" : value})}
      >
        <SelectTrigger id="category-filter">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Stage Filter */}
    <div className="space-y-2">
      <Label htmlFor="stage-filter" className="text-sm font-medium">Stage</Label>
      <Select
        value={filters.stage || "all"}
        onValueChange={(value) => setFilters({...filters, stage: value === "all" ? "" : value})}
      >
        <SelectTrigger id="stage-filter">
          <SelectValue placeholder="All Stages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stages</SelectItem>
          {stages.map(stage => (
            <SelectItem key={stage} value={stage}>
              {stage}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Status Filter */}
    <div className="space-y-2">
      <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
      <Select
        value={filters.status || "all"}
        onValueChange={(value) => setFilters({...filters, status: value === "all" ? "" : value})}
      >
        <SelectTrigger id="status-filter">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map(status => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
)}
                  </div>

                  {/* Left: Add Swine Dropdown */}
                  <div className="fixed top-15 right-1 sm:top-12 sm:right-5 z-50 flex gap-2">
                    {/* Right side "All" checkbox (only in select mode) */}
                    {selectMode && (
                      <label className="flex items-center gap-2 text-sm font-medium mr-2">
                        <Checkbox checked={allSelected} onCheckedChange={selectAll} />
                        <span>All</span>
                      </label>
                    )}

                    {selectMode && (
                      <Button
                        className="w-20 h-8 leading-tight mr-4 rounded-lg"
                        variant={selectMode ? "destructive" : "secondary"}
                        onClick={() => {
                          if (selectMode) setSelectedSwineIds([]);
                          setSelectMode((s) => !s);
                        }}
                      >
                        Cancel
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
                        >
                          <Logs className="h-5 w-5 text-green-700 dark:text-green-400" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="rounded-xl shadow-md p-1 dark:bg-gray-800">
                        {/* Add Swine Option */}
                        {selectedSwineIds.length === 0 && (
                          <DropdownMenuItem asChild>
                            <Link
                              href="/swine-management/swine/multicreate"
                              preserveScroll
                              className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 transition-all"
                            >
                              <PlusCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Add Swine</span>
                            </Link>
                          </DropdownMenuItem>
                        )}

                        {/* Select Mode Toggle */}
                        <DropdownMenuItem
                          onClick={() => {
                            if (selectMode) setSelectedSwineIds([]);
                            setSelectMode((s) => !s);
                          }}
                          className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 transition-all"
                        >
                          {selectMode ? (
                            <>
                              <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                              <span className="font-medium text-sm text-red-600 dark:text-red-400">Cancel Select</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Select Swine</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem   onClick={() => setShowFilters(!showFilters)}>
                          Filters
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Swine Cards */}
                  {filteredSwine.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-2">No swine found</div>
                      {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={resetFilters}>
                          Clear filters to see all swine
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {filteredSwine.map((s) => (
                        <SwineCard
                          key={s.id}
                          swine={s}
                          breeds={breeds}
                          groups={groups}
                          selected={selectedSwineIds.includes(s.id)}
                          onToggle={toggleSelect}
                          showCheckbox={selectMode}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "group" && (
                <div className="space-y-4">
                  {groups.length === 0 ? (
                    <p className="text-gray-500">No groups available.</p>
                  ) : (
                    groups.map((g) => {
                      const groupSwine = swine.filter((s) =>
                        s.assignedGroups.some((ag) => ag.id === g.id)
                      );

                      const breeds = Array.from(new Set(groupSwine.map(s => s.breed?.name || s.cuztom_breed || "-")));
                      const purposes = Array.from(new Set(groupSwine.map(s => s.purpose || s.purpose)));
                      const stages = Array.from(new Set(groupSwine.map(s => s.stage)));

                      return (
                        <Card key={g.id} className="rounded-lg shadow-sm hover:shadow-md transition p-0 m-0 mb-4">
                          {/* ===== Header Section ===== */}
                          <CardHeader className="bg-green-100 dark:bg-green-900/20 flex flex-col gap-2 p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              {/* Left: Title + Description */}
                              <div>
                                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                  {g.name}
                                </CardTitle>
                                {g.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {g.description}
                                  </p>
                                )}
                              </div>

                              {/* Right: Action Dropdown */}
                              <div className="mt-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-green-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                      <EllipsisVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-white text-black shadow-lg rounded-xl w-32">
                                    {/* Edit Option */}
                                    <DropdownMenuItem
                                      onClick={() => handleEditGroup(g)}
                                      className="active-pulse rounded-lg hover:!bg-green-100 data-[highlighted]:text-black cursor-pointer"
                                    >
                                      <Pencil className="w-4 h-4 text-green-600" />
                                      Edit
                                    </DropdownMenuItem>

                                    {/* Delete Option */}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteGroup(g.id)}
                                      className="active-pulse rounded-lg hover:!bg-red-100 data-[highlighted]:text-black cursor-pointer"
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" /> Delete
                                    </DropdownMenuItem>

                                    {/* Schedule Option */}
                                    <DropdownMenuItem asChild>
                                      <Link
                                        href="/swine-management/schedules/create"
                                        data={{ swine_ids: groupSwine.map((s) => s.id) }}
                                        method="get"
                                        preserveScroll
                                        className="active-pulse rounded-lg hover:!bg-green-100 data-[highlighted]:text-black cursor-pointer">
                                        <CalendarPlus className="h-5 w-5 text-yellow-600 " />
                                        Schedule
                                      </Link>
                                    </DropdownMenuItem>
                                    {/* Expense Option */}
                                    <DropdownMenuItem asChild>
                                      <Link
                                        href="/swine-management/expenses"
                                        data={{
                                          group_id: g.id,
                                          swine_ids: groupSwine.map((s) => s.id),
                                        }}
                                        method="get"
                                        preserveScroll
                                        className="active-pulse rounded-lg hover:!bg-blue-100 data-[highlighted]:text-black cursor-pointer"
                                      >
                                        <Boxes className="h-5 w-5 text-blue-600" />
                                        Add Expense
                                      </Link>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            {/* Summary Info */}
                            <CardDescription className="text-sm text-gray-700 dark:text-gray-300">
                              <span><strong>Breeds:</strong> {breeds.join(", ") || "-"}</span> |{" "}
                              <span><strong>Purpose:</strong> {purposes.join(", ") || "-"}</span> |{" "}
                              <span><strong>Stages:</strong> {stages.join(", ") || "-"}</span>
                            </CardDescription>
                          </CardHeader>

                          {/* ===== Table Section ===== */}
                          <CardContent className="overflow-x-auto p-0">
                            {groupSwine.length === 0 ? (
                              <p className="text-gray-500 p-4">No swine in this group yet.</p>
                            ) : (
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Tag #</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Sex</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Age</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                  {groupSwine.map((s) => {
                                    const birthdate = new Date(s.birthdate);
                                    const today = new Date();
                                    const ageInDays = Math.floor(
                                      (today.getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24)
                                    );

                                    return (
                                      <tr key={s.id} className="hover:bg-green-50 dark:hover:bg-green-900/20 transition">
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{s.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{s.tag_number}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{s.sex}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{ageInDays} days</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{s.status}</td>
                                        <td className="px-4 py-2 text-right">
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center justify-center gap-1"
                                              >
                                                <EllipsisVertical className="h-4 w-4 text-gray-600" />
                                              </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="bg-white text-black shadow-lg rounded-xl w-32">
                                              {/* View Swine */}
                                              <DropdownMenuItem
                                                onClick={() => window.location.href = `/swine/${s.id}`}
                                                className="active-pulse rounded-lg hover:!bg-green-100 data-[highlighted]:text-black cursor-pointer"
                                              >
                                                <Eye className="h-4 w-4 text-blue-600 mr-2" /> View
                                              </DropdownMenuItem>

                                              <DropdownMenuSeparator className="bg-gray-200 my-1 mr-2 ml-2 " />

                                              {/* Remove Swine from Group */}
                                              <DropdownMenuItem
                                                onClick={() => handleRemoveMember(g.id, s.id)}
                                                className="active-pulse rounded-lg hover:!bg-red-100 data-[highlighted]:text-black cursor-pointer"
                                              >
                                                <Trash2 className="h-4 w-4 text-destructive mr-2" /> Remove
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Group</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Enter group description"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateGroup}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk assign modal */}
        <AssignGroupMultipleModal isOpen={isBulkAssignOpen} onClose={() => setIsBulkAssignOpen(false)} swineIds={selectedSwineIds} groups={groups} />
      </SettingsLayout>
    </AppLayout>
  );
}