import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  PlusCircle, 
  Edit, 
  MapPin, 
  ShoppingBagIcon,
  Users,
  Calendar,
  MessageCircle,
  Eye,
  ShoppingBag,
  DollarSign,
  Clock,
  Filter,
  Search,
  Tag,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { route } from "ziggy-js";
import { type BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PigIcon } from "@/components/icons";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Swine Management", href: "/swine" },
  { title: "Seller Dashboard", href: "/marketplace/seller/index" }
];

interface Listing {
  id: number;
  title: string;
  category: string;
  price_per_unit: number;
  price_unit_type: string;
  available_quantity: number;
  image?: string;
  full_address?: string;
  listing_swine?: Array<{
    id: number;
    tag_number: string | null;
    breed: string | null;
    age: string | null;
    sex: string | null;
    weight: number | null;
    status: string | null;
  }>;
  seller_profile?: {
    name: string;
    profile_picture: string;
    location: string;
  };
}

// Star rating component
const StarRating = ({ rating, size = "sm" }: { rating: number | null; size?: "sm" | "md" }) => {
  if (!rating) return null;
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 half-star"
              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default function SellerDashboard() {
  const { auth, listings, flash, requests, overview, user_profile_image, seller_profile }: any = usePage().props;

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending_request':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'seller_review':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'seller_approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'buyer_confirmed':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800';
      case 'expired':
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const requestTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'reservation':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  React.useEffect(() => {
    if (flash?.success) toast.success(flash.success);
  }, [flash]);

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    router.delete(route("marketplace.seller.destroy", id), {
      preserveScroll: true,
    });
  };

  const user = auth?.user;

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsDialogOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [requestFilter, setRequestFilter] = useState<string | null>(null);

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(route("marketplace.seller.index"), 
        { 
          search: searchTerm,
          status: statusFilter,
          request: requestFilter
        }, 
        { preserveState: true, preserveScroll: true, replace: true }
      );
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, statusFilter, requestFilter]);

  useEffect(() => {
    if (window.location.hash === "#listings") {
      const el = document.getElementById("listings");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Seller Dashboard" />

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
          {/* User Profile Section - With Rating */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Left Welcome Section */}
            <div className="flex-1 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/30 rounded-2xl p-4 sm:p-6 border border-emerald-100 dark:border-emerald-800 shadow-sm">
              <h1 className="text-lg sm:text-xl text-emerald-800 dark:text-emerald-400">
                {user?.name ? (
                  <>
                    Welcome back, <span className="font-bold">{user.name}</span>
                  </>
                ) : (
                  "Welcome, Farmer!"
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-1 sm:mt-2">
                Manage your livestock listings, connect with buyers, and grow your farm sustainably.
              </p>
            </div>

            {/* Seller Info Card with Rating */}
            <Card className="relative flex-1 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <Link
                href={route("marketplace.seller.profile.edit")}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                title="Edit Seller Profile"
              >
                <Edit className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-700 dark:text-emerald-400" />
                <span className="text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-400">Edit</span>
              </Link>

              <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                <div className="relative">
                  <img
                    src={user_profile_image || "/default.png"}
                    alt="Profile"
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-emerald-200 dark:border-emerald-800"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-xl font-semibold text-slate-800 dark:text-gray-200 truncate">
                    {user?.name || "Unnamed Seller"}
                  </h2>
                  
                  {/* Rating Display */}
                  {seller_profile?.average_rating && (
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={seller_profile.average_rating} size="sm" />
                      <span className="text-xs text-slate-500 dark:text-gray-400">
                        {seller_profile.formatted_rating || 'No ratings yet'}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 mt-1">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                    <span className="truncate">{seller_profile?.location || "No location available"}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                    {user?.email || "No email available"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                    {seller_profile?.contact || "No contact information"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview Stats - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] sm:text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <ShoppingBagIcon className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                      Requested Swine to Purchase
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200 mt-0.5 sm:mt-1">{overview.total_buy}</h2>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] sm:text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      Reservation Requests
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200 mt-0.5 sm:mt-1">{overview.total_reserve}</h2>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] sm:text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <PigIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      Listed Swine
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-gray-200 mt-0.5 sm:mt-1">{overview.total_swine}</h2>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table Card */}
          <Card className="overflow-hidden border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
            <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/30 border-b border-slate-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="p-1 sm:p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-sm sm:text-base text-slate-800 dark:text-gray-200">Swine Requests & Transactions</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4">
              {/* Filters - Responsive */}
              <div className="flex flex-wrap gap-2 sm:gap-3 items-end mb-4">
                {/* Search */}
                <div className="flex-1 min-w-[180px]">
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-0.5 sm:mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400 dark:text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search by buyer, contact, listing..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-slate-200 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm bg-white dark:bg-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="w-full sm:w-40">
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-0.5 sm:mb-1 block">Status</label>
                  <Select
                    value={statusFilter ?? undefined}
                    onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-200 text-xs sm:text-sm">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending_request">Pending Request</SelectItem>
                      <SelectItem value="seller_review">Seller Review</SelectItem>
                      <SelectItem value="seller_approved">Seller Approved</SelectItem>
                      <SelectItem value="buyer_confirmed">Buyer Confirmed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Request Type Filter */}
                <div className="w-full sm:w-40">
                  <label className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400 mb-0.5 sm:mb-1 block">Request Type</label>
                  <Select
                    value={requestFilter ?? undefined}
                    onValueChange={(value) => setRequestFilter(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-200 text-xs sm:text-sm">
                      <SelectValue placeholder="All Requests" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="reservation">Reservation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Scrollable Table - Dynamic column widths */}
              <div className="overflow-x-auto max-h-[60vh] sm:max-h-[65vh] rounded-lg border border-slate-200 dark:border-gray-700">
                <table className="min-w-full table-auto">
                  <thead className="bg-slate-50 dark:bg-gray-700 sticky top-0 z-20">
                    <tr className="dark:border-gray-600">
                      <th className="px-1.5 sm:px-2 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">No.</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Listing Title</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Buyer Name</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Contact</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Request</th>
                      <th className="px-1.5 sm:px-2 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Qty</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Amount</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Status</th>
                      <th className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-gray-400">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.data.map((r: any, idx: number) => (
                      <tr
                        key={r.transaction_id}
                        className={`border-t border-slate-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-gray-700/50
                          ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50/50 dark:bg-gray-800/50'}
                        `}
                        onClick={() => openModal(r)}
                      >
                        <td className="px-1.5 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 whitespace-nowrap">{idx + 1}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span className="truncate block max-w-[200px] sm:max-w-[300px]">{r.listing_title || `Listing #${r.listing_id}`}</span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 whitespace-nowrap">
                          {r.buyer_name}
                        </td>
                        <td className="px-2 sm:px-3  py-2 sm:py-3 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 whitespace-nowrap">
                          {r.contact}
                        </td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                          <Badge variant="outline" className={`${requestTypeColor(r.request)} text-[9px] sm:text-xs`}>
                            {r.request.charAt(0).toUpperCase() + r.request.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-1.5 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 whitespace-nowrap text-center">{r.quantity}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-[11px] sm:text-sm whitespace-nowrap">
                          <span className="font-medium text-slate-800 dark:text-gray-200">₱{r.amount.toLocaleString()}</span>
                          <span className="text-slate-400 dark:text-gray-500 text-[9px] sm:text-xs ml-0.5 sm:ml-1">{r.price_label}</span>
                          {r.is_offer && (
                            <Badge className="ml-1 sm:ml-2 bg-amber-500 text-white border-0 text-[8px] sm:text-[10px]">
                              Offer
                            </Badge>
                          )}
                        </td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                          <Badge variant="outline" className={`${statusColor(r.raw_status)} text-[9px] sm:text-xs`}>
                            {r.status}
                          </Badge>
                        </td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-sm text-slate-500 dark:text-gray-400 whitespace-nowrap">
                          {r.transaction_date_md}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Responsive */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                <span className="text-[10px] sm:text-sm text-slate-500 dark:text-gray-400">
                  Page {requests.current_page} of {requests.last_page}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!requests.prev_page_url}
                    onClick={() => router.get(requests.prev_page_url, { search: searchTerm }, { preserveScroll: true })}
                    className="text-[10px] sm:text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!requests.next_page_url}
                    onClick={() => router.get(requests.next_page_url, { search: searchTerm }, { preserveScroll: true })}
                    className="text-[10px] sm:text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Listings Section Header - Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" id="listings">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-gray-200 flex items-center gap-1.5 sm:gap-2">
              <PigIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
              Marketplace Listings
            </h2>
            <Link href={route("marketplace.seller.create")}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm text-xs sm:text-sm">
                <PlusCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Add Listing
              </Button>
            </Link>
          </div>

          {/* Listings Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {listings.length > 0 ? (
              listings.map((listing: Listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden border-slate-200 dark:border-gray-700 pt-0 shadow-sm hover:shadow-md transition-all hover:border-emerald-200 dark:hover:border-emerald-800 group dark:bg-gray-800"
                >
                  <div className="relative h-36 sm:h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800">
                    {listing.image ? (
                      <img
                        src={`/storage/${listing.image}`}
                        alt={listing.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <PigIcon className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 dark:text-gray-600" />
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-slate-700 dark:text-gray-300 border-0 shadow-sm text-[10px] sm:text-xs">
                      #{listing.id}
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 text-slate-700 dark:text-gray-300 border-0 shadow-sm text-[10px] sm:text-xs">
                      {listing.category}
                    </Badge>
                  </div>

                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-lg text-slate-800 dark:text-gray-200 mb-1.5 sm:mb-2 line-clamp-1">
                      {listing.title}
                    </h3>

                    <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-sm text-slate-500 dark:text-gray-400">Price:</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                          ₱{listing.price_per_unit.toLocaleString()}
                          <span className="text-[9px] sm:text-xs text-slate-500 dark:text-gray-400 ml-0.5 sm:ml-1">
                            {listing.price_unit_type === "per_head" ? "/head" : "/kg"}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-sm text-slate-500 dark:text-gray-400">Available:</span>
                        <span className="font-medium text-slate-700 dark:text-gray-300 text-xs sm:text-sm">{listing.available_quantity}</span>
                      </div>

                      {/* Livestock Tags - Responsive */}
                      <div className="mt-1.5 sm:mt-2">
                        <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs text-slate-500 dark:text-gray-400 mb-0.5 sm:mb-1">
                          <PigIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          <span>Livestock ({listing.listing_swine?.length || 0})</span>
                        </div>
                        
                        {listing.listing_swine && listing.listing_swine.length > 0 ? (
                          <div className="flex flex-wrap gap-0.5 sm:gap-1">
                            {listing.listing_swine.slice(0, 3).map((swine) => (
                              <Badge
                                key={swine.id}
                                variant="outline"
                                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-[8px] sm:text-[10px]"
                                title={`Breed: ${swine.breed || 'N/A'}, Age: ${swine.age || 'N/A'}, Sex: ${swine.sex || 'N/A'}`}
                              >
                                {swine.tag_number || `#${swine.id}`}
                              </Badge>
                            ))}
                            
                            {listing.listing_swine.length > 3 && (
                              <Badge variant="outline" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-gray-600 text-[8px] sm:text-[10px]">
                                +{listing.listing_swine.length - 3} more
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <p className="text-[9px] sm:text-xs text-slate-400 dark:text-gray-500 italic">No livestock assigned</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1.5 sm:pt-2 border-t border-slate-100 dark:border-gray-700">
                      <Link
                        href={route("marketplace.seller.edit", listing.id)}
                        className="text-[11px] sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-0.5 sm:gap-1"
                      >
                        <Edit className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Edit
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(listing.id)}
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 h-auto p-1 sm:p-2"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-16 text-center bg-slate-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-gray-700">
                <PigIcon className="h-8 w-8 sm:h-12 sm:w-12 text-slate-300 dark:text-gray-600 mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mb-3 sm:mb-4">No listings found yet.</p>
                <Link href={route("marketplace.seller.create")}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm">
                    <PlusCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Create Your First Listing
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Details Modal - Dark Mode Support */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
            <DialogHeader className="border-b pb-2 sm:pb-3 dark:border-gray-700">
              <DialogTitle className="text-base sm:text-lg font-semibold text-slate-800 dark:text-gray-200">Transaction Details</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                Complete details of the selected transaction
              </DialogDescription>
            </DialogHeader>

            {selectedTransaction && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4">
                {/* Buyer Info */}
                <div className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-1">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    Buyer Information
                  </h3>
                  <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-sm">
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Name:</span> <span className="dark:text-gray-300">{selectedTransaction.buyer_name}</span></p>
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Email:</span> <span className="dark:text-gray-300">{selectedTransaction.email}</span></p>
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Contact:</span> <span className="dark:text-gray-300">{selectedTransaction.contact}</span></p>
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Address:</span> <span className="dark:text-gray-300">{selectedTransaction.address ?? "N/A"}</span></p>
                  </div>
                </div>

                {/* Transaction Info */}
                <div className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="text-xs sm:text-sm font-semibold text-purple-800 dark:text-purple-400 flex items-center gap-1">
                    <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                    Transaction Information
                  </h3>
                  <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-sm">
                    <p>
                      <span className="font-medium text-slate-600 dark:text-gray-400">Listing:</span>{' '}
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">
                        {selectedTransaction.listing_title || `Listing #${selectedTransaction.listing_id}`}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600 dark:text-gray-400">Request Type:</span>{' '}
                      <Badge variant="outline" className={`${requestTypeColor(selectedTransaction.request)} text-[9px] sm:text-xs ml-1`}>
                        {selectedTransaction.request}
                      </Badge>
                    </p>
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Quantity:</span> <span className="dark:text-gray-300">{selectedTransaction.quantity}</span></p>
                    <p>
                      <span className="font-medium text-slate-600 dark:text-gray-400">Price:</span>{' '}
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        ₱{selectedTransaction.amount.toLocaleString()}
                      </span>
                      <span className="text-[9px] sm:text-xs text-slate-500 dark:text-gray-400 ml-0.5 sm:ml-1">{selectedTransaction.price_label}</span>
                    </p>
                    {selectedTransaction.is_offer && (
                      <p>
                        <span className="font-medium text-slate-600 dark:text-gray-400">Offer:</span>{' '}
                        <Badge className="bg-amber-500 text-white border-0 text-[9px] sm:text-xs">
                          ₱{selectedTransaction.amount.toLocaleString()} {selectedTransaction.price_label}
                        </Badge>
                      </p>
                    )}
                    <p>
                      <span className="font-medium text-slate-600 dark:text-gray-400">Status:</span>{' '}
                      <Badge variant="outline" className={`${statusColor(selectedTransaction.raw_status)} text-[9px] sm:text-xs ml-1`}>
                        {selectedTransaction.status}
                      </Badge>
                    </p>
                    <p><span className="font-medium text-slate-600 dark:text-gray-400">Date:</span> <span className="dark:text-gray-300">{selectedTransaction.transaction_date}</span></p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="border-t pt-2 sm:pt-3 gap-1.5 sm:gap-2 dark:border-gray-700">
              <Button variant="outline" onClick={closeModal} className="text-[11px] sm:text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Close
              </Button>
              <Button
                onClick={() => {
                  router.visit(`/marketplace/transaction/${selectedTransaction?.transaction_id}/setup`);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs"
              >
                Proceed with Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppLayout>
    </>
  );
}