import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AppLayout from "@/layouts/admin-layout";
import { usePage } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import { 
  MessageCircleMore, 
  Search,
  Filter,
  Calendar,
  MapPin,
  Phone,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Users,
  FilePlus,
  Eye,
  Layers
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserInformation {
  firstname: string;
  middlename?: string | null;
  lastname: string;
  user_id: number;
}

interface VeterinaryRequest {
  id: number;
  animal_id: string;
  request_type: string;
  description?: string | null;
  status?: string | null;
  user_id: string;  
  created_at: string;
  user?: {
    firstname: string;
    middlename?: string | null;
    lastname: string;
    contact?: string | null;
    purok?: string | null;
    barangay: string;
  } | null;
}

interface Farmer {
  id: number;
  user_information: UserInformation;
}

interface Application {
  id: number;
  farmer_id: number;
  number_of_heads: number;
  cover_type: string;
  farmer: Farmer;
}

export default function FarmersInsuranceList() {
  const { props } = usePage<any>();
  const [viewMode, setViewMode] = useState<'requests' | 'applications'>('requests');
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentFarmerId, setCurrentFarmerId] = useState<number | null>(null);
  const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnimalIds, setSelectedAnimalIds] = useState<number[]>([]);
  
  const [allVeterinaryRequests, setAllVeterinaryRequests] = useState<VeterinaryRequest[]>(props.veterinaryRequests ?? []);
  const [statusFilter, setStatusFilter] = useState<string | null>(props.selectedStatus ?? null);

  const formalStatus = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const statusColors: Record<string, { bg: string, text: string, darkBg: string, darkText: string, icon: any }> = {
    pending: { 
      bg: "bg-yellow-50", 
      text: "text-yellow-700", 
      darkBg: "dark:bg-yellow-900/20", 
      darkText: "dark:text-yellow-300",
      icon: Clock 
    },
    in_progress: { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      darkBg: "dark:bg-blue-900/20", 
      darkText: "dark:text-blue-300",
      icon: AlertCircle 
    },
    completed: { 
      bg: "bg-green-50", 
      text: "text-green-700", 
      darkBg: "dark:bg-green-900/20", 
      darkText: "dark:text-green-300",
      icon: CheckCircle 
    },
  };

  const statusCounts = useMemo(() => ({
    pending: allVeterinaryRequests.filter(r => r.status === 'pending').length,
    in_progress: allVeterinaryRequests.filter(r => r.status === 'in_progress').length,
    completed: allVeterinaryRequests.filter(r => r.status === 'completed').length,
    all: allVeterinaryRequests.length
  }), [allVeterinaryRequests]);

  const filteredRequests = useMemo(() => {
    let result = allVeterinaryRequests;
    
    if (statusFilter) {
      result = result.filter(r => r.status === statusFilter);
    }
    
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(r => 
        r.user?.firstname?.toLowerCase().includes(searchLower) ||
        r.user?.lastname?.toLowerCase().includes(searchLower) ||
        r.user?.barangay?.toLowerCase().includes(searchLower) ||
        r.request_type?.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  }, [allVeterinaryRequests, statusFilter, search]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/insurance/farmers/list", {
        params: { search, page },
      });
      setApps(res.data.data ?? []);
      setPage(res.data.current_page ?? 1);
      setLastPage(res.data.last_page ?? 1);
    } catch (err) {
      console.error("Failed to load insurance applications:", err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === 'applications') {
      loadData();
    }
  }, [search, page, viewMode]);

  const viewAnimals = async (farmerId: number) => {
    setLoading(true);
    setCurrentFarmerId(farmerId);
    try {
      const res = await axios.get(`/api/farmer/${farmerId}/animals`);
      setSelectedAnimals(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load animals:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnimalSelection = (id: number) => {
    setSelectedAnimalIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const submitSelectedAnimals = () => {
    const query = selectedAnimalIds.map((id) => `animal_ids[]=${id}`).join('&');
    window.location.href = `/insurance/veterinary-form?${query}`;
  };

  const updateStatus = async (id: number, status: keyof typeof formalStatus) => {
    try {
      const res = await axios.put(`/veterinary-request/${id}/update-status`, { status });
      setAllVeterinaryRequests((prev) =>
        prev.map((vr) => (vr.id === id ? { ...vr, status: res.data.status } : vr))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const startConversation = async (r: VeterinaryRequest) => {
    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: r.user_id,
        veterinary_request_id: r.id,
      });
      const conversation = res.data.data;
      Inertia.visit(`/messenger?conversation=${conversation.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to start conversation.");
    }
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    params.append("tab", "requests");
    
    Inertia.get(`/veterinary/farmers/list?${params.toString()}`, {}, {
      preserveState: true,
      replace: true,
      only: [],
    });
  };

  const createReportFromRequest = (r: VeterinaryRequest) => {
    if (!r.animal_id) {
      alert("No animal linked to this request.");
      return;
    }
    const params = new URLSearchParams();
    params.append("request_id", String(r.id));
    params.append("animal_ids[]", String(r.animal_id));
    Inertia.visit(`/insurance/veterinary-form?${params.toString()}`);
  };

  const ViewToggle = () => (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <Button
          variant={viewMode === 'requests' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('requests')}
          className={`rounded-md ${viewMode === 'requests' ? 'bg-sidebar-primary dark:bg-sidebar-primary shadow-sm' : 'dark:text-gray-300'}`}
        >
          <MessageCircleMore className="w-4 h-4 mr-2" />
          Farmer Requests
        </Button>
        <Button
          variant={viewMode === 'applications' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('applications')}
          className={`rounded-md ${viewMode === 'applications' ? 'bg-sidebar-primary dark:bg-sidebar-primary shadow-sm' : 'dark:text-gray-300'}`}
        >
          <Users className="w-4 h-4 mr-2" />
          Applications
        </Button>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {viewMode === 'requests' 
          ? 'Manage veterinary requests from farmers'
          : 'View insurance applications from farmers'}
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sidebar-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-sidebar-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Livestock Management</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Manage farmer requests and insurance applications</p>
        </div>

        {/* View Toggle */}
        <ViewToggle />

        {/* Main Content */}
        <Card className="shadow-lg border dark:border-gray-700 dark:bg-gray-900">
          <CardHeader className="border-b dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="dark:text-gray-100">
                  {viewMode === 'requests' ? 'Veterinary Requests' : 'Insurance Applications'}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {viewMode === 'requests' 
                    ? 'Review and manage veterinary service requests'
                    : 'View and process insurance applications'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Content Area */}
            {viewMode === 'requests' ? (
              <>
                {/* Status Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card 
                    className={`border cursor-pointer transition-all dark:border-gray-700 dark:bg-gray-800 ${
                      statusFilter === null 
                        ? 'ring-2 ring-sidebar-primary ring-offset-2 bg-sidebar-primary/5 dark:ring-sidebar-primary dark:bg-sidebar-primary/10' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'
                    }`}
                    onClick={() => handleStatusChange(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">All Requests</p>
                          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{statusCounts.all}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Total requests</p>
                        </div>
                        <Layers className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`border cursor-pointer transition-all dark:border-gray-700 dark:bg-gray-800 ${
                      statusFilter === 'pending' 
                        ? 'ring-2 ring-yellow-500 ring-offset-2 bg-yellow-50 dark:ring-yellow-600 dark:bg-yellow-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'
                    }`}
                    onClick={() => handleStatusChange('pending')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending</p>
                          <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{statusCounts.pending}</p>
                          <p className="text-xs text-yellow-400 dark:text-yellow-500 mt-1">Awaiting action</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-400 dark:text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`border cursor-pointer transition-all dark:border-gray-700 dark:bg-gray-800 ${
                      statusFilter === 'in_progress' 
                        ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50 dark:ring-blue-600 dark:bg-blue-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'
                    }`}
                    onClick={() => handleStatusChange('in_progress')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">In Progress</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{statusCounts.in_progress}</p>
                          <p className="text-xs text-blue-400 dark:text-blue-500 mt-1">Being processed</p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-blue-400 dark:text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`border cursor-pointer transition-all dark:border-gray-700 dark:bg-gray-800 ${
                      statusFilter === 'completed' 
                        ? 'ring-2 ring-green-500 ring-offset-2 bg-green-50 dark:ring-green-600 dark:bg-green-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'
                    }`}
                    onClick={() => handleStatusChange('completed')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-300">{statusCounts.completed}</p>
                          <p className="text-xs text-green-400 dark:text-green-500 mt-1">Finished requests</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-400 dark:text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        placeholder="Search by farmer name or location..."
                        className="pl-10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-64">
                    <Select 
                      value={statusFilter || "all"}
                      onValueChange={(value) => handleStatusChange(value === "all" ? null : value)}
                    >
                      <SelectTrigger className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          <SelectValue placeholder="Filter by status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="all" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                          All Requests ({statusCounts.all})
                        </SelectItem>
                        <SelectItem value="pending" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                          Pending ({statusCounts.pending})
                        </SelectItem>
                        <SelectItem value="in_progress" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                          In Progress ({statusCounts.in_progress})
                        </SelectItem>
                        <SelectItem value="completed" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                          Completed ({statusCounts.completed})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {statusFilter ? (
                      <>
                        Showing <span className="font-semibold dark:text-gray-300">{filteredRequests.length}</span> {formalStatus[statusFilter as keyof typeof formalStatus]} request
                        {filteredRequests.length !== 1 && 's'} of <span className="font-semibold dark:text-gray-300">{statusCounts.all}</span> total requests
                      </>
                    ) : (
                      <>
                        Showing <span className="font-semibold dark:text-gray-300">{filteredRequests.length}</span> of <span className="font-semibold dark:text-gray-300">{statusCounts.all}</span> total requests
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {(statusFilter || search) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setStatusFilter(null);
                          setSearch("");
                        }}
                        className="h-6 text-xs dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </div>

                {/* Requests Table */}
                <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Farmer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Request Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Location</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredRequests.length > 0 ? (
                        filteredRequests.map((r) => {
                          const StatusIcon = statusColors[r.status || 'pending']?.icon || Clock;
                          const statusColor = statusColors[r.status || 'pending'];
                          return (
                            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="px-4 py-3">
                                <div className="font-medium dark:text-gray-200">
                                  {r.user ? `${r.user.firstname} ${r.user.lastname}` : "N/A"}
                                </div>
                                {r.user?.contact && (
                                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <Phone className="w-3 h-3" />
                                    {r.user.contact}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-medium dark:text-gray-200">{r.request_type}</span>
                                {r.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{r.description}</p>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                  <div className="dark:text-gray-300">
                                    {r.user ? (
                                      <>
                                        {r.user.barangay}
                                        {r.user.purok && (
                                          <span className="text-gray-500 dark:text-gray-400"> • Purok {r.user.purok}</span>
                                        )}
                                      </>
                                    ) : "N/A"}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                  statusColor.bg
                                } ${statusColor.text} ${statusColor.darkBg} ${statusColor.darkText}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {formalStatus[r.status as keyof typeof formalStatus] || "Pending"}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(r.created_at).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 dark:border-gray-700 dark:text-gray-300">
                                      Actions
                                      <ChevronDown className="w-3 h-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
                                    {r.status !== "completed" && (
                                      <DropdownMenuItem
                                        onClick={() => createReportFromRequest(r)}
                                        className="text-green-600 dark:text-green-400 font-medium dark:hover:bg-gray-700"
                                      >
                                        <FilePlus className="w-4 h-4 mr-2" />
                                        Create Report
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem 
                                      onClick={() => startConversation(r)}
                                      className="dark:hover:bg-gray-700"
                                    >
                                      <MessageCircleMore className="w-4 h-4 mr-2" />
                                      Message Farmer
                                    </DropdownMenuItem>
                                    {Object.entries(formalStatus).map(([key, label]) => (
                                      <DropdownMenuItem
                                        key={key}
                                        onClick={() => updateStatus(r.id, key as keyof typeof formalStatus)}
                                        className="dark:hover:bg-gray-700"
                                      >
                                        Update to: {label}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">No requests found</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {search || statusFilter 
                                  ? "Try adjusting your search or filter criteria" 
                                  : "No veterinary requests submitted yet"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                {/* Applications Header with Count */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Applications: <span className="font-semibold dark:text-gray-300">{apps.length}</span>
                  </div>
                </div>

                {/* Search for Applications */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search farmer full name..."
                      className="pl-10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      value={search}
                      onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Applications Table */}
                <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Farmer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Cover Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Number of Heads</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-12 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-300"></div>
                              <span className="text-gray-600 dark:text-gray-400">Loading applications...</span>
                            </div>
                          </td>
                        </tr>
                      ) : apps.length > 0 ? (
                        apps.map((app) => {
                          const info = app.farmer.user_information;
                          const fullName = `${info.firstname} ${info.middlename ?? ""} ${info.lastname}`
                            .replace(/\s+/g, ' ')
                            .trim();

                          return (
                            <tr key={app.farmer_id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="px-4 py-3">
                                <div className="font-medium dark:text-gray-200">{fullName}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Farmer ID: {app.farmer_id}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="capitalize dark:border-gray-600 dark:text-gray-300">
                                  {app.cover_type}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-lg font-semibold text-sidebar-primary dark:text-sidebar-primary/90">
                                  {app.number_of_heads}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => viewAnimals(app.farmer_id)}
                                    className="gap-2 dark:border-gray-700 dark:text-gray-300"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Animals
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                      (window.location.href = `/insurance/farmer/livestocks/${app.farmer_id}`)
                                    }
                                    className="gap-2 dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/90"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Reports
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">No applications found</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {search 
                                  ? "Try adjusting your search criteria" 
                                  : "No insurance applications submitted yet"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Applications Pagination */}
                  {apps.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, apps.length)} of {apps.length} results
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page <= 1}
                          onClick={() => setPage(page - 1)}
                          className="dark:border-gray-700 dark:text-gray-300"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page >= lastPage}
                          onClick={() => setPage(page + 1)}
                          className="dark:border-gray-700 dark:text-gray-300"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Animals Modal - Dark mode updated */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden z-10">
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold dark:text-gray-100">Animals List</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Select animals to create veterinary report</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="dark:text-gray-400"
              >
                Close
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Select</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Livestock ID</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Sex</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Age</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Breed</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Ear Mark</th>
                    <th className="px-4 py-3 text-left dark:text-gray-300">Color</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedAnimals.map((animal) => (
                    <tr key={animal.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedAnimalIds.includes(animal.id)}
                          onChange={() => toggleAnimalSelection(animal.id)}
                          className="h-4 w-4 rounded border-gray-300 text-sidebar-primary focus:ring-sidebar-primary dark:border-gray-600 dark:bg-gray-700"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium dark:text-gray-200">{animal.livestock_id}</td>
                      <td className="px-4 py-3 dark:text-gray-300">{animal.sex}</td>
                      <td className="px-4 py-3 dark:text-gray-300">{animal.age}</td>
                      <td className="px-4 py-3 dark:text-gray-300">{animal.breed}</td>
                      <td className="px-4 py-3 dark:text-gray-300">{animal.ear_mark}</td>
                      <td className="px-4 py-3 dark:text-gray-300">{animal.color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-6 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Selected: <span className="font-semibold">{selectedAnimalIds.length}</span> animals
              </div>
              <div className="flex gap-3">
                {currentFarmerId && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `/insurance/farmer/livestocks/${currentFarmerId}`)
                    }
                    className="gap-2 dark:border-gray-700 dark:text-gray-300"
                  >
                    <FileText className="w-4 h-4" />
                    View Reports
                  </Button>
                )}
                <Button
                  onClick={submitSelectedAnimals}
                  disabled={selectedAnimalIds.length === 0}
                  className="gap-2 dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/90"
                >
                  <FilePlus className="w-4 h-4" />
                  Create Report ({selectedAnimalIds.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}