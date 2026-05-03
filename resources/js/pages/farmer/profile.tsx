import React, { useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import UserAppLayout from "@/layouts/app-layout";
import AdminAppLayout from "@/layouts/admin-layout";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Users,
  ShieldCheck,
  FileText,
  Activity,
  Heart,
  Eye,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  AlertCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { route } from "ziggy-js";
import axios from "axios";
import { PigIcon } from "@/components/icons";

type SwineType = {
  id: number;
  category: string;
  breed?: string;
  custom_breed?: string;
  age?: string | number;
  status?: string;
  purpose?: string;
  sex?: string;
  description?: string;
};

interface Application {
  id: number;
  cover_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  number_of_heads: number;
  animals: {
    id: number;
    ear_mark: string;
    veterinary_report_id?: number | null;
  }[];
}

interface AuthUser {
  id: number;
  role: string;
  name?: string;
  email?: string;
}

interface PageProps {
  auth: {
    user: AuthUser | null;
  };
  [key: string]: any;
}

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    profile_picture: string;
    firstname: string;
    middlename: string;
    lastname: string;
    extension: string;
    contact: string;
    birthdate: string;
    gender: string;
    civil_status: string;
    occupation: string;
    province: string;
    municipal: string;
    barangay: string;
    street: string;
    purok: string;
    status: string;
    swine_count: number;
    status_counts: Record<string, number>;
    category_counts: Record<string, number>;
    breeds: string[];
    swine: SwineType[];
    purpose_counts: Record<string, number>;
  };
  applications: Application[];
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    submitted: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    pending_review: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    rejected: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  };

  return map[status] ?? "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
}

