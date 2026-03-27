import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { route } from "ziggy-js";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  MapPin,
  Phone,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Package,
  Eye,
  ExternalLink
} from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { toast } from "sonner";

interface Props {
  bookings: {
    data: Array<{
      id: number;
      status: 'pending' | 'accepted' | 'completed' | 'cancelled';
      scheduled_date: string;
      notes: string;
      created_at: string;
      customer: {
        id: number;
        name: string;
        user_information?: {
          firstname: string;
          middlename?: string;
          lastname: string;
          contact: string;
          purok?: string;
          barangay?: {
            id: number;
            name: string;
          };
        };
      };
      service: {
        id: number;
        title: string;
        price: number;
      };
      rating?: {
        id: number;
        rating: number;
        comment: string;
      } | null;
    }>;
    links?: any[];
    meta?: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
  services?: {
    data: Array<{
      id: number;
      title: string;
      description: string;
      category: string;
      price: number;
      location: string;
      is_active: boolean;
      created_at: string;
      bookings_count?: number;
      ratings_avg_rating?: number;
      ratings_count?: number;
      blog_post?: {
        id: number;
        title: string;
        slug: string;
        thumbnail?: string | null;
      } | null;
    }>;
    links?: any[];
    meta?: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
}

export default function ProviderBookings({ bookings, services }: Props) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceSearch, setServiceSearch] = useState("");
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: 'accept' | 'cancel' | null;
    booking: any;
  }>({ open: false, type: null, booking: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    service: any;
  }>({ open: false, service: null });

  const bookingsData = bookings?.data || [];
  const bookingsMeta = bookings?.meta || { total: 0, per_page: 10, current_page: 1, last_page: 1, from: 0, to: 0 };
  const bookingsLinks = bookings?.links || [];

  const servicesData = services?.data || [];
  const servicesMeta = services?.meta || { total: 0, per_page: 10, current_page: 1, last_page: 1, from: 0, to: 0 };
  const servicesLinks = services?.links || [];

  const filteredBookings = bookingsData.filter(booking => {
    const customerName = booking.customer?.name || '';

    let customerFullName = '';
    const info = booking.customer?.user_information;
    if (info) {
      const nameParts = [
        info.firstname,
        info.middlename,
        info.lastname
      ].filter(Boolean);
      customerFullName = nameParts.join(' ');
    }

    const serviceTitle = booking.service?.title || '';

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      customerName.toLowerCase().includes(searchLower) ||
      customerFullName.toLowerCase().includes(searchLower) ||
      serviceTitle.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredServices = servicesData.filter(service => {
    const searchLower = serviceSearch.toLowerCase();
    return service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.category.toLowerCase().includes(searchLower);
  });

  const pendingCount = bookingsData.filter(b => b.status === 'pending').length;
  const acceptedCount = bookingsData.filter(b => b.status === 'accepted').length;
  const completedCount = bookingsData.filter(b => b.status === 'completed').length;
  const totalCount = bookingsMeta.total || bookingsData.length;

  const [completeDialog, setCompleteDialog] = useState<{
    open: boolean;
    booking: any;
  }>({ open: false, booking: null });

  const handleMarkComplete = () => {
    if (!completeDialog.booking) return;

    router.post(route('marketplace.services.bookings.update-status', completeDialog.booking.id), {
      status: 'completed'
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setCompleteDialog({ open: false, booking: null });
        router.reload({ only: ['bookings'] });
        toast.success('Booking marked as completed successfully!');
      },
      onError: (errors) => {
        console.error('Error marking as complete:', errors);
        toast.error('Failed to mark booking as complete. Please try again.');
      }
    });
  };

  const handleStatusUpdate = () => {
    if (!actionDialog.booking || !actionDialog.type) return;

    router.post(route('marketplace.services.bookings.update-status', actionDialog.booking.id), {
      status: actionDialog.type === 'accept' ? 'accepted' : 'cancelled'
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setActionDialog({ open: false, type: null, booking: null });
        router.reload({ only: ['bookings'] });
      }
    });
  };

  const handleDeleteService = () => {
    if (!deleteDialog.service) return;

    router.delete(route('marketplace.services.destroy', deleteDialog.service.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteDialog({ open: false, service: null });
        router.reload({ only: ['services'] });
      },
      onError: (errors) => {
        console.error('Delete error:', errors);
        alert('Failed to delete service. Please try again.');
      }
    });
  };

  const getFullName = (customer: any) => {
    if (!customer) return 'Unknown';

    const info = customer.user_information;
    if (info) {
      const parts = [
        info.firstname,
        info.middlename,
        info.lastname
      ].filter(Boolean);

      if (parts.length > 0) {
        return parts.join(' ');
      }
    }

    return customer.name || 'Unknown';
  };

  const getAddress = (customer: any) => {
    if (!customer) return 'No address provided';

    const info = customer.user_information;
    if (!info) {
      return 'No address provided';
    }

    const parts = [];
    if (info.purok) parts.push(`Purok ${info.purok}`);

    if (info.barangay) {
      if (typeof info.barangay === 'object' && info.barangay.name) {
        parts.push(info.barangay.name);
      } else if (typeof info.barangay === 'string') {
        parts.push(info.barangay);
      }
    }

    const address = parts.join(', ');
    return address || 'No address provided';
  };

  const getContact = (customer: any) => {
    if (!customer) return 'No contact';

    if (customer.user_information?.contact) {
      return customer.user_information.contact;
    }

    if (customer.contact) return customer.contact;
    if (customer.phone) return customer.phone;

    return 'No contact';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400', icon: Clock, label: 'Pending' },
      accepted: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400', icon: CheckCircle, label: 'Accepted' },
      completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400', icon: CheckCircle, label: 'Completed' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-400', icon: XCircle, label: 'Cancelled' }
    };

    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;

    return (
      <Badge className={`${variant.bg} ${variant.text} border-0 flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AppLayout>
      <Head title="Provider Dashboard" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href={route('marketplace.services.index')}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Go to Services
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Provider Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your services and booking requests</p>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              onClick={() => window.location.href = route('marketplace.services.create')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Service
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md dark:bg-gray-800">
              <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-700">
                <Calendar className="w-4 h-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-700">
                <Package className="w-4 h-4" />
                My Services
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalCount}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{acceptedCount}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        placeholder="Search by customer or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                    </div>
                    <div className="w-full md:w-48">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="all" className="dark:text-gray-300 dark:focus:bg-gray-700">All Status</SelectItem>
                          <SelectItem value="pending" className="dark:text-gray-300 dark:focus:bg-gray-700">Pending</SelectItem>
                          <SelectItem value="accepted" className="dark:text-gray-300 dark:focus:bg-gray-700">Accepted</SelectItem>
                          <SelectItem value="completed" className="dark:text-gray-300 dark:focus:bg-gray-700">Completed</SelectItem>
                          <SelectItem value="cancelled" className="dark:text-gray-300 dark:focus:bg-gray-700">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bookings Table */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-gray-100">Booking Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium">No bookings found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {searchTerm || statusFilter !== 'all'
                          ? 'Try adjusting your filters'
                          : 'You have no booking requests yet'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="dark:border-gray-700">
                            <TableHead className="dark:text-gray-300">Customer</TableHead>
                            <TableHead className="dark:text-gray-300">Contact & Address</TableHead>
                            <TableHead className="dark:text-gray-300">Service</TableHead>
                            <TableHead className="dark:text-gray-300">Schedule</TableHead>
                            <TableHead className="dark:text-gray-300">Status</TableHead>
                            <TableHead className="dark:text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map((booking) => (
                            <TableRow key={booking.id} className="dark:border-gray-700">
                              <TableCell>
                                <div className="font-medium dark:text-gray-200">{getFullName(booking.customer)}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">@{booking.customer?.name || 'Unknown'}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm dark:text-gray-400">
                                  <Phone className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                  <span className="truncate">{getContact(booking.customer)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm mt-1 dark:text-gray-400">
                                  <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                  <span className="truncate">{getAddress(booking.customer)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium dark:text-gray-200">{booking.service?.title || 'Unknown Service'}</div>
                                <div className="text-sm text-green-600 dark:text-green-400">
                                  ₱{booking.service?.price ? Number(booking.service.price).toLocaleString() : '0'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm dark:text-gray-400">
                                  <Calendar className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                  {booking.scheduled_date
                                    ? new Date(booking.scheduled_date).toLocaleDateString()
                                    : 'No date'}
                                </div>
                                {booking.notes && booking.notes !== 'Booked via quick booking' && (
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 max-w-[150px] truncate" title={booking.notes}>
                                    Note: {booking.notes}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(booking.status)}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-2">
                                  {booking.status === 'pending' && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 h-8 text-xs"
                                        onClick={() => setActionDialog({
                                          open: true,
                                          type: 'accept',
                                          booking
                                        })}
                                      >
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 h-8 text-xs"
                                        onClick={() => setActionDialog({
                                          open: true,
                                          type: 'cancel',
                                          booking
                                        })}
                                      >
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Cancel
                                      </Button>
                                    </div>
                                  )}

                                  {booking.status === 'accepted' && (
                                    <div className="flex gap-2">
                                      <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 h-8 px-3 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Awaiting completion
                                      </Badge>
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 h-8 text-xs"
                                        onClick={() => setCompleteDialog({ open: true, booking })}
                                      >
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Mark Complete
                                      </Button>
                                    </div>
                                  )}

                                  {booking.status === 'completed' && (
                                    <div className="space-y-2">
                                      {booking.rating ? (
                                        <div className="text-sm">
                                          <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium dark:text-gray-200">{booking.rating.rating}/5</span>
                                          </div>
                                          {booking.rating.comment && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px] truncate" title={booking.rating.comment}>
                                              "{booking.rating.comment}"
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          Completed
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {/* Complete Confirmation Dialog */}
                  <Dialog open={completeDialog.open} onOpenChange={(open) => !open && setCompleteDialog({ open: false, booking: null })}>
                    <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-emerald-600 dark:text-emerald-400">Mark Booking as Complete</DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                          Are you sure you want to mark this booking as completed?
                          This will allow the customer to leave a rating and review.
                        </DialogDescription>
                      </DialogHeader>

                      {completeDialog.booking && (
                        <div className="py-4">
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                            <p className="text-sm dark:text-gray-300">
                              <span className="font-medium dark:text-gray-200">Customer:</span>{' '}
                              {getFullName(completeDialog.booking.customer)}
                            </p>
                            <p className="text-sm dark:text-gray-300">
                              <span className="font-medium dark:text-gray-200">Service:</span>{' '}
                              {completeDialog.booking.service?.title || 'Unknown'}
                            </p>
                            <p className="text-sm dark:text-gray-300">
                              <span className="font-medium dark:text-gray-200">Schedule:</span>{' '}
                              {completeDialog.booking.scheduled_date
                                ? new Date(completeDialog.booking.scheduled_date).toLocaleDateString()
                                : 'No date'}
                            </p>
                          </div>
                        </div>
                      )}

                      <DialogFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setCompleteDialog({ open: false, booking: null })}
                          className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleMarkComplete}
                          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Yes, Mark Complete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Pagination */}
                  {bookingsLinks.length > 3 && (
                    <div className="mt-6 flex justify-center gap-1">
                      {bookingsLinks.map((link: any, idx: number) => {
                        if (!link) return null;

                        return (
                          <Button
                            key={idx}
                            variant={link.active ? "default" : "outline"}
                            size="sm"
                            disabled={!link.url}
                            className={`min-w-[32px] h-8 text-xs ${link.active ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                            onClick={() => link.url && router.get(link.url)}
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              {/* Services Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-semibold dark:text-gray-100">My Services</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Search services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="pl-10 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              {filteredServices.length === 0 ? (
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">No services found</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {serviceSearch
                        ? 'Try adjusting your search'
                        : 'You have not created any services yet'}
                    </p>
                    <Button
                      className="mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                      onClick={() => window.location.href = route('marketplace.services.create')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Service
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow py-0 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                      {/* Blog Post Thumbnail Section */}
                      {service.blog_post ? (
                        <Link
                          href={`/cms/blog/${service.blog_post.slug}`}
                          target="_blank"
                          className="block"
                        >
                          {service.blog_post.thumbnail ? (
                            <div className="h-32 overflow-hidden relative group cursor-pointer">
                              <img 
                                src={service.blog_post.thumbnail} 
                                alt={service.blog_post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const img = e.currentTarget;
                                  img.style.display = 'none';
                                  const parent = img.parentElement;
                                  if (parent && service.blog_post) {
                                    const fallbackDiv = document.createElement('div');
                                    fallbackDiv.className = 'h-full w-full bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center';
                                    fallbackDiv.innerHTML = `
                                      <span class="text-purple-700 dark:text-purple-400 text-xs flex items-center gap-1">
                                        <span>📄 ${service.blog_post.title}</span>
                                      </span>
                                    `;
                                    parent.appendChild(fallbackDiv);
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute bottom-2 left-2 right-2 text-xs text-white truncate">
                                <span className="bg-black/50 px-2 py-1 rounded inline-block truncate max-w-full">
                                  📝 {service.blog_post.title}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-24 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 transition-colors group">
                              <span className="text-sm text-purple-700 dark:text-purple-400 flex items-center gap-2">
                                <span className="text-2xl">📄</span>
                                <span className="font-medium truncate max-w-[200px]">{service.blog_post.title}</span>
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </div>
                          )}
                        </Link>
                      ) : (
                        <div className="h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-b dark:border-gray-700">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <span className="text-lg">📋</span>
                            <span className="text-xs">No blog post linked</span>
                          </div>
                        </div>
                      )}
                      
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                            {service.category}
                          </Badge>
                          <Badge 
                            variant={service.is_active ? "default" : "secondary"} 
                            className={service.is_active ? "bg-green-600 dark:bg-green-700" : "bg-gray-400 dark:bg-gray-600"}
                          >
                            {service.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2 line-clamp-1 dark:text-gray-100">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold">
                          <span>{formatPrice(service.price)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{service.location}</span>
                        </div>

                        {/* Stats Section */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
                          <div className="flex items-center gap-1">
                            <span>📊</span>
                            <span>{service.bookings_count || 0} bookings</span>
                          </div>
                          {service.ratings_avg_rating ? (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span>{Number(service.ratings_avg_rating).toFixed(1)}</span>
                              <span className="text-gray-400 dark:text-gray-500">({service.ratings_count || 0})</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">No ratings yet</span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2 pb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-blue-600 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950/30"
                            onClick={() => window.location.href = route('marketplace.services.edit', service.id)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                            onClick={() => setDeleteDialog({ open: true, service })}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Services Pagination */}
              {servicesLinks.length > 3 && (
                <div className="mt-6 flex justify-center gap-1">
                  {servicesLinks.map((link: any, idx: number) => {
                    if (!link) return null;

                    return (
                      <Button
                        key={idx}
                        variant={link.active ? "default" : "outline"}
                        size="sm"
                        disabled={!link.url}
                        className={`min-w-[32px] h-8 text-xs ${link.active ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        onClick={() => link.url && router.get(link.url)}
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Button>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => !open && setActionDialog({ open: false, type: null, booking: null })}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">
              {actionDialog.type === 'accept' ? 'Accept Booking' : 'Cancel Booking'}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {actionDialog.type === 'accept'
                ? 'Are you sure you want to accept this booking? The customer will be notified.'
                : 'Are you sure you want to cancel this booking? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>

          {actionDialog.booking && (
            <div className="py-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                <p className="text-sm dark:text-gray-300">
                  <span className="font-medium dark:text-gray-200">Customer:</span>{' '}
                  {getFullName(actionDialog.booking.customer)}
                </p>
                <p className="text-sm dark:text-gray-300">
                  <span className="font-medium dark:text-gray-200">Service:</span>{' '}
                  {actionDialog.booking.service?.title || 'Unknown'}
                </p>
                <p className="text-sm dark:text-gray-300">
                  <span className="font-medium dark:text-gray-200">Schedule:</span>{' '}
                  {actionDialog.booking.scheduled_date
                    ? new Date(actionDialog.booking.scheduled_date).toLocaleDateString()
                    : 'No date'}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialog({ open: false, type: null, booking: null })}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              className={actionDialog.type === 'accept' 
                ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' 
                : 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'}
            >
              {actionDialog.type === 'accept' ? 'Accept Booking' : 'Cancel Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, service: null })}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400">Delete Service</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              Are you sure you want to delete "{deleteDialog.service?.title}"?
              This action cannot be undone and will also remove all associated bookings and ratings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Yes, Delete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}