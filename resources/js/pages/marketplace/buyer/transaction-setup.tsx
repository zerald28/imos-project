import React, { useState, useEffect, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AppLayout from "@/layouts/marketplaceLayout";
import { route } from "ziggy-js";
import axios from "axios";
import { router } from "@inertiajs/react";
import { 
  Check, MessageCircleMore, User, Phone, MessageSquare, 
  Mail, MapPin, Calendar, Tag, AlertTriangle, XCircle, 
  Trash2, AlertCircle, Badge, DollarSign 
} from "lucide-react";
import RatingModal from "@/components/rating/RatingModal";
import { Star } from "lucide-react";


// Updated types
type Transaction = {
  id: number;
  listing_id: number;
  seller_id: number;
  buyer_id: number;
  seller_name: string;
  buyer_name: string;
  email: string;
  contact: string;
  address: string;
  request_type: string;
  quantity: number;
  offer_amount?: number;
  original_amount: number;
  price_per_unit: number;
  price_unit_type: string;
  total_weight: number;
  price_label: string;
  status: string;
  transaction_date: string;
  listing_title: string;
};

type SwineItem = {
  listing_swine_id: number;
  sex: string;
  breed: string;
  age_days: string;
  weight: string | number;
  status: string;
  status_display: string;
  status_variant: string;
  is_in_transaction: boolean;
  final_amount?: number | null;
};

type Props = {
  transaction: Transaction & {
    has_rating?: boolean;
    rating?: {
      rating: number;
      comment: string;
    } | null;
  };
  all_swine_list: SwineItem[];
  transaction_swine_ids: number[];
};

const TransactionSetup: React.FC<Props> = ({ 
  transaction, 
  all_swine_list, 
  transaction_swine_ids 
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(
    transaction.offer_amount || transaction.original_amount
  );

  const [localSwineList, setLocalSwineList] = useState(all_swine_list);
  const [isAddingSwine, setIsAddingSwine] = useState(false);
  const [selectedSwineToAdd, setSelectedSwineToAdd] = useState<number[]>([]);

  useEffect(() => {
    setLocalSwineList(all_swine_list);
  }, [all_swine_list]);

  const transactionSwineList = useMemo(() => {
    return localSwineList.filter(item => item.is_in_transaction);
  }, [localSwineList]);

 const validTransactionSwine = useMemo(() => {
  if (transaction.status === "Completed" || transaction.status === "Done") {
    return transactionSwineList;
  }
  return transactionSwineList.filter(item => item.status !== 'sold');
}, [transactionSwineList, transaction.status]);

  const soldTransactionSwineCount = useMemo(() => {
    return transactionSwineList.filter(item => item.status === 'sold').length;
  }, [transactionSwineList]);

  const validTransactionTotalWeight = useMemo(() => {
    return validTransactionSwine.reduce((sum, item) => {
      const weight = typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0;
      return sum + weight;
    }, 0);
  }, [validTransactionSwine]);

  const validTransactionTotalAmount = useMemo(() => {
    if (transaction.price_unit_type === 'per_kg') {
      return validTransactionTotalWeight * transaction.price_per_unit;
    } else {
      const validItems = validTransactionSwine;
      const hasFinalAmounts = validItems.some(item => item.final_amount && item.final_amount > 0);
      
      if (hasFinalAmounts) {
        return validItems.reduce((sum, item) => {
          const amount = item.final_amount ? Number(item.final_amount) : 0;
          return sum + amount;
        }, 0);
      } else {
        return validItems.length * Number(transaction.price_per_unit);
      }
    }
  }, [validTransactionSwine, validTransactionTotalWeight, transaction.price_unit_type, transaction.price_per_unit]);

  const subtotalDisplay = useMemo(() => {
    if (transaction.price_unit_type === 'per_kg') {
      return {
        label: `₱${transaction.price_per_unit.toLocaleString()} × ${validTransactionTotalWeight.toFixed(2)} kg`,
        value: validTransactionTotalWeight * transaction.price_per_unit
      };
    } else {
      const validItems = validTransactionSwine;
      const hasFinalAmounts = validItems.some(item => item.final_amount && item.final_amount > 0);
      
      if (hasFinalAmounts) {
        const breakdown = validItems
          .map(item => item.final_amount ? `₱${item.final_amount.toLocaleString()}` : '₱0')
          .join(' + ');
        return {
          label: breakdown,
          value: validItems.reduce((sum, item) => sum + (item.final_amount || 0), 0)
        };
      } else {
        return {
          label: `₱${transaction.price_per_unit.toLocaleString()} × ${validItems.length} head`,
          value: validItems.length * transaction.price_per_unit
        };
      }
    }
  }, [validTransactionSwine, validTransactionTotalWeight, transaction.price_unit_type, transaction.price_per_unit]);

  const localTransactionSwineList = useMemo(() => {
    return localSwineList.filter(item => item.is_in_transaction);
  }, [localSwineList]);

  const localValidTransactionSwine = useMemo(() => {
  return localTransactionSwineList.filter(item => item.status !== 'sold' || transaction.status === "Completed" || transaction.status === "Done");
}, [localTransactionSwineList, transaction.status]);

  const localValidTransactionTotalWeight = useMemo(() => {
    return localValidTransactionSwine.reduce((sum, item) => {
      const weight = typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0;
      return sum + weight;
    }, 0);
  }, [localValidTransactionSwine]);

  const localValidTransactionTotalAmount = useMemo(() => {
    if (transaction.price_unit_type === 'per_kg') {
      return localValidTransactionTotalWeight * transaction.price_per_unit;
    } else {
      const validItems = localValidTransactionSwine;
      const hasFinalAmounts = validItems.some(item => item.final_amount && item.final_amount > 0);
      
      if (hasFinalAmounts) {
        return validItems.reduce((sum, item) => sum + (item.final_amount || 0), 0);
      } else {
        return validItems.length * transaction.price_per_unit;
      }
    }
  }, [localValidTransactionSwine, localValidTransactionTotalWeight, transaction.price_unit_type, transaction.price_per_unit]);

  const { data, setData, post, processing } = useForm({
    final_quantity: validTransactionSwine.length,
    final_amount: selectedAmount,
  });

  useEffect(() => {
    setData("final_amount", selectedAmount);
    setData("final_quantity", validTransactionSwine.length);
  }, [selectedAmount, validTransactionSwine.length]);

  const handleWeightChange = (index: number, value: string) => {
    const updated = [...localSwineList];
    updated[index].weight = value;
    setLocalSwineList(updated);
  };

  const handleFinalAmountChange = (index: number, value: string) => {
    const updated = [...localSwineList];
    updated[index].final_amount = value ? parseFloat(value) : null;
    setLocalSwineList(updated);
  };

  const saveFinalAmount = async (listing_swine_id: number, finalAmount: number | null) => {
    try {
      await axios.post(route("marketplace.transaction.updateFinalAmount", listing_swine_id), {
        final_amount: finalAmount,
      });
      
      toast.success("Final amount updated!");
    } catch {
      toast.error("Failed to update final amount");
    }
  };

  const saveWeight = async (listing_swine_id: number, newWeight: number) => {
    try {
      await axios.post(route("marketplace.transaction.updateWeight", listing_swine_id), {
        scaled_weight: newWeight,
      });
      
      setLocalSwineList(prevList => 
        prevList.map(item => 
          item.listing_swine_id === listing_swine_id 
            ? { ...item, weight: newWeight } 
            : item
        )
      );
      
      toast.success("Weight updated!");
    } catch {
      toast.error("Failed to update weight");
    }
  };

  const getStatusMessage = (status: string) => {
    const statusMessages: Record<string, string> = {
      "Seller Review": "Your Request is Pending Review",
      "Seller Approved": "Your Request has been Approved",
      "Buyer Confirmed": "Awaiting Your Confirmation",
      "Completed": "Transaction Completed",
      "Done": "Transaction Completed and Acknowledged",
      "Cancelled": "Transaction Cancelled",
      "Pending": "Your Request is Pending",
      "Approved": "Your Request has been Approved",
      "Rejected": "Your Request was Declined",
      "In Progress": "Transaction in Progress",
      "Delivered": "Transaction Delivered",
      "Paid": "Payment Received",
      "Shipped": "Order Shipped",
      "Unavailable": "Items No Longer Available",
      "Listing Deleted": "Listing Has Been Removed",
    };
    
    return statusMessages[status] || `Status: ${status}`;
  };

 const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      "Seller Review": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      "Seller Approved": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "Buyer Confirmed": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "In Progress": "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      "Completed": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800",
      "Done": "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      "Cancelled": "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      "Expired": "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
      "Unavailable": "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      "Listing Deleted": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800",
    };
    return statusColors[status] || "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  };

  const isTerminalState = ["Completed", "Cancelled", "Expired", "Unavailable","Done", "Listing Deleted"].includes(transaction.status);
  const isUnavailable = transaction.status === "Unavailable";
  const isListingDeleted = transaction.status === "Listing Deleted";

  const canAddSwine = useMemo(() => {
    const allowedStates = ["pending_request", "seller_review"];
    return allowedStates.includes(transaction.status?.toLowerCase().replace(' ', '_'));
  }, [transaction.status]);

  const handleCall = (phoneNumber: string, personName: string) => {
    if (phoneNumber) {
      const cleanedNumber = phoneNumber.replace(/\D/g, '');
      window.location.href = `tel:${cleanedNumber}`;
      toast.info(`Calling ${personName}...`);
    } else {
      toast.error("No contact number available");
    }
  };

  const handleText = (phoneNumber: string, personName: string) => {
    if (phoneNumber) {
      const cleanedNumber = phoneNumber.replace(/\D/g, '');
      
      const message = `Hi ${personName}! Regarding transaction #${transaction.id} for ${validTransactionSwine.length} swine(s). Total amount: ₱${validTransactionTotalAmount.toLocaleString()}.`;
      
      window.location.href = `sms:${cleanedNumber}?body=${encodeURIComponent(message)}`;
      toast.info(`Opening SMS to ${personName}...`);
    } else {
      toast.error("No contact number available");
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return 'N/A';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return phone;
  };

  const handleAddSwine = async () => {
    if (selectedSwineToAdd.length === 0) {
      toast.error("Please select at least one swine to add");
      return;
    }

    try {
      const response = await axios.post(route("marketplace.transaction.addSwine", transaction.id), {
        listing_swine_ids: selectedSwineToAdd
      });

      toast.success(response.data.message || "Swine added successfully");
      router.reload({ only: ['all_swine_list', 'transaction'] });
      setSelectedSwineToAdd([]);
      setIsAddingSwine(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add swine");
    }
  };

  const handleRemoveSwine = async (listingSwineId: number) => {
    if (!confirm("Are you sure you want to remove this swine from the transaction?")) {
      return;
    }

    try {
      const response = await axios.post(route("marketplace.transaction.removeSwine", transaction.id), {
        listing_swine_id: listingSwineId
      });

      toast.success(response.data.message || "Swine removed successfully");
      router.reload({ only: ['all_swine_list', 'transaction'] });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to remove swine");
    }
  };

  const toggleSwineSelection = (listingSwineId: number) => {
    setSelectedSwineToAdd(prev => 
      prev.includes(listingSwineId)
        ? prev.filter(id => id !== listingSwineId)
        : [...prev, listingSwineId]
    );
  };

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editedPricePerUnit, setEditedPricePerUnit] = useState(transaction.price_per_unit);
  const [editedPriceUnitType, setEditedPriceUnitType] = useState(transaction.price_unit_type);

  const handleUpdatePrice = async () => {
    if (editedPricePerUnit <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      await axios.post(route("marketplace.transaction.updatePrice", transaction.id), {
        price_per_unit: editedPricePerUnit,
        price_unit_type: editedPriceUnitType,
      });

      toast.success("Price updated successfully");
      router.reload({ only: ['transaction'] });
      setShowPriceModal(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update price");
    }
  };

  const canEditPrice = useMemo(() => {
    const allowedStates = ["pending_request", "seller_review", "seller_approved"];
    return allowedStates.includes(transaction.status?.toLowerCase().replace(' ', '_'));
  }, [transaction.status]);




  // farmer rating

  // Add these state variables inside your component
const [hasCheckedRating, setHasCheckedRating] = useState(false);

// Add this useEffect to check for existing rating when transaction is completed


 const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Use the rating from props directly
  const existingRating = transaction.rating;
  const hasRating = transaction.has_rating;

  // Add this useEffect to log when rating changes
  useEffect(() => {
    console.log('Rating updated from props:', existingRating);
  }, [existingRating]);

  // Add this function to handle rating submission
  const handleRatingSubmitted = async () => {
    // Close the modal
    setShowRatingModal(false);
    
    // Show success message
    toast.success(existingRating ? "Rating updated successfully!" : "Rating submitted successfully!");
    
    // Reload the page to get fresh data including the new rating
    // Use a small delay to ensure the modal closes smoothly
    setTimeout(() => {
      router.reload(); // Reload all data
    }, 500);
  };

  // Add this function to open rating modal
  const handleOpenRatingModal = () => {
    setShowRatingModal(true);
  };

  // Add this function to close rating modal
  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };


  const handleMarkAsDone = async () => {
  if (confirm("Mark this transaction as done? This action will update the status.")) {
    try {
     await axios.post(route("marketplace.transaction.markAsDone", transaction.id));
      toast.success("Transaction marked as done successfully!");
      // Redirect to receipt page
      router.visit(route("marketplace.transaction.receipt", transaction.id));
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to mark transaction as done");
    }
  }
};

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <Head title="Finalize Transaction" />

        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {/* Sold Swine Warning */}
          {soldTransactionSwineCount > 0 && transaction.status !== "Completed" && transaction.status !== "Done" && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400">
                <p className="font-medium">Some items in this request have been sold to other buyers</p>
                <p className="text-[10px] sm:text-xs mt-1">
                  {soldTransactionSwineCount} out of {transactionSwineList.length} swine items are no longer available. 
                  These items have been excluded from calculations.
                </p>
                <p className="text-[10px] sm:text-xs mt-2 font-medium">
                  Current valid quantity: {validTransactionSwine.length} livestock
                </p>
              </div>
            </div>
          )}

          {/* Listing Deleted Message */}
          {isListingDeleted && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-600 dark:text-red-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                <span className="font-medium">Listing removed:</span> The seller has removed this listing. You can still view the details or delete this transaction.
              </p>
            </div>
          )}

          {/* Unavailable Message */}
          {isUnavailable && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-400">
                <span className="font-medium">Items unavailable:</span> The requested items are no longer available for purchase.
              </p>
            </div>
          )}

          {/* Transaction Stage Tracker */}
          {!isTerminalState && (
            <div className="relative px-4 sm:px-6 pt-4">
              <div className="relative">
                <div className="absolute top-4 left-[16px] right-[16px] h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className={`h-1 rounded-full transition-all duration-700 bg-sidebar-primary`}
                    style={{
                      width:
                        transaction.status === "Seller Review"
                          ? "0%"
                          : transaction.status === "Seller Approved"
                          ? "50%"
                          : transaction.status === "Buyer Confirmed" || transaction.status === "In Progress"
                          ? "75%"
                          : transaction.status === "Completed"
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between relative z-10">
                  {["Pending", "Approved", "Completed"].map((label, i) => {
                    const isActive =
                      (transaction.status === "Seller Review" && i === 0) ||
                      (transaction.status === "Seller Approved" && i <= 1) ||
                      (transaction.status === "Buyer Confirmed" && i <= 2) ||
                      (transaction.status === "In Progress" && i <= 2) ||
                      (transaction.status === "Completed" && i <= 3);

                    const isCurrent =
                      (transaction.status === "Seller Review" && i === 0) ||
                      (transaction.status === "Seller Approved" && i === 1) ||
                      (transaction.status === "Buyer Confirmed" && i === 2) ||
                      (transaction.status === "In Progress" && i === 2) ||
                      (transaction.status === "Completed" && i === 3);

                    return (
                      <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-sidebar-primary text-white border-sidebar-primary shadow-md"
                              : "bg-white dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-600"
                          } ${isCurrent ? "scale-110 ring-4 ring-sidebar-primary/30" : ""}`}
                        >
                          {isActive ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : i + 1}
                        </div>
                        <span
                          className={`mt-1 sm:mt-2 text-[10px] sm:text-sm font-medium ${
                            isActive ? "text-sidebar-primary dark:text-sidebar-primary" : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Status Message Boxes */}
          <div className="px-4 sm:px-6 mt-4">
            {transaction.status === "Seller Review" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg shadow-sm">
                <span className="text-base sm:text-xl">⏳</span>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Pending Approval</p>
                  <p className="text-[10px] sm:text-xs">Waiting for seller confirmation to proceed.</p>
                </div>
              </div>
            )}

            {transaction.status === "Seller Approved" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg shadow-sm">
                <span className="text-base sm:text-xl">📝</span>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Approved</p>
                  <p className="text-[10px] sm:text-xs">The transaction has been approved. Please confirm to proceed.</p>
                </div>
              </div>
            )}

            {transaction.status === "Buyer Confirmed" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg shadow-sm">
                <span className="text-base sm:text-xl">✅</span>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Confirmed</p>
                  <p className="text-[10px] sm:text-xs">You have confirmed this transaction. It is now in progress.</p>
                </div>
              </div>
            )}

            {transaction.status === "In Progress" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-400 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 px-3 py-2 rounded-lg shadow-sm">
                <span className="text-base sm:text-xl">🔄</span>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">In Progress</p>
                  <p className="text-[10px] sm:text-xs">This transaction is currently being processed.</p>
                </div>
              </div>
            )}

            {transaction.status === "Completed" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg shadow-sm">
                <span className="text-base sm:text-xl">✅</span>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Transaction Completed</p>
                  <p className="text-[10px] sm:text-xs">This transaction is finalized. All details are locked.</p>
                </div>
              </div>
            )}

            {transaction.status === "Cancelled" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-400 dark:border-rose-700 text-rose-700 dark:text-rose-400 px-3 py-2 rounded-lg shadow-sm">
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Transaction Cancelled</p>
                  <p className="text-[10px] sm:text-xs">This transaction has been cancelled and cannot be resumed.</p>
                </div>
              </div>
            )}

            {transaction.status === "Expired" && (
              <div className="flex items-start gap-2 sm:gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-400 px-3 py-2 rounded-lg shadow-sm">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Transaction Expired</p>
                  <p className="text-[10px] sm:text-xs">This transaction has expired due to inactivity.</p>
                </div>
              </div>
            )}
          </div>
     {/* Message for Listing Deleted */}
          {isListingDeleted && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mx-4 sm:mx-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-400 text-xs sm:text-sm">Listing Unavailable</h4>
                  <p className="text-[10px] sm:text-xs text-red-600 dark:text-red-500 mt-1">
                    The seller has removed this listing. You can still message the seller or delete this transaction.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message for Unavailable */}
          {isUnavailable && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg mx-4 sm:mx-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-700 dark:text-orange-400 text-xs sm:text-sm">Items No Longer Available</h4>
                  <p className="text-[10px] sm:text-xs text-orange-600 dark:text-orange-500 mt-1">
                    The items in this transaction are no longer available.
                  </p>
                </div>
              </div>
            </div>
            
          )}
         {(transaction.status === "Completed" || transaction.status === "Done") && (
  <div className=" p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                existingRating && existingRating.rating >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {existingRating 
            ? `You rated ${existingRating.rating} stars${existingRating.comment ? ' • Review left' : ''}`
            : "Rate your experience"}
        </span>
      </div>
      <Button
        onClick={handleOpenRatingModal}
        className={`${
          existingRating
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
        } text-white text-sm`}
      >
        {existingRating ? "Edit Rating" : "Leave a Rating"}
      </Button>
    </div>
    {existingRating?.comment && (
      <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
          "{existingRating.comment}"
        </p>
      </div>
    )}
  </div>
)}

{showRatingModal && (
  <RatingModal
    isOpen={showRatingModal}
    onClose={handleCloseRatingModal}
    transactionId={transaction.id}
    sellerName={transaction.seller_name}
    existingRating={existingRating}
    onRatingSubmitted={handleRatingSubmitted}
  />
)}
     

          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">

            
            <div>
              <span className="font-semibold text-chart-5 dark:text-gray-200 text-sm sm:text-base">
                {transaction.buyer_name}
              </span>
              <span className="text-chart-5 dark:text-gray-400 text-xs sm:text-sm sm:ml-2">
                {getStatusMessage(transaction.status)}
              </span>
              {soldTransactionSwineCount > 0 && transaction.status !== "Completed" && transaction.status !== "Done" && (
                <Badge className="ml-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 text-[10px] sm:text-xs">
                  {validTransactionSwine.length}/{transactionSwineList.length} valid
                </Badge>
              )}
            </div>

            <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
              {!isListingDeleted && transaction.listing_id && (
                <Button
                  className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 p-1.5 sm:p-2 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm"
                  onClick={() => window.open(`/marketplace/${transaction.listing_id}`, '_blank')}
                >
                  <Tag className="w-3 h-3 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">View Listing</span>
                </Button>
              )}
              {!isUnavailable && !isListingDeleted && (
                <Button
                  className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 p-1.5 sm:p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm"
                  onClick={() => window.open(`/marketplace/profile/${transaction.seller_id}`, '_blank')}
                >
                  <User className="w-3 h-3 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Visit Profile</span>
                </Button>
              )}

              {!isUnavailable && !isListingDeleted && (
                <Button
                  className="bg-gray-100 dark:bg-gray-700 border text-gray-600 dark:text-gray-300 p-1.5 sm:p-2 rounded-xl hover:bg-sidebar-primary/50 hover:text-white flex items-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm"
                  onClick={async () => {
                    try {
                      const res = await axios.post("/conversations/start", {
                        receiver_id: transaction.seller_id,
                        listing_id: transaction.listing_id,
                        listing_swine_ids: transactionSwineList.map((s) => s.listing_swine_id),
                      });

                      const conversation = res.data.data;
                      router.visit(
                        `/messenger?conversation=${conversation.id}&listing=${transaction.listing_id}`
                      );
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to start conversation.");
                    }
                  }}
                >
                  <MessageCircleMore className="w-3 h-3 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Message Seller</span>
                </Button>
              )}
            </div>
          </header>

          <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
            
            {/* Transaction Summary */}
            <div className={`bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 p-2 sm:p-4 shadow-sm ${
              isUnavailable || isListingDeleted ? 'opacity-75' : ''
            }`}>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                
                <h3 className="text-sm sm:text-base font-semibold text-chart-5 dark:text-gray-200">
                  Request Summary
                  <span className="text-[10px] sm:text-sm ml-2 text-chart-5 dark:text-gray-400">Transaction #{transaction.id}</span>
                </h3>
                
               {soldTransactionSwineCount > 0 && transaction.status !== "Completed" && transaction.status !== "Done" && (
                  <div className="mt-1 md:mt-0">
                    <Badge className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 text-[10px] sm:text-xs">
                      Valid quantity: {validTransactionSwine.length} items
                    </Badge>
                  </div>
                )}
                
                {transaction.contact && !isUnavailable && !isListingDeleted && (
                  <div className="flex items-center gap-2 mt-1 md:mt-0">
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mr-1">Contact Seller:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCall(transaction.contact, transaction.seller_name)}
                      className="flex items-center gap-0.5 sm:gap-1 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
                    >
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Call</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleText(transaction.contact, transaction.seller_name)}
                      className="flex items-center gap-0.5 sm:gap-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
                    >
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Text</span>
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm">
                {/* Left Column */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Seller:</span> {transaction.seller_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300 break-all">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Email:</span>{" "}
                      <a href={`mailto:${transaction.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {transaction.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Contact:</span>{" "}
                      <span className="font-mono text-[10px] sm:text-xs">{formatPhoneNumber(transaction.contact)}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Address:</span> {transaction.address}
                    </span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Request Date:</span> {transaction.transaction_date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex items-center justify-center">
                      <span className="text-[8px] sm:text-xs font-bold">#</span>
                    </div>
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Status:</span>{" "}
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded-md text-[9px] sm:text-xs font-medium ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Request Type:</span> {transaction.request_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Price Label:</span> {transaction.price_label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Quantity:</span>{" "}
                      <span className="text-chart-5 dark:text-gray-200">
                        {validTransactionSwine.length} Livestock
                       {soldTransactionSwineCount > 0 && transaction.status !== "Completed" && transaction.status !== "Done" && (
                          <span className="text-[9px] sm:text-xs text-yellow-600 dark:text-yellow-500 ml-1">
                            ({soldTransactionSwineCount} sold item{soldTransactionSwineCount > 1 ? 's' : ''} excluded)
                          </span>
                        )}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Your Offer:</span>{" "}
                      <span className="text-chart-5 dark:text-gray-200"> ₱{Number(transaction?.offer_amount).toLocaleString()} </span>
                      <span className="text-chart-5 dark:text-gray-400 text-[9px] sm:text-xs ml-1"> {transaction.price_label} </span>
                    </span>
                  </div>
                  
                  {/* Price per Unit with Edit Button */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <span className="dark:text-gray-300">
                        <span className="font-semibold text-chart-5/70 dark:text-gray-400">Price per Unit:</span>{" "}
                        <span className="text-chart-5 dark:text-gray-200"> ₱{transaction.price_per_unit.toLocaleString()} </span>
                        <span className="text-chart-5 dark:text-gray-400 text-[9px] sm:text-xs ml-1"> /{transaction.price_unit_type} original </span>
                      </span>
                      
                      {!isTerminalState && !isUnavailable && !isListingDeleted && canEditPrice && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditedPricePerUnit(transaction.price_per_unit);
                            setEditedPriceUnitType(transaction.price_unit_type);
                            setShowPriceModal(true);
                          }}
                          className="h-6 sm:h-7 px-1.5 sm:px-2 text-[9px] sm:text-xs text-sidebar-primary border-sidebar-primary/30 hover:bg-sidebar-primary/10"
                        >
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </Button>
                      )}
                    </span>
                  </div>
                  
                  {/* Total Weight */}
                  {transaction.price_unit_type === 'per_kg' && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="dark:text-gray-300">
                        <span className="font-semibold text-chart-5/70 dark:text-gray-400">Total Weight:</span>{" "}
                        <span className="text-chart-5 dark:text-gray-200"> 
                          {validTransactionTotalWeight.toFixed(2)} kg 
                          {localValidTransactionTotalWeight !== validTransactionTotalWeight && (
                            <span className="text-[9px] sm:text-xs text-green-600 dark:text-green-500 ml-1">(updated)</span>
                          )}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Subtotal:</span>{" "}
                      <span className="text-chart-5 dark:text-gray-200 text-[10px] sm:text-xs">
                        {transaction.price_unit_type === 'per_kg' ? (
                          <>₱{transaction.price_per_unit.toLocaleString()} × {validTransactionTotalWeight.toFixed(2)} kg</>
                        ) : (
                          <>
                            {validTransactionSwine.some(item => item.final_amount && item.final_amount > 0) ? (
                              <span className="text-[9px] sm:text-xs">
                                {validTransactionSwine.map((item, idx) => (
                                  <span key={idx}>
                                    {idx > 0 && ' + '}
                                    ₱{(item.final_amount || 0).toLocaleString()}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <>₱{transaction.price_per_unit.toLocaleString()} × {validTransactionSwine.length} head</>
                            )}
                          </>
                        )}
                      </span>
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex items-center gap-2 border-t pt-1 sm:pt-2 mt-1 border-gray-200 dark:border-gray-700">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-chart-5/70 dark:text-gray-400">Total:</span>{" "}
                      <span className="text-primary font-bold text-sm sm:text-base md:text-lg">
                        ₱{validTransactionTotalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        {localValidTransactionTotalAmount !== validTransactionTotalAmount && (
                          <span className="text-[9px] sm:text-xs text-green-600 dark:text-green-500 ml-1">(updated)</span>
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Swine Button */}
            {canAddSwine && !isTerminalState && !isUnavailable && !isListingDeleted && (
              <div className="mb-2 sm:mb-4 flex justify-end">
                {!isAddingSwine ? (
                  <Button
                    onClick={() => setIsAddingSwine(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add More Swine
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setIsAddingSwine(false);
                        setSelectedSwineToAdd([]);
                      }}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSwine}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3"
                      disabled={selectedSwineToAdd.length === 0}
                    >
                      Add Selected ({selectedSwineToAdd.length})
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* All Swine List Table */}
            {all_swine_list && all_swine_list.length > 0 && !isListingDeleted && !isUnavailable && (
              <div className="mt-4 sm:mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 p-2 sm:p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-semibold text-chart-5 dark:text-gray-200">
                    All Livestock in Listing
                    <span className="text-[10px] sm:text-xs ml-1 sm:ml-2 text-gray-500 dark:text-gray-400 font-normal">
                      (Highlighted rows are in this request)
                    </span>
                  </h3>
                  <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-[10px] sm:text-xs w-fit">
                    {validTransactionSwine.length} valid • {all_swine_list.length} total
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-[10px] sm:text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        {isAddingSwine && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 w-8 sm:w-12">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                              checked={selectedSwineToAdd.length === localSwineList.filter(
                                item => item.status === 'available' && !item.is_in_transaction
                              ).length}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const availableNotInTransaction = localSwineList
                                    .filter(item => item.status === 'available' && !item.is_in_transaction)
                                    .map(item => item.listing_swine_id);
                                  setSelectedSwineToAdd(availableNotInTransaction);
                                } else {
                                  setSelectedSwineToAdd([]);
                                }
                              }}
                            />
                          </th>
                        )}
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">ID</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Sex</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Breed</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Age</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Notes</th>
                        {transaction.price_unit_type === 'per_head' && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Final Amount</th>
                        )}
                        {transaction.price_unit_type === 'per_kg' && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Weight (kg)</th>
                        )}
                        {!isAddingSwine && !isTerminalState && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {localSwineList.map((item, index) => {
                        const isInTransaction = item.is_in_transaction;
                        const isSold = item.status === 'sold';
                        const canBeAdded = item.status === 'available' && !isInTransaction;
                        
                        let noteMessage = "";
                        let noteColor = "text-gray-600 dark:text-gray-400";
                        let noteIcon = null;
                        
                        if (item.status === 'available') {
                          noteMessage = "Available";
                          noteColor = "text-green-600 dark:text-green-400";
                        } else if (item.status === 'reserved') {
                          noteMessage = "Reserved";
                          noteColor = "text-yellow-600 dark:text-yellow-500";
                        } else if (item.status === 'sold_pending') {
                          noteMessage = "Pending to sold";
                          noteColor = "text-orange-600 dark:text-orange-500";
                        } else if (item.status === 'removed') {
                          noteMessage = "This list is unavailable";
                          noteColor = "text-red-600 dark:text-red-400";
                          noteIcon = <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />;
                       } else if (item.status === 'sold') {
  if (transaction.status === "Completed" || transaction.status === "Done") {
    noteMessage = "Sold to you";
    noteColor = "text-green-600 dark:text-green-400";
    noteIcon = <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />;
  } else {
    noteMessage = "Sold out";
    noteColor = "text-gray-500 dark:text-gray-500";
    noteIcon = <XCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />;
  }
}
                        return (
                          <tr 
                            key={item.listing_swine_id} 
                            className={`
                              text-center border-t transition-colors dark:border-gray-700
                              ${isInTransaction ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                            ${isSold && transaction.status !== "Completed" && transaction.status !== "Done" ? 'opacity-60' : ''}
                              ${isInTransaction ? 'border-l-4 border-l-green-500' : ''}
                            `}
                          >
                            {isAddingSwine && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {canBeAdded && (
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    checked={selectedSwineToAdd.includes(item.listing_swine_id)}
                                    onChange={() => toggleSwineSelection(item.listing_swine_id)}
                                  />
                                )}
                               </td>
                            )}
                            
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 font-mono text-[9px] sm:text-xs dark:text-gray-300">
                              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                                #{item.listing_swine_id}
                              </div>
                            </td>
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 dark:text-gray-300">{item.sex}</td>
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 dark:text-gray-300">{item.breed}</td>
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 dark:text-gray-300">{item.age_days}</td>
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                              <div className={`flex items-center justify-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs ${noteColor}`}>
                                {noteIcon}
                                <span>{noteMessage}</span>
                              </div>
                            </td>
                            
                            {transaction.price_unit_type === 'per_head' && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && item.status === 'available' ? (
                                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <div className="relative">
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[9px] sm:text-xs">₱</span>
                                      <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.final_amount || ''}
                                        onChange={(e) => handleFinalAmountChange(index, e.target.value)}
                                        className="w-16 sm:w-24 pl-5 sm:pl-6 text-center text-[9px] sm:text-xs"
                                        placeholder="Amount"
                                      />
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => saveFinalAmount(item.listing_swine_id, item.final_amount || null)}
                                      className="text-[9px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : isInTransaction ? (
                                  <span className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-xs">
                                    {item.final_amount ? `₱${item.final_amount.toLocaleString()}` : '—'}
                                  </span>
                                ) : (
                                  <span className="text-gray-300 dark:text-gray-600">—</span>
                                )}
                              </td>
                            )}

                            {transaction.price_unit_type === 'per_kg' && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && item.status === 'available' ? (
                                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={item.weight || ""}
                                      onChange={(e) => handleWeightChange(index, e.target.value)}
                                      className="w-14 sm:w-20 text-center text-[9px] sm:text-xs"
                                    />
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => saveWeight(item.listing_swine_id, Number(item.weight))}
                                      className="text-[9px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : isInTransaction ? (
                                  <span className="text-[9px] sm:text-xs dark:text-gray-300">{typeof item.weight === 'number' ? item.weight.toFixed(2) : item.weight} kg</span>
                                ) : (
                                  <span className="text-gray-300 dark:text-gray-600">—</span>
                                )}
                              </td>
                            )}
                            
                            {!isAddingSwine && !isTerminalState && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRemoveSwine(item.listing_swine_id)}
                                    className="bg-red-500 hover:bg-red-600 text-white text-[9px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2"
                                    title={item.status === 'sold' ? "This item was sold to another buyer - you can remove it" : "Remove from transaction"}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Quick Contact Card */}
            {!isTerminalState && transaction.contact && (
              <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-blue-700 dark:text-blue-400">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">Quick Contact Seller:</span>
                  <span className="font-mono text-[9px] sm:text-xs">{formatPhoneNumber(transaction.contact)}</span>
                  <div className="flex gap-1 ml-0 sm:ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCall(transaction.contact, transaction.seller_name)}
                      className="h-5 sm:h-7 px-1 sm:px-2 text-[8px] sm:text-xs text-green-600 dark:text-green-400 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" /> Call
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleText(transaction.contact, transaction.seller_name)}
                      className="h-5 sm:h-7 px-1 sm:px-2 text-[8px] sm:text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" /> Text
                    </Button>
                  </div>
                </div>
              </div>
            )}

           <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
  {/* Show Cancel button only for non-terminal states */}
  {!isTerminalState && (
    <Button
      variant="destructive"
      onClick={async () => {
        if (confirm("Are you sure you want to cancel this request?")) {
          try {
            await axios.post(route("marketplace.transaction.cancel", transaction.id));
            toast.success("Transaction cancelled successfully.");
            router.reload();
          } catch {
            toast.error("Failed to cancel request.");
          }
        }
      }}
      className="text-xs sm:text-sm"
    >
      Cancel Request
    </Button>
  )}

  {/* For Completed status - show Done button */}
  {transaction.status === "Completed" && (
    <Button
      onClick={handleMarkAsDone}
      className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
    >
      Done
    </Button>
  )}

  {/* For Done status - show View Receipt link/button */}
  {transaction.status === "Done" && (
    <Button
      variant="outline"
      onClick={() => router.visit(route("marketplace.transaction.receipt", transaction.id))}
      className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 text-xs sm:text-sm"
    >
      View Receipt
    </Button>
  )}

  {/* For other terminal states - show Delete button */}
  {(transaction.status === "Cancelled" || transaction.status === "Unavailable" || transaction.status === "Listing Deleted") && (
    <Button
      variant="outline"
      onClick={async () => {
        if (
          confirm(
            "Are you sure you want to delete this transaction permanently? This cannot be undone."
          )
        ) {
          try {
            router.delete(route("marketplace.transaction.delete", transaction.id));
          } catch {
            toast.error("Failed to delete transaction.");
          }
        }
      }}
      className="text-xs sm:text-sm"
    >
      Delete Transaction
    </Button>
  )}
</div>

            <div className="flex justify-end gap-2 sm:gap-3 mt-2">
              {transaction.status === "Buyer Confirmed" && (
                <Button type="submit" disabled={processing} className="text-xs sm:text-sm">
                  Approve Transaction
                </Button>
              )}
            </div>

            
          </CardContent>
        </Card>

        {/* Price Edit Modal */}
        {showPriceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full overflow-hidden">
              <div className="bg-sidebar-primary text-white px-3 sm:px-4 py-2 sm:py-3">
                <h3 className="text-sm sm:text-base font-semibold">Update Price</h3>
                <p className="text-[9px] sm:text-xs text-green-100 mt-0.5">
                  Change price and pricing unit
                </p>
              </div>

              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    ₱{transaction.price_per_unit.toLocaleString()}
                    <span className="text-[9px] sm:text-xs font-normal text-gray-500 ml-2">/{transaction.price_unit_type}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Price per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] sm:text-sm">₱</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editedPricePerUnit}
                      onChange={(e) => setEditedPricePerUnit(parseFloat(e.target.value) || 0)}
                      className="w-full pl-6 sm:pl-7 pr-3 py-1.5 text-xs sm:text-sm"
                      placeholder="Enter price"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pricing Unit
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditedPriceUnitType('per_head')}
                      className={`
                        flex flex-col items-center py-1.5 sm:py-2 px-1 rounded-md border transition-all
                        ${editedPriceUnitType === 'per_head' 
                          ? 'border-sidebar-primary bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className={`text-[10px] sm:text-xs font-medium ${
                        editedPriceUnitType === 'per_head' ? 'text-sidebar-primary' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        Per Head
                      </span>
                      <span className={`text-[8px] sm:text-[9px] mt-0.5 ${
                        editedPriceUnitType === 'per_head' ? 'text-sidebar-primary/70' : 'text-gray-500'
                      }`}>
                        Fixed per animal
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditedPriceUnitType('per_kg')}
                      className={`
                        flex flex-col items-center py-1.5 sm:py-2 px-1 rounded-md border transition-all
                        ${editedPriceUnitType === 'per_kg' 
                          ? 'border-sidebar-primary bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className={`text-[10px] sm:text-xs font-medium ${
                        editedPriceUnitType === 'per_kg' ? 'text-sidebar-primary' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        Per Kg
                      </span>
                      <span className={`text-[8px] sm:text-[9px] mt-0.5 ${
                        editedPriceUnitType === 'per_kg' ? 'text-sidebar-primary/70' : 'text-gray-500'
                      }`}>
                        Based on weight
                      </span>
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                  <p className="text-[9px] sm:text-xs text-green-700 dark:text-green-300 font-medium mb-1">Preview</p>
                  <p className="text-xs sm:text-sm text-sidebar-primary font-medium">
                    ₱{editedPricePerUnit.toLocaleString()} /{editedPriceUnitType}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-green-600 dark:text-green-400 mt-1">
                    {editedPriceUnitType === 'per_kg' 
                      ? 'Total = price × total weight'
                      : 'Total = sum of final amounts or price × quantity'
                    }
                  </p>
                </div>
              </div>

              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPriceModal(false)}
                  className="h-7 sm:h-8 px-2 sm:px-3 text-[10px] sm:text-xs border-gray-300 dark:border-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpdatePrice}
                  className="h-7 sm:h-8 px-2 sm:px-3 text-[10px] sm:text-xs bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
                >
                  Update Price
                </Button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </AppLayout>
  );
};

export default TransactionSetup;