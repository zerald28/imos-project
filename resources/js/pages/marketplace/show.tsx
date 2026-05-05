import React, { useState, useRef, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Badge, ChevronLeft, ChevronRight, Eye, FileText, MessageCircle, MessageCircleMore, Store, User } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";
import AppLayout from "@/layouts/marketplaceLayout";
import { type BreadcrumbItem } from "@/types";
import { route } from "ziggy-js";
// Add this import with the other imports
import ViewClearanceDialog from '@/pages/vetmed/ViewClearanceDialog';
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Marketplace", href: "#" },
  { title: "Marketplace", href: "/marketplace/show" }
];

interface Swine {
  id: number;
  sex: string;
  birthdate: string | null;
  scaled_weight: number | null;
  breed: string;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price_per_unit: number;
  price_unit_type: string;
  available_quantity: number;
  full_address: string;
  image?: string | null;
  gallery_images?: string[];
  listing_swine: { 
    id: number; 
    swine: Swine; 
    status: string;  
    scaled_weight?: number;
    estimated_weight?: number;
    breed?: string;
    birthdate?: string;
    sex?: string; 
  }[];
  seller: { 
    id: number; 
    name: string;
    profile?: { 
      contact?: string; 
      email?: string; 
      name?: string;
      profile_picture?: string;
    }; 
  };
}

interface Buyer {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
}

interface Props {
  listing: Listing;
  buyer?: Buyer;
  vetmedClearance?: {
    id: number;
    clearance_number: string;
    document_type: string;
    veterinarian_name: string;
    license_number: string;
    issued_by: string;
    issue_date: string;
    expiry_date: string;
    remarks: string;
    status: string;
    file_path: string;
    file_name: string;
    mime_type: string;
    file_size: number;
    rejection_reason?: string;
    created_at: string;
  } | null;
}

