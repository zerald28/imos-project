import React, { useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";
import { StatProps, PurposeCount, MonthlyMortality, BarangayDistribution, ActivityLog } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { route } from "ziggy-js";
import { Users, PiggyBank, Activity, Skull, ShoppingCart, Printer } from "lucide-react";
import AppLayout from "@/layouts/admin-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import { Link } from "@inertiajs/react";
import {
  BarChart, Bar, XAxis, CartesianGrid, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { PigIcon } from '@/components/icons';

type VeterinaryRequest = {
  id: number;
  request_type: string;
  created_at: string;
  user?: {
    name: string;
  };
  description?: string;
  status?: string;
};

type Props = {
  stats: StatProps;
  charts: {
    purposeCounts: PurposeCount[];
    monthlyMortality: MonthlyMortality[];
    barangayDistribution: BarangayDistribution[];
    barangayDistributionSwine: BarangayDistribution[];
    barangayDistributionFarmers: BarangayDistribution[];
  };
  recentActivities: ActivityLog[];
  veterinaryRequests: VeterinaryRequest[];
};

const colorPalette = ["#60a5fa", "#34d399", "#f59e0b", "#ef4444", "#7c3aed"];

export default function Dashboard() {
  const { props } = usePage<{ props: Props }>();
  const { stats, charts, recentActivities } = (props as any);
  const [showSwine, setShowSwine] = useState(false);
  const [tab, setTab] = useState("actions");
  
  // Access veterinaryRequests safely
  const veterinaryRequests = (props as any).veterinaryRequests as VeterinaryRequest[] || [];

  // Prepare monthly data
  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();
    charts.monthlyMortality.forEach((m: MonthlyMortality) => {
      const key = `${m.year}-${String(m.month).padStart(2, "0")}`;
      map.set(key, (map.get(key) || 0) + m.total);
    });
    return Array.from(map.entries()).map(([k, v]) => ({ month: k, total: v }));
  }, [charts.monthlyMortality]);

  // Purpose pie data
  type PurposeDataItem = {
    name: string;
    value: number;
    color: string;
  };

  const purposeData: PurposeDataItem[] = charts.purposeCounts.map((p: PurposeCount, idx: number) => ({
    name: p.purpose,
    value: p.total,
    color: colorPalette[idx % colorPalette.length],
  }));

  // Barangay distribution
  const barangayData = showSwine
    ? charts.barangayDistributionSwine.map((b: BarangayDistribution) => ({
        name: b.barangay_name,
        total: b.total_swine,
      }))
    : charts.barangayDistributionFarmers.map((b: BarangayDistribution) => ({
        name: b.barangay_name,
        total: b.total,
      }));

  return (
    <AppLayout>
      <Head title="Admin Dashboard - IMOS" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top stat cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto p-2">
          {[
            { label: "Total Farmers", value: stats.totalFarmers, icon: <Users className="w-8 h-8 text-green-600 dark:text-green-400" />, bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Available Swine", value: stats.totalSwine, icon: <PigIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />, bg: "bg-amber-50 dark:bg-amber-900/20" },
            { label: "Active Swine", value: stats.activeSwine, icon: <Activity className="w-8 h-8 text-sky-600 dark:text-sky-400" />, bg: "bg-sky-50 dark:bg-sky-900/20" },
            { label: "Dead Swine", value: stats.deadSwine, icon: <PigIcon className="w-8 h-8 text-red-600 dark:text-red-400" />, bg: "bg-red-50 dark:bg-red-900/20" },
            { label: "Sold Swine", value: stats.soldSwine, icon: <ShoppingCart className="w-8 h-8 text-sky-600 dark:text-sky-400" />, bg: "bg-sky-50 dark:bg-sky-900/20" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center p-3 rounded-lg shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="ml-4 flex flex-col">
                <span className="text-sm text-muted-foreground dark:text-gray-400">{stat.label}</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle section - split left/right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2">
          {/* Left side: Charts - Fixed height with scroll */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[77vh] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Link
                    href={route("swine.production")}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    See All Charts
                  </Link>
                </div>

                {/* Barangay Distribution */}
                <Card className="mb-6 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      {showSwine
                        ? "Active & Available Swine per Barangay"
                        : "Registered Farmers per Barangay"}
                    </CardTitle>
                    <div className="space-x-2">
                      <Button 
                        size="sm" 
                        variant={!showSwine ? "default" : "outline"} 
                        onClick={() => setShowSwine(false)}
                        className="text-xs"
                      >
                        Farmers
                      </Button>
                      <Button 
                        size="sm" 
                        variant={showSwine ? "default" : "outline"} 
                        onClick={() => setShowSwine(true)}
                        className="text-xs"
                      >
                        Swine
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[250px] pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barangayData}>
                       <XAxis 
  dataKey="name" 
  tick={{ 
    fontSize: 12, 
    fill: document.documentElement.classList.contains('dark') 
      ? '#d1d5db'  // gray-300 for dark mode
      : '#374151'  // gray-700 for light mode
  }} 
  interval={0} 
  angle={-30} 
  textAnchor="end" 
  height={60}
/>
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                          labelStyle={{ color: '#374151' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <Bar 
                          dataKey="total" 
                          fill="#10b981" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Monthly Mortality */}
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      Monthly Swine Mortality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px] pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => {
                            const [year, month] = value.split('-');
                            return `${year}-${month}`;
                          }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                          labelStyle={{ color: '#374151' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <Bar 
                          dataKey="total" 
                          fill="#ef4444" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>

          {/* Right side: Quick Actions, Purpose Chart, Tables - Scrollable container */}
          <div className="lg:col-span-1">
            <ScrollArea className="h-[77vh] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="p-4 space-y-4">
                {/* Tabs Section */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-1">
                  <Tabs value={tab} onValueChange={setTab} className="w-full">
                    {/* Quick Actions Tab */}
                    <TabsContent value="actions" className="mt-0">
                      <Card className="border border-gray-200 dark:border-gray-700">
                        <CardHeader className="flex flex-row justify-between items-center pb-2">
                          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                            Quick Actions
                          </CardTitle>
                          <Button 
                            size="sm" 
                            className="text-xs" 
                            variant="outline" 
                            onClick={() => setTab("purpose")}
                          >
                            ← Swine Purpose
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-2">
                          <Button 
                            size="sm" 
                            onClick={() => window.location.href = route('facilitate.users.create')} 
                            className="w-full justify-start"
                            variant="outline"
                          >
                            Register New Farmer
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = route('admin.swine.create')} 
                            className="w-full justify-start"
                          >
                            Add Swine Record
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = route('insurance.application.create')} 
                            className="w-full justify-start"
                          >
                            Encode Mortality Insurance
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            onClick={() => window.print()} 
                            className="w-full justify-start"
                          >
                            <Printer className="mr-2 w-4 h-4" /> Print Dashboard
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Swine Purpose Tab */}
                    <TabsContent value="purpose" className="h-[47vh] overflow-auto">
    <Card className="h-full flex flex-col p-1">
      <CardHeader className="flex flex-row px-3 justify-between items-center">
        <CardTitle className="text-sm">Swine Purpose Breakdown</CardTitle>
        <Button size="sm" className="text-xs" variant="outline" onClick={() => setTab("actions")}>
          Quick Actions →
        </Button>
      </CardHeader>

      <CardContent className="flex-1 p-0">
         <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={purposeData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={70}>
                  {purposeData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
      </CardContent>
    </Card>
  </TabsContent>
                  </Tabs>
                </div>

                {/* Veterinary Requests Card */}
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      Veterinary Requests
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => Inertia.get("/veterinary/farmers/list", { tab: "requests" })}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[150px] rounded border">
                      <div className="min-w-full">
                        <table className="table-auto w-full text-xs">
                          <thead>
                            <tr className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">Farmer</th>
                              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">Request</th>
                              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {veterinaryRequests.slice(0, 5).map((r) => (
                              <tr key={r.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-2 text-gray-700 dark:text-gray-300">
                                  {r.user?.name ?? "Unknown"}
                                </td>
                                <td className="p-2 text-gray-700 dark:text-gray-300">
                                  <div className="font-medium">{r.request_type}</div>
                                  {r.description && (
                                    <div className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[120px]">
                                      {r.description}
                                    </div>
                                  )}
                                </td>
                                <td className="p-2 text-gray-600 dark:text-gray-400 text-xs">
                                  {new Date(r.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                            {veterinaryRequests.length === 0 && (
                              <tr>
                                <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                                  No veterinary requests
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Recent Activity Card */}
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[150px] rounded border">
                      <div className="min-w-full">
                        <table className="table-auto w-full text-xs">
                          <thead>
                            <tr className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">User</th>
                              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentActivities.slice(0, 5).map((a: any) => (
                              <tr key={a.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-2 text-gray-700 dark:text-gray-300">
                                  {a.user_name ?? "System"}
                                </td>
                                <td className="p-2 text-gray-700 dark:text-gray-300">
                                  <div className="truncate max-w-[150px]" title={a.action}>
                                    {a.action}
                                  </div>
                                  {a.created_at && (
                                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                                      {new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {recentActivities.length === 0 && (
                              <tr>
                                <td colSpan={2} className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                                  No recent activity
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}