export default function UserProfile({ user, applications }: Props) {
  const [activeTab, setActiveTab] = useState<"profile" | "summary" | "list" | "insurance">("summary");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof SwineType | "id">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to generate consistent colors based on user ID or name
  const getAvatarColor = (seed: string | number) => {
    const colors = [
      '#10b981', // emerald-500
      '#34d399', // emerald-400
      '#059669', // emerald-600
      '#6ee7b7', // emerald-300
      '#047857', // emerald-700
      '#a7f3d0', // emerald-200
      '#065f46', // emerald-800
    ];
    
    const index = typeof seed === 'string' 
      ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
      : seed;
      
    return colors[index % colors.length];
  };

  const swineData = user.swine || [];

  const pieData = useMemo(() => {
    return Object.entries(user.status_counts || {}).map(([k, v]) => ({
      name: k,
      value: typeof v === "number" ? v : Number(v) || 0,
    }));
  }, [user.status_counts]);

  const barData = useMemo(() => {
    return Object.entries(user.category_counts || {}).map(([k, v]) => ({
      category: k,
      count: typeof v === "number" ? v : Number(v) || 0,
    }));
  }, [user.category_counts]);

  const filtered = useMemo(() => {
    let items = swineData.filter((s) => {
      const breed = (s.custom_breed || s.breed || "").toString().toLowerCase();
      const matchesSearch = breed.includes(search.toLowerCase()) || (s.description || "").toString().toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || (s.status || "").toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    items.sort((a, b) => {
      const aVal = (a[sortKey] ?? "") as any;
      const bVal = (b[sortKey] ?? "") as any;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return items;
  }, [swineData, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSort(key: keyof SwineType | "id") {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  // Updated COLORS with green shades
  const COLORS = ["#10b981", "#34d399", "#059669", "#047857", "#6ee7b7", "#a7f3d0", "#d1fae5"];
  
  const { url } = usePage();
  useEffect(() => {
    const searchParams = new URLSearchParams(url.split("?")[1]);
    const tab = searchParams.get("tab");
    if (tab === "insurance") {
      setActiveTab("insurance");
    }
  }, [url]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<{ id: number; ear_mark: string } | null>(null);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestType, setRequestType] = useState("");
  const [requestDescription, setRequestDescription] = useState("");

  function openRequestModal(animal: { id: number; ear_mark: string }) {
    setSelectedAnimal(animal);
    setRequestTitle("");
    setRequestDescription("");
    setShowModal(true);
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAnimal) return;

    try {
      await axios.post(route('veterinary.request.store'), {
        animal_id: selectedAnimal.id,
        title: requestTitle,
        description: requestDescription,
        request_type: requestType,
      });

      alert("Request submitted successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    }
  }

  const { auth } = usePage<PageProps>().props;
  const currentUser = auth?.user;
  const adminRoles = ['admin', 'enforcer', 'super_admin', 'moderator'];
  const isCurrentUserAdmin = adminRoles.includes(currentUser?.role || '');
  
  const Layout = isCurrentUserAdmin ? AdminAppLayout : UserAppLayout;

  return (
    <Layout>
      <Head title={`User | ${user.name}`} />

      <div className="sm:p-6 p-2 space-y-6 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* User Profile Card */}
        <Card className="overflow-hidden pt-0 border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
          <CardHeader className="pb-3 pt-3 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 border-b border-slate-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-slate-800 dark:text-gray-200">User Information</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            {/* Top area: basic info */}
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  {user.profile_picture && user.profile_picture !== 'default.png' ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-emerald-200 dark:border-emerald-800 shadow-sm"
                      onError={(e) => {
                        // If image fails to load, hide it and show fallback
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Avatar with Initials */}
                  <div 
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-200 dark:border-emerald-800 shadow-sm flex items-center justify-center text-white font-bold text-2xl sm:text-3xl ${(!user.profile_picture || user.profile_picture === 'default.png') ? 'flex' : 'hidden'}`}
                    style={{ backgroundColor: getAvatarColor(user.id || user.name) }}
                  >
                    {getInitials(user.name)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>

                <div className="text-center">
                  <p className="font-semibold text-base sm:text-lg text-slate-800 dark:text-gray-200">
                    {user.firstname} {user.middlename} {user.lastname} {user.extension}
                  </p>
                  <Badge className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                    {user.role.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                  <PigIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Total Swine: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.swine_count}</span></span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Account Information */}
                <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 text-sm sm:text-base">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                      Account Information
                    </h3>
                    
                    <Link
                      href={route('user_informations.create')}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-xs bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 text-emerald-700 dark:text-emerald-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-colors"
                    >
                      <User className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      Edit Profile
                    </Link>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Email:</span> {user.email}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Registered:</span> {user.created_at}</p>
                    <p className="dark:text-gray-300">
                      <span className="text-slate-500 dark:text-gray-400">Status:</span>{' '}
                      <Badge variant="outline" className={`${statusBadge(user.status)} text-[10px] sm:text-xs`}>
                        {user.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-1 text-sm sm:text-base">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    Personal Information
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Full Name:</span> {user.firstname} {user.middlename} {user.lastname} {user.extension}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Contact:</span> {user.contact || 'Not provided'}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Birthdate:</span> {user.birthdate || 'Not provided'}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Gender:</span> {user.gender || 'Not provided'}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Civil Status:</span> {user.civil_status || 'Not provided'}</p>
                    <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Occupation:</span> {user.occupation || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs - Responsive */}
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-gray-700 pb-1">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === "summary"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-500"
                      : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Swine Summary
                </button>

                <button
                  onClick={() => setActiveTab("list")}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === "list"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-500"
                      : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Swine List
                </button>

                <button
                  onClick={() => setActiveTab("insurance")}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === "insurance"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-500"
                      : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Insurance
                </button>
              </div>

              <div className="mt-3 sm:mt-4">
                {/* Summary Tab Content */}
                {activeTab === "summary" && (
                  <div className="space-y-4 sm:space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Status Summary */}
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2 sm:mb-3 flex items-center gap-1 text-sm sm:text-base">
                          <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                          Swine Status Summary
                        </h4>
                        <div className="space-y-1.5 sm:space-y-2">
                          {Object.entries(user.status_counts || {}).map(([label, count], index) => (
                            <div key={label} className="flex justify-between items-center p-1.5 sm:p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
                              <Badge className="text-white bg-green-600 border-0 text-[10px] sm:text-xs">
                                {label}
                              </Badge>
                              <span className="font-semibold text-slate-700 dark:text-gray-300 text-xs sm:text-sm">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Purpose Summary */}
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2 sm:mb-3 flex items-center gap-1 text-sm sm:text-base">
                          Swine Purpose Summary
                        </h4> 
                        <div className="space-y-1.5 sm:space-y-2">
                          {Object.entries(user.purpose_counts || {}).map(([purpose, count], index) => (
                            <div key={purpose} className="flex justify-between items-center p-1.5 sm:p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
                              <Badge  className="text-white bg-green-600 border-0 text-[10px] sm:text-xs">
                                {purpose}
                              </Badge>
                              <span className="font-semibold text-slate-700 dark:text-gray-300 text-xs sm:text-sm">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Distribution Pie Chart */}
                      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
                        <h4 className="font-semibold text-slate-700 dark:text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">Status Distribution</h4>
                        <div className="h-64 sm:h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={Object.entries(user.status_counts || {})
                                  .filter(([_, val]) => Number(val) > 0)
                                  .map(([key, val]) => ({
                                    name: key,
                                    value: Number(val),
                                  }))}
                                dataKey="value"
                                nameKey="name"
                                label={(entry) => `${entry.name} (${entry.value})`}
                                outerRadius={70}
                                innerRadius={35}
                                labelLine={false}
                              >
                                {Object.entries(user.status_counts || {})
                                  .filter(([_, val]) => Number(val) > 0)
                                  .map((_, idx) => (
                                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                  ))}
                              </Pie>
                              <ReTooltip 
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255,255,255,0.95)',
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  fontSize: '12px'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Category Totals Bar Chart */}
                      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
                        <h4 className="font-semibold text-slate-700 dark:text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">Category Totals</h4>
                        <div className="h-64 sm:h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={Object.entries(user.category_counts || {}).map(([key, val]) => ({
                                category: key,
                                count: typeof val === "number" ? val : Number(val) || 0,
                              }))}
                              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-700" />
                              <XAxis dataKey="category" stroke="#64748b" className="dark:stroke-gray-500" fontSize={11} />
                              <YAxis allowDecimals={false} stroke="#64748b" className="dark:stroke-gray-500" fontSize={11} />
                              <ReTooltip 
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255,255,255,0.95)',
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  fontSize: '12px'
                                }}
                              />
                              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {Object.entries(user.category_counts || {}).map((_, idx) => (
                                  <Cell key={`bar-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Breeds Display */}
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2 sm:mb-3 flex items-center gap-1 text-sm sm:text-base">
                        <PigIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        Breeds Owned
                      </h4>
                      {user.swine && user.swine.length > 0 ? (
                        (() => {
                          const breedCounts = user.swine.reduce<Record<string, number>>((acc, s) => {
                            const breedName =
                              s.custom_breed ||
                              (typeof s.breed === "string" ? s.breed : s.breed) ||
                              "Unknown";
                            acc[breedName] = (acc[breedName] || 0) + 1;
                            return acc;
                          }, {});

                          const maxCount = Math.max(...Object.values(breedCounts));

                          return Object.entries(breedCounts).map(([breed, count], idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300 w-28 sm:w-32">{breed}</span>
                              <div className="flex-1 bg-slate-200 dark:bg-gray-700 rounded-full h-3 sm:h-4">
                                <div
                                  className="bg-emerald-500 h-3 sm:h-4 rounded-full"
                                  style={{ width: `${(count / maxCount) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs sm:text-sm text-right text-slate-600 dark:text-gray-400 w-8">{count}</span>
                            </div>
                          ));
                        })()
                      ) : (
                        <p className="text-slate-400 dark:text-gray-500 text-xs sm:text-sm">No breeds found</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Insurance Tab Content */}
               {activeTab === "insurance" && (
  <div className="space-y-3 sm:space-y-4">
    {applications.length === 0 ? (
      <div className="text-center py-6 sm:py-8 bg-slate-50 dark:bg-gray-700/30 rounded-lg border-2 border-dashed border-slate-200 dark:border-gray-600">
        <ShieldCheck className="h-8 w-8 sm:h-12 sm:w-12 text-slate-300 dark:text-gray-500 mx-auto mb-2 sm:mb-3" />
        <p className="text-slate-400 dark:text-gray-500 text-sm sm:text-base">No insurance applications found.</p>
      </div>
    ) : (
      applications.map((app) => (
        <Card key={app.id} className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px] sm:text-xs">
                    {app.cover_type}
                  </Badge>
                  <Badge variant="outline" className={`${statusBadge(app.status)} text-[10px] sm:text-xs`}>
                    {app.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-0.5 sm:gap-y-1 text-xs sm:text-sm">
                  <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Created:</span> {app.created_at}</p>
                  <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Updated:</span> {app.updated_at}</p>
                  <p className="dark:text-gray-300"><span className="text-slate-500 dark:text-gray-400">Animals:</span> {app.number_of_heads}</p>
                </div>
              </div>

              <Link
                href={route('insurance.application.show', app.id)}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-1 self-start md:self-center"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" /> View Application
              </Link>
            </div>

            <details className="mt-2 sm:mt-3">
              <summary className="cursor-pointer text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium flex items-center gap-1">
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                View Animals ({app.animals.length})
              </summary>
              
             
              
              <ul className="mt-1.5 sm:mt-2 space-y-1 pl-3 sm:pl-4">
                {app.animals.length === 0 ? (
                  <li className="text-slate-400 dark:text-gray-500 text-xs sm:text-sm">No animals in this application.</li>
                ) : (
                  app.animals.map((animal) => (
                    <li key={animal.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-gray-700 py-1.5 sm:py-2 gap-2">
                      <span className="text-xs sm:text-sm dark:text-gray-300">
                        <span className="font-medium">Ear Mark:</span> {animal.ear_mark}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={animal.veterinary_report_id ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs' : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 text-[10px] sm:text-xs'}>
                          {animal.veterinary_report_id ? 'Has Report' : 'No Report'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[10px] sm:text-xs border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 h-7 sm:h-8"
                          onClick={() => openRequestModal({ id: animal.id, ear_mark: animal.ear_mark })}
                        >
                          Request Vet
                        </Button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
               {/* Button to view DA Personnel - Added here */}
              <div className="mt-3 mb-2 flex justify-end">
                <Link
                  href="/DA/personnels" // Update this route to match your actual route
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-green-600/10 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  View DA Personnel/Technicians
                </Link>
              </div>
            </details>
          </CardContent>
        </Card>
      ))
    )}
  </div>
)}

                {/* Swine List Tab Content - Responsive */}
                {activeTab === "list" && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Table controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search breed or description..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="pl-8 pr-3 py-1.5 sm:py-2 border border-slate-200 dark:border-gray-700 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                          />
                          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                        </div>

                        <select
                          value={statusFilter}
                          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-gray-300"
                        >
                          <option value="all">All status</option>
                          {Array.from(new Set(swineData.map(s => (s.status || "unknown")))).map((s, i) => (
                            <option value={s} key={i}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                        Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Table - Responsive */}
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                        <thead className="bg-slate-50 dark:bg-gray-700">
                          <tr>
                            {["ID", "Category", "Breed", "Age", "Status", "Purpose", "Sex", "Description"].map((header, idx) => (
                              <th
                                key={header}
                                onClick={() => idx <= 4 ? toggleSort(header.toLowerCase() as any) : null}
                                className={`px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider ${idx <= 4 ? 'cursor-pointer hover:text-slate-700 dark:hover:text-gray-300' : ''}`}
                              >
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                  {header}
                                  {sortKey === header.toLowerCase() && (
                                    sortDir === "asc" ? <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                  )}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                          {paginated.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">{s.id}</td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs capitalize text-slate-600 dark:text-gray-400">{s.category}</td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">{s.custom_breed || s.breed || "N/A"}</td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">{s.age ?? "N/A"} <span className="text-slate-400 dark:text-gray-500 text-[8px] sm:text-[10px]">days</span></td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2">
                                <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[8px] sm:text-[10px]">
                                  {s.status}
                                </Badge>
                              </td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">{s.purpose ?? "N/A"}</td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">{s.sex ?? "N/A"}</td>
                              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-slate-600 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">{s.description ?? ""}</td>
                            </tr>
                          ))}

                          {paginated.length === 0 && (
                            <tr>
                              <td colSpan={8} className="px-2 sm:px-4 py-4 sm:py-8 text-center text-slate-400 dark:text-gray-500 text-xs sm:text-sm">
                                No swine records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination controls - Responsive */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 text-center sm:text-left">
                        Page {page} of {totalPages}
                      </span>

                      <div className="flex gap-1 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(1)}
                          disabled={page === 1}
                          className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 dark:border-gray-700 dark:text-gray-300"
                        >
                          « First
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 dark:border-gray-700 dark:text-gray-300"
                        >
                          ‹ Prev
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 dark:border-gray-700 dark:text-gray-300"
                        >
                          Next ›
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(totalPages)}
                          disabled={page === totalPages}
                          className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 dark:border-gray-700 dark:text-gray-300"
                        >
                          Last »
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Veterinary Request Modal - Dark mode */}
        {showModal && selectedAnimal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-gray-700 pb-2">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-gray-200">Request Veterinary Service</h2>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">
                Animal: <span className="font-medium">{selectedAnimal.ear_mark}</span>
              </p>

              <form onSubmit={submitRequest} className="space-y-2 sm:space-y-3">
                <div>
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-1 block">Request Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Health Checkup"
                    value={requestTitle}
                    onChange={(e) => setRequestTitle(e.target.value)}
                    className="w-full border border-slate-200 dark:border-gray-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-300"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-1 block">Request Type</label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full border border-slate-200 dark:border-gray-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-300"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Health Issue">Health Issue</option>
                    <option value="Injury">Injury</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Concern">Concern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-1 block">Description</label>
                  <textarea
                    placeholder="Describe the concern..."
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 dark:border-gray-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="text-xs sm:text-sm dark:border-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}