// Function to generate initials from name
const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Function to generate a consistent color based on name
const getProfileColor = (name: string) => {
  const colors = [
    'bg-green-600', 'bg-blue-600', 'bg-purple-600', 'bg-amber-600', 
    'bg-red-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-cyan-600',
    'bg-violet-600', 'bg-orange-600',
  ];
  
  if (!name) return colors[0];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Show: React.FC<Props> = ({ listing, buyer,  vetmedClearance }) => {
  // Combine main image + gallery images safely
  const images = React.useMemo(
    () => [listing.image, ...(listing.gallery_images || [])].filter(Boolean) as string[],
    [listing.image, listing.gallery_images]
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSwineIds, setSelectedSwineIds] = useState<number[]>([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<"buy" | "reserve" | null>(null);
  // ❌ REMOVED: message state (no longer sent to backend)
  const [offerAmount, setOfferAmount] = useState<number | "">("");
  const [existingRequests, setExistingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Profile fallback setup
  const sellerName = listing.seller.name || listing.seller.profile?.name || "Seller";
  const sellerInitials = getInitials(sellerName);
  const sellerProfileColor = getProfileColor(sellerName);
  const sellerProfileImage = listing.seller.profile?.profile_picture;

  const tableRef = useRef<HTMLDivElement | null>(null);

  const prevImage = () => {
    setCurrentImageIndex((i) => i === 0 ? images.length - 1 : i - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((i) => i === images.length - 1 ? 0 : i + 1);
  };

  const ageFromBirthdate = (birthdate: string | null | undefined) => {
    if (!birthdate) return "-";
    const birth = new Date(birthdate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const verifySelection = () => {
    if (selectedSwineIds.length === 0) {
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      tableRef.current?.classList.add("ring-2", "ring-green-400");
      setTimeout(() => tableRef.current?.classList.remove("ring-2", "ring-green-400"), 1500);
      toast.error("Please select at least one livestock before proceeding.");
      return false;
    }
    return true;
  };

  const openRequestModal = (type: "buy" | "reserve") => {
    if (!verifySelection()) return;
    setRequestType(type);
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setRequestType(null);
    // ❌ REMOVED: setMessage(""); (no longer needed)
    setOfferAmount("");
  };

  useEffect(() => {
    axios
      .get(`/listings/${listing.id}/swine-requests`)
      .then((res) => setExistingRequests(res.data))
      .catch((err) => console.error(err));
  }, [listing.id]);

  const isSwineAlreadyRequested = (swineId: number) => {
    return existingRequests.some(
      (r) => r.listing_swine_id === swineId
    );
  };

  const toggleSwineSelections = (swineId: number) => {
    // Check if swine is already requested
    if (isSwineAlreadyRequested(swineId)) {
      const swineRequest = existingRequests.find(
        (r) => r.listing_swine_id === swineId
      );

      toast.error(
        <div>
          <div>This livestock is already part of a request:</div>
          <ul className="text-xs mt-1 space-y-1">
            <li><strong>Transaction ID:</strong> {swineRequest.transaction_id}</li>
            <li><strong>Type:</strong> {swineRequest.type}</li>
            {swineRequest.offer_amount && (
              <li><strong>Offer:</strong> ₱{swineRequest.offer_amount}</li>
            )}
            <li><strong>Date:</strong> {new Date(swineRequest.created_at).toLocaleDateString()}</li>
          </ul>
        </div>,
        { duration: 6000 }
      );
      return;
    }

    // Check if swine is available
    const swineItem = listing.listing_swine.find(item => item.id === swineId);
    if (swineItem && swineItem.status !== "available") {
      toast.error("This livestock is not available for selection.");
      return;
    }

    setSelectedSwineIds((prev) =>
      prev.includes(swineId)
        ? prev.filter((id) => id !== swineId)
        : [...prev, swineId]
    );
  };

  const handleSubmitRequest = async () => {
    if (!buyer) {
      toast.error("Buyer information is required.");
      return;
    }

    if (selectedSwineIds.length === 0) {
      toast.error("Please select at least one livestock.");
      return;
    }

    setLoading(true);
    try {
      // ✅ UPDATED: Removed 'message' from the request payload
      const response = await axios.post("/swine-request/store", {
        listing_id: listing.id,
        selected_swine_ids: selectedSwineIds,
        buyer_id: buyer.id,
        contact: buyer.contact,
        email: buyer.email,
        address: buyer.address,
        type: requestType === "buy" ? "purchase" : "reservation",
        offer_amount: offerAmount,
        // ❌ REMOVED: message field (no longer sent)
      });

      toast.success(response.data.message || "Request successfully sent!");
      
      // ✅ UPDATED: Use the transaction_id from response
      const transactionId = response.data.transaction_id;
      
      // Update local state to mark selected swine as requested
      setExistingRequests(prev => [...prev, ...selectedSwineIds.map(id => ({
        listing_swine_id: id,
        transaction_id: transactionId,
        type: requestType === "buy" ? "purchase" : "reservation",
        offer_amount: offerAmount || null,
        created_at: new Date().toISOString()
      }))]);
      
      // Reset selections and close modal
      setSelectedSwineIds([]);
      closeRequestModal();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to submit request. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSeller = async () => {
    if (selectedSwineIds.length === 0) {
      toast.error("Please select at least one livestock to message about.");
      return;
    }

    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: listing.seller.id,
        listing_id: listing.id,
        listing_swine_ids: selectedSwineIds,
      });

      const conversation = res.data.data;
      Inertia.visit(`/messenger?conversation=${conversation.id}&listing=${listing.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to start conversation.");
    }
  };

  // Calculate totals for the modal
  const selectedSwine = listing.listing_swine.filter((sw) => selectedSwineIds.includes(sw.id));
  const totalWeight = selectedSwine.reduce((sum, sw) => {
    const weight = sw.scaled_weight 
      ? Number(sw.scaled_weight) 
      : sw.estimated_weight 
        ? Number(sw.estimated_weight) 
        : 0;
    return sum + weight;
  }, 0);

  const totalCost = listing.price_unit_type === 'per_kg' 
    ? totalWeight * listing.price_per_unit 
    : selectedSwineIds.length * listing.price_per_unit;


      const [isVetmedDialogOpen, setIsVetmedDialogOpen] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState<any>(null);

  // Function to handle viewing vetmed clearance
  const handleViewVetmedClearance = () => {
    if (vetmedClearance) {
      setSelectedClearance(vetmedClearance);
      setIsVetmedDialogOpen(true);
    }
  };

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={listing.title} />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> 
            Back to Marketplace
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Images */}
            <Card className="overflow-hidden pt-0 pb-0 border border-gray-200 dark:border-gray-700">
              {images.length > 0 ? (
                <div className="relative">
                  <img
                    src={`/storage/${images[currentImageIndex]}`}
                    alt={`Listing Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover"
                  />
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">No images available</p>
                </div>
              )}
            </Card>

            {/* Right Column: Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {listing.description}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {listing.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Quantity</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {listing.available_quantity}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                    ₱{listing.price_per_unit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    per {listing.price_unit_type}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-gray-900 dark:text-white">{listing.full_address}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Seller</p>
                  <Link href={route("marketplace.profile.show", listing.seller.id)} className="block">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {sellerProfileImage ? (
                          <>
                            <img
                              src={`/storage/${sellerProfileImage}`}
                              alt={sellerName}
                              className="w-12 h-12 rounded-full border-2 border-green-500 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = parent.querySelector(".seller-profile-fallback") as HTMLElement;
                                  if (fallback) fallback.style.display = "flex";
                                }
                              }}
                            />
                            <div
                              className={`${sellerProfileColor} seller-profile-fallback hidden 
                                        w-12 h-12 rounded-full border-2 border-green-500 
                                        items-center justify-center`}
                            >
                              <span className="text-lg font-bold text-white">{sellerInitials}</span>
                            </div>
                          </>
                        ) : (
                          <div
                            className={`${sellerProfileColor} w-12 h-12 rounded-full border-2 
                                      border-green-500 flex items-center justify-center`}
                          >
                            <span className="text-lg font-bold text-white">{sellerInitials}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{sellerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {listing.seller.profile?.contact ||
                            listing.seller.profile?.email ||
                            "No contact"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                
              </div>

             

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={() => openRequestModal("buy")}
                  className="bg-green-600 hover:bg-green-700 text-white h-12"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleMessageSeller}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                >
                  <MessageCircleMore className="w-4 h-4 mr-2" />
                  Message Seller
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                Select livestock first to message about specific items
              </p>
            </div>
          </div>

          {/* Livestock Selection Table */}
          <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Store className="w-5 h-5" />
                Select Livestock for Purchase
              </h2>
              <p className="text-green-100 text-sm mt-1">
                Choose from available livestock below
              </p>
            </div>

            <div className="p-4" ref={tableRef}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="p-3 border-b w-12 text-left"></th>
                      <th className="p-3 border-b text-left">ID</th>
                      <th className="p-3 border-b text-left">Breed</th>
                      <th className="p-3 border-b text-left">Sex</th>
                      <th className="p-3 border-b text-left">Weight</th>
                      <th className="p-3 border-b text-left">Age</th>
                      <th className="p-3 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {listing.listing_swine.map((item, index) => {
                      const swineRequest = existingRequests.find(
                        (r) => r.listing_swine_id === item.id
                      );
                      const isAlreadyRequested = !!swineRequest;
                      const isAvailable = item.status === "available" && !isAlreadyRequested;
                      
                      return (
                        <tr 
                          key={item.id}
                          className={`
                            ${!isAvailable ? "opacity-75" : ""}
                            ${isAlreadyRequested ? "bg-amber-50 dark:bg-amber-900/10" : 
                              index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                            ${isAvailable ? "hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer" : ""}
                            transition-colors
                          `}
                        >
                          <td className="p-3">
                            <Checkbox
                              checked={selectedSwineIds.includes(item.id)}
                              disabled={!isAvailable}
                              onCheckedChange={() => {
                                if (isAlreadyRequested) {
                                  toast.error("This livestock has already been requested.");
                                } else if (item.status !== "available") {
                                  toast.error("This livestock is not available.");
                                } else {
                                  toggleSwineSelections(item.id);
                                }
                              }}
                              aria-label={`Select swine ${item.id}`}
                            />
                          </td>
                          <td className="p-3 font-medium">
                            <div className="flex items-center gap-2">
                              {item.id}
                              {isAlreadyRequested && (
                                <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded">
                                  Requested
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3">{item.breed}</td>
                          <td className="p-3">{item.sex}</td>
                          <td className="p-3">
                            {item.scaled_weight
                              ? `${Number(item.scaled_weight).toFixed(1)} kg`
                              : item.estimated_weight
                              ? `${Number(item.estimated_weight).toFixed(1)} kg (est.)`
                              : "-"}
                          </td>
                          <td className="p-3">{ageFromBirthdate(item.birthdate)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isAlreadyRequested
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                : item.status === "available"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }`}>
                              {isAlreadyRequested ? "Already requested" : item.status}
                            </span>
                          </td>
                          <td className="p-3">
                            {isAlreadyRequested && swineRequest ? (
                              <div className="flex flex-col gap-1">
                                <Link
                                  href={`/marketplace/transactions/${swineRequest.transaction_id}/buyer`}
                                  className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 
                                           dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  View Transaction
                                </Link>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <span className="truncate max-w-[100px]">ID: {swineRequest.transaction_id}</span>
                                    <span className="mx-1">•</span>
                                    <span className="capitalize">{swineRequest.type}</span>
                                  </div>
                                  {swineRequest.offer_amount && (
                                    <div className="mt-0.5">
                                      <span className="text-green-600 dark:text-green-400">
                                        ₱{Number(swineRequest.offer_amount).toLocaleString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                  {/* ✅ Vetmed Clearance Section - MOVED HERE (after table, before selected swine section) */}
    {vetmedClearance && (
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Vetmed Clearance
            </span>
            {vetmedClearance.status === 'verified' && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                Verified
              </Badge>
            )}
            {vetmedClearance.status === 'pending_review' && (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Pending Review
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleViewVetmedClearance}
            className="text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Clearance
          </Button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          Clearance Number: {vetmedClearance.clearance_number || 'N/A'}
        </p>
        {vetmedClearance.expiry_date && (
          <p className="text-xs text-gray-500 mt-1">
            Valid until: {new Date(vetmedClearance.expiry_date).toLocaleDateString()}
          </p>
        )}
        {vetmedClearance.status === 'verified' && (
          <div className="mt-2 flex items-center gap-1">
            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-green-600 dark:text-green-400">
              This seller has a verified veterinary clearance
            </p>
          </div>
        )}
      </div>
    )}

              </div>

              {selectedSwineIds.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Selected: {selectedSwineIds.length} livestock
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated total: ₱{(listing.price_unit_type === 'per_kg' 
                          ? totalWeight * listing.price_per_unit 
                          : selectedSwineIds.length * listing.price_per_unit
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openRequestModal("buy")}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Buy Selected
                      </Button>
                      <Button
                        onClick={() => openRequestModal("reserve")}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Reserve Selected
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Request Modal - WITHOUT Message Field */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative bg-white dark:bg-gray-800 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden 
                            animate-in fade-in-0 zoom-in-95 my-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold truncate">
                      {requestType === "buy" ? "Purchase Request" : "Reservation Request"}
                    </h2>
                    <p className="text-green-100 text-sm mt-1 truncate">
                      Request to: {sellerName}
                    </p>
                  </div>
                  <button
                    onClick={closeRequestModal}
                    className="text-white hover:text-gray-200 transition-colors ml-4 flex-shrink-0 
                             p-1 rounded-full hover:bg-white/10 w-8 h-8 flex items-center justify-center"
                    disabled={loading}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Selected Items */}
                  <div className="lg:col-span-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-lg flex items-center">
                      <Store className="w-5 h-5 mr-2" />
                      Selected Livestock ({selectedSwineIds.length})
                    </h3>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="max-h-72 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                            <tr>
                              <th className="p-3 border-b text-left font-medium">#</th>
                              <th className="p-3 border-b text-left font-medium">Breed</th>
                              <th className="p-3 border-b text-left font-medium">Sex</th>
                              <th className="p-3 border-b text-left font-medium">Weight</th>
                              <th className="p-3 border-b text-left font-medium">Age</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedSwine.map((sw, i) => (
                              <tr key={sw.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3 font-medium text-center">{i + 1}</td>
                                <td className="p-3">{sw.breed}</td>
                                <td className="p-3">{sw.sex}</td>
                                <td className="p-3">
                                  {sw.scaled_weight
                                    ? `${Number(sw.scaled_weight).toFixed(1)} kg`
                                    : sw.estimated_weight
                                    ? `${Number(sw.estimated_weight).toFixed(1)} kg`
                                    : "-"}
                                </td>
                                <td className="p-3">{ageFromBirthdate(sw.birthdate)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summary and Form */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Summary Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Order Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedSwineIds.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Total Weight:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{totalWeight.toFixed(2)} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Unit Price:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            ₱{listing.price_per_unit.toLocaleString()}
                            <span className="text-xs text-gray-500 ml-1">/{listing.price_unit_type}</span>
                          </span>
                        </div>
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-gray-900 dark:text-white">Estimated Total:</span>
                            <span className="text-green-600 dark:text-green-400 text-xl">
                              ₱{totalCost.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Offer Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <span className="flex items-center">
                          
                          Your Offer (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                        <input
                          type="number"
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value ? parseFloat(e.target.value) : '')}
                          placeholder="Enter custom offer amount"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500
                                   text-base"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Leave blank to accept the seller's price of ₱{listing.price_per_unit.toLocaleString()} per {listing.price_unit_type}
                      </p>
                    </div>

                    {/* ❌ REMOVED: Message to Seller section */}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    By submitting this request, you agree to our 
                    <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 ml-1">terms of service</a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={closeRequestModal}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 sm:order-1 flex-1 sm:flex-none"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitRequest}
                      className="bg-green-600 hover:bg-green-700 text-white sm:order-2 flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Store className="w-5 h-5 mr-2" />
                          {requestType === "buy" ? 'Confirm Purchase' : 'Confirm Reservation'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Toaster 
          position="top-right" 
          richColors 
          toastOptions={{
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />

        {/* Vetmed Clearance Dialog */}
<ViewClearanceDialog
  clearance={selectedClearance}
  isOpen={isVetmedDialogOpen}
  onClose={() => {
    setIsVetmedDialogOpen(false);
    setSelectedClearance(null);
  }}
/>

<Toaster 
  position="top-right" 
  richColors 
  toastOptions={{
    style: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
  }}
/>
      </AppLayout>
    </>
  );
};

export default Show;