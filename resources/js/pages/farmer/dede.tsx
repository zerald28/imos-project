
import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { StatProps } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { route } from "ziggy-js";
import { Users, PiggyBank, Activity, Printer, Wallet, Plus, Store } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";


type MiniMessage = {
    id: number;
    sender_name: string;
    message_preview: string;
    prefix: string;
    created_at: string;
};

 interface ActivityMeta {
  id: number;
  changes?: Record<string, any>;
}

 type ActivityLog = {
  id: number;
  action: string;
  module: string;
  meta: string | ActivityMeta;
  user_id: number | null;
  user_name?: string | null;
  created_at: string;
 
};

 type ActionCount = {
  action: string;
  total: number;
};
 type SwineGroup = {
  id: number;
  name: string;
  pigs_count: number;
  avg_weight: number;
  breeds: string[];
  status: string;
   male_count: number;
   female_count: number;
};



type Props = {
  stats: StatProps;
  recentActivities: ActivityLog[];
  swineActionCounts: ActionCount[];
    swineGroups: SwineGroup[]; // ⬅️ Add this
    messages: MiniMessage[];
};

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}


export default function Dashboard() {
  const { props } = usePage<{ props: Props }>();
const { stats, recentActivities, swineActionCounts, messages = [] } = props as any;

  const lastActivity = recentActivities?.length ? recentActivities[0] : null;

  const parsedActivities: ActivityLog[] =
    recentActivities?.map((activity: ActivityLog) => ({
      ...activity,
      meta: typeof activity.meta === "string" ? JSON.parse(activity.meta) : activity.meta,
    })) || [];

     const [activeTab, setActiveTab] = useState<"summary" | "recent">("summary");
    // Extract swine groups

const swineGroups: SwineGroup[] = (props as any).swineGroups || [];

 const [currentIndex, setCurrentIndex] = useState(0);
 const currentMessage = messages.length > 0 ? messages[currentIndex] : null;
  const [slide, setSlide] = useState(false);
  useEffect(() => {
  if (!messages || messages.length <= 1) return;

  const interval = setInterval(() => {
    // slide out current message
    setSlide(true);

    setTimeout(() => {
      // update to next message
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      // slide in new message
      setSlide(false);
    }, 200); // match transition duration (duration-500)
  }, 10000);

  return () => clearInterval(interval);
}, [messages]);

const goToConversation = (conversationId: number) => {
    router.visit(`/messenger?conversation=${conversationId}`);
};

  return (
    <AppLayout>
      <Head title="Admin Dashboard - IMOS" />

      <div className="p-2">
        {/* Top Stat Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 p-2">
          {[
            { label: "Add Swine", icon: <Plus className="w-8 h-8 text-sidebar-600" />, bg: "bg-sidebar-primary-50", link: route("multicreate.index") },
            { label: "Total Swine", value: stats.totalSwine, icon: <PiggyBank className="w-8 h-8 text-amber-600" />, bg: "bg-amber-50", link: route("swine.index") },
            { label: "Active Swine", value: stats.activeSwine, icon: <Activity className="w-8 h-8 text-sky-600" />, bg: "bg-sky-50" },
            { label: "Available", value: stats.availableListingSwine, icon: <Store className="w-8 h-8 text-lime-600" />, bg: "bg-lime-50", subLabel: "Marketplace", link: route("marketplace.seller.index") + "#listings" },
            { label: "Requests", value: stats.totalRequests, icon: <Users className="w-8 h-8 text-purple-600" />, bg: "bg-purple-50", subLabel: "Marketplace", link: route("marketplace.seller.index") },
            { label: "Expenses", value: `₱${(stats.totalExpenses ?? 0).toLocaleString()}`, icon: <Wallet className="w-8 h-8 text-red-600" />, bg: "bg-red-50", link: route("expenses.index") },
          ].map((stat) => (
            <div
              key={stat.label}
              onClick={() => stat.link && Inertia.get(stat.link)}
              className="flex items-center p-3 rounded-lg shadow-sm bg-white dark:bg-gray-800"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              <div className="ml-4 flex flex-col">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-xl font-semibold">{stat.value}</span>
                {stat.subLabel && <span className="text-xs text-green-600 mt-1">{stat.subLabel}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Left Side */}
  <div className="lg:col-span-2 px-2">
    <ScrollArea className="sm:h-[461px] h-full w-full">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

      {/* CARD 1 */}
      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-md font-semibold">Card One</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Content for card one...
        </CardContent>
      </Card>

      {/* CARD 2 */}
      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-md font-semibold">Card Two</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Content for card two...
        </CardContent>
      </Card>

      {/* CARD 3 */}
      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-md font-semibold">Card Three</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Content for card three...
        </CardContent>
      </Card>

      {/* CARD 4 */}
      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-md font-semibold">Card Four</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Content for card four...
        </CardContent>
      </Card>

    </div>
      <Card className="mt-2 shadow-md border rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Swine Groups Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <table className="min-w-full text-sm border-separate border-spacing-0">
            <thead className="bg-gray-100 text-gray-700 ">
              <tr>
                {["Batch","Pigs","Male–Female","Breed","Type","Avg Weight","Actions"].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-left font-medium border-b border-gray-200"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              {swineGroups.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No groups yet.
                  </td>
                </tr>
              ) : (
                swineGroups.map((group) => (
                  <tr
                    key={group.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3">{group.name}</td>
                    <td className="px-4 py-3">{group.pigs_count}</td>

                    <td className="px-4 py-3">
                      <span className="font-medium text-blue-600">
                        {group.male_count}
                      </span>
                      {" - "}
                      <span className="font-medium text-pink-600">
                        {group.female_count}
                      </span>
                    </td>

                    <td className="px-4 py-3 truncate max-w-[120px]">
                      {group.breeds.join(", ")}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            group.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : group.status === "Quarantine"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {group.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">{group.avg_weight} kg</td>

                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-gray-100"
                        onClick={() =>
                          Inertia.visit(route("swine-group.show", group.id))
                        }
                      >
                        View / Add Record
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </ScrollArea>
  </div>




  {/* Right Side - Narrow Recent Activity & Action Summary */}
  {/* Right Side - Switchable Card */}
                    {/* the height must be depend inside content */}
          <div className="lg:col-span-1 h-full p-2 flex flex-col">

  {/* Mini Message Slider — unchanged data usage */}
  <div className="relative h-[100px] overflow-hidden mb-2">
    {currentMessage && (
      <div
        key={currentMessage.id}
        onClick={() => goToConversation(currentMessage.id)}
        className={`absolute w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 shadow-sm transition-transform duration-500 ease-in-out`}
        style={{
          transform: slide ? "translateX(-100%)" : "translateX(0)"
        }}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {currentMessage.sender_name}{" "}
            {currentMessage.prefix && `(${currentMessage.prefix})`}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
          {timeAgo(currentMessage.created_at)}

          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm overflow-hidden line-clamp-2">
          {currentMessage.message_preview}
        </p>
      </div>
    )}
  </div>

  {/* Tab Buttons — unchanged logic */}
  <div className="flex space-x-2 mb-2">
    <button
      className={`flex-1 text-xs p-1 rounded ${activeTab === "recent" ? "bg-sidebar-primary text-white" : "bg-gray-100 dark:bg-gray-700"}`}
      onClick={() => setActiveTab("recent")}
    >
      Recent
    </button>
    <button
      className={`flex-1 text-xs p-1 rounded ${activeTab === "summary" ? "bg-sidebar-primary text-white" : "bg-gray-100 dark:bg-gray-700"}`}
      onClick={() => setActiveTab("summary")}
    >
      Summary
    </button>
  </div>

  {/* SINGLE SHARED PANEL — only structure changed (keeps all data names & logic intact) */}
  <div className="relative flex-1 min-h-[80px]">

    {/* RECENT — keep mapping & variables exactly as before */}
    <div
      className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${
        activeTab === "recent" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Card className="p-2 h-full flex flex-col h-full max-h-[calc(50vh-70px)]  ">
        <CardContent className="text-sm px-2 flex-1 overflow-y-auto">
          <div className="text-sm font-semibold flex items-center mb-2">
            <Activity className="w-4 h-4 text-sidebar-primary" /> <h1>Recent Activities </h1>
          </div>

          {parsedActivities.length === 0 ? (
            <p className="text-gray-500 text-xs">No recent activity recorded.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {parsedActivities.map((activity) => {
                const meta = activity.meta as ActivityMeta;
                return (
                  <li key={activity.id} className="border-b pb-1 last:border-none">
                    <div className="font-medium text-gray-900 dark:text-gray-200">
                      {activity.action} — {activity.module}
                    </div>
                    {meta?.changes && (
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        {Object.entries(meta.changes)
                          .map(([field, value]) => `${field}: ${value}`)
                          .join(", ")}
                      </div>
                    )}
                    <div className="text-gray-500 text-xs mt-1">{new Date(activity.created_at).toLocaleString()}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>

    {/* SUMMARY — preserved original mapping/field names without edits */}
    <div
      className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${
        activeTab === "summary" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Card className="px-2 h-full py-2 flex flex-col h-full max-h-[calc(50vh-70px)] ">
        <CardContent className="text-sm px-2 mb-2 flex-1 pt-0 mt-0 overflow-y-auto space-y-2">
          <div className="text-sm font-semibold flex items-center">
  <Activity className="w-4 h-4 text-sidebar-primary" /> 
  <h1>Action Summary</h1>
</div>

{swineActionCounts.length > 0 && (
  <div className="border-b pb-2">
    {/* LIMIT HEIGHT TO ~3 ITEMS */}
    <ul className="space-y-1 text-xs max-h-[90px] overflow-y-auto pr-1">
      {swineActionCounts.map((action: ActionCount) => (
        <li key={action.action}>
          {action.total} {action.action} swine
        </li>
      ))}
    </ul>
  </div>
)}

<div className="text-sm font-semibold flex items-center mt-2">
  <Activity className="w-4 h-4 text-sidebar-primary" /> 
  <h1>Last Activity</h1>
</div>

{lastActivity && (
  <div className="max-h-[90px] overflow-y-auto pr-1">
    <p className="font-medium">{lastActivity.action}</p>
    <p className="text-xs text-gray-500">
      {new Date(lastActivity.created_at).toLocaleString()}
    </p>
  </div>
)}

        </CardContent>
      </Card>
    </div>

  </div>
</div>



</div>
      </div>
    </AppLayout>
  );
}
