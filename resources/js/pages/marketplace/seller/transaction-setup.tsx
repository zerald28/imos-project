import React, { useState, useEffect, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AppLayout from "@/layouts/app-layout";
import { route } from "ziggy-js";
import { cn } from "@/lib/utils";
import axios from "axios";
import { router } from "@inertiajs/react";
import { 
  Check, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  User, 
  Calendar, 
  Tag,
  MessageCircleMore,
  AlertCircle,
  XCircle,
  Trash2,
  Badge,
  FileText,
  Save,
  Star
} from "lucide-react";
import { Label } from "@/components/ui/label";

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
  sold_in_transaction_count?: number;
  listing_title?: string;
  // Add rating properties
  has_rating?: boolean;
  rating?: {
    rating: number;
    comment: string;
    created_at?: string;
  } | null;
};

type SwineItem = {
  listing_swine_id: number;
  sex: string;
  breed: string;
  age_days: string;
  weight: string | number;
  status: string;
  status_display: string;
  is_in_transaction: boolean;
  final_amount?: number | null;
};

type Props = {
  transaction: Transaction;
  all_swine_list: SwineItem[];
  transaction_swine_ids: number[];
};

const TransactionSetup: React.FC<Props> = ({ 
  transaction, 
  all_swine_list, 
  transaction_swine_ids 
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(
    transaction.offer_amount || transaction.price_per_unit
  );

  const [localSwineList, setLocalSwineList] = useState(all_swine_list);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editedPricePerUnit, setEditedPricePerUnit] = useState(transaction.price_per_unit);
  const [editedPriceUnitType, setEditedPriceUnitType] = useState(transaction.price_unit_type);

  const [unsavedChanges, setUnsavedChanges] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLocalSwineList(all_swine_list);
  }, [all_swine_list]);

  const transactionSwineList = useMemo(() => {
    return localSwineList.filter(item => item.is_in_transaction);
  }, [localSwineList]);

  // Check if transaction is finalized (completed or done)
  const isFinalized = useMemo(() => {
    return transaction.status === "Completed" || transaction.status === "Done";
  }, [transaction.status]);

  const validTransactionSwine = useMemo(() => {
    if (isFinalized) {
      return transactionSwineList;
    }
    return transactionSwineList.filter(item => item.status !== 'sold');
  }, [transactionSwineList, isFinalized]);

  const soldInTransactionCount = useMemo(() => {
    return transactionSwineList.filter(item => item.status === 'sold').length;
  }, [transactionSwineList]);

  const validTotalWeight = useMemo(() => {
    return validTransactionSwine.reduce((sum, item) => {
      const weight = typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0;
      return sum + weight;
    }, 0);
  }, [validTransactionSwine]);

  const calculatedTotal = useMemo(() => {
    if (transaction.price_unit_type === 'per_kg') {
      return transaction.price_per_unit * validTotalWeight;
    } else {
      const hasFinalAmounts = validTransactionSwine.some(item => item.final_amount && item.final_amount > 0);
      
      if (hasFinalAmounts) {
        return validTransactionSwine.reduce((sum, item) => {
          const amount = item.final_amount ? Number(item.final_amount) : 0;
          return sum + amount;
        }, 0);
      } else {
        return transaction.price_per_unit * validTransactionSwine.length;
      }
    }
  }, [transaction.price_per_unit, transaction.price_unit_type, validTransactionSwine, validTotalWeight]);

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
    const item = localSwineList[index];
    const newValue = value ? parseFloat(value) : null;
    
    const updated = [...localSwineList];
    updated[index].final_amount = newValue;
    setLocalSwineList(updated);
    
    setUnsavedChanges(prev => ({
      ...prev,
      [item.listing_swine_id]: true
    }));
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

  const saveSingleFinalAmount = async (listing_swine_id: number, finalAmount: number | null) => {
    try {
      await axios.post(route("marketplace.transaction.updateFinalAmount", listing_swine_id), {
        final_amount: finalAmount,
      });
      
      setLocalSwineList(prevList => 
        prevList.map(item => 
          item.listing_swine_id === listing_swine_id 
            ? { ...item, final_amount: finalAmount } 
            : item
        )
      );
      
      setUnsavedChanges(prev => ({
        ...prev,
        [listing_swine_id]: false
      }));
      
      toast.success("Final amount updated!");
    } catch {
      toast.error("Failed to update final amount");
    }
  };

  const saveAllFinalAmounts = async () => {
    const itemsToSave = validTransactionSwine.filter(item => item.status === 'available');

    if (itemsToSave.length === 0) {
      toast.info("No items to save");
      return;
    }

    setIsSavingAll(true);
    let successCount = 0;
    let errorCount = 0;

    for (const item of itemsToSave) {
      try {
        const finalAmount = item.final_amount ?? selectedAmount;
        
        await axios.post(route("marketplace.transaction.updateFinalAmount", item.listing_swine_id), {
          final_amount: finalAmount,
        });
        
        setUnsavedChanges(prev => ({
          ...prev,
          [item.listing_swine_id]: false
        }));
        
        successCount++;
      } catch (error) {
        console.error(`Failed to save item ${item.listing_swine_id}:`, error);
        errorCount++;
      }
    }

    setIsSavingAll(false);

    if (errorCount === 0) {
      toast.success(`All ${successCount} final amounts saved successfully!`);
      router.reload({ only: ['all_swine_list'] });
    } else {
      toast.error(`Saved ${successCount} items, failed to save ${errorCount} items`);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("marketplace.transaction.approve", transaction.id), {
      onSuccess: () => toast.success("Transaction approved successfully!"),
      onError: () => toast.error("Failed to approve transaction."),
    });
  };

  // Updated to include 'Done' status
  const isCompleted = transaction.status === "Completed" || transaction.status === "Done";
  const isPerKg = transaction.price_unit_type === 'per_kg';
  const canModify = !isCompleted && ["Seller Review", "Seller Approved"].includes(transaction.status);
  const canEditPrice = !isCompleted && ["Seller Review", "Seller Approved"].includes(transaction.status);

  const hasUnsavedChanges = useMemo(() => {
    return Object.values(unsavedChanges).some(value => value === true);
  }, [unsavedChanges]);

  const handleCall = () => {
    if (transaction.contact) {
      const phoneNumber = transaction.contact.replace(/\D/g, '');
      window.location.href = `tel:${phoneNumber}`;
      toast.info(`Calling ${transaction.buyer_name}...`);
    } else {
      toast.error("No contact number available");
    }
  };

  const handleText = () => {
    if (transaction.contact) {
      const phoneNumber = transaction.contact.replace(/\D/g, '');
      const message = `Hi ${transaction.buyer_name}! Regarding transaction #${transaction.id} for ${validTransactionSwine.length} swine(s). Total amount: ₱${calculatedTotal.toLocaleString()}.`;
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      toast.info(`Opening SMS to ${transaction.buyer_name}...`);
    } else {
      toast.error("No contact number available");
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return phone;
  };

  const getStatusMessage = (status: string) => {
    const statusMessages: Record<string, string> = {
      "Seller Review": "Pending Review",
      "Seller Approved": "Approved",
      "Buyer Confirmed": "Awaiting Confirmation",
      "Completed": "Completed",
      "Done": "Done",
      "Cancelled": "Cancelled",
    };
    return statusMessages[status] || status;
  };

  const getStatusNote = (item: SwineItem) => {
    if (!item.is_in_transaction) return null;
    
    if (item.status === 'sold' && !isCompleted) {
      return {
        message: "Sold to another buyer",
        color: "text-gray-500 dark:text-gray-400",
        icon: <XCircle className="h-3 w-3 mr-1" />
      };
    }
    return null;
  };

  // Get progress percentage for the tracker
  const getProgressPercentage = () => {
    switch (transaction.status) {
      case "Seller Review":
        return "0%";
      case "Seller Approved":
        return "33%";
      case "Buyer Confirmed":
        return "66%";
      case "Completed":
      case "Done":
        return "100%";
      default:
        return "0%";
    }
  };

  // Get stage index for active/current determination
  const getStageIndex = (status: string): number => {
    switch (status) {
      case "Seller Review":
        return 0;
      case "Seller Approved":
        return 1;
      case "Buyer Confirmed":
        return 2;
      case "Completed":
      case "Done":
        return 3;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(transaction.status);
  const stages = ["Pending", "Approved", "Confirmed", "Finalized"];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <Head title="Finalize Transaction" />

        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {/* Sold Items Warning */}
          {soldInTransactionCount > 0 && !isCompleted && (
            <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400">
                <p className="font-medium">Some items in this transaction have been sold to other buyers</p>
                <p className="text-[10px] sm:text-xs mt-1">
                  {soldInTransactionCount} out of {transactionSwineList.length} swine items are no longer available.
                  These items have been excluded from calculations.
                </p>
                <p className="text-[10px] sm:text-xs mt-2 font-medium">
                  Current valid quantity: {validTransactionSwine.length} livestock
                </p>
              </div>
            </div>
          )}

          {/* Header with Buyer Name and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-chart-5 dark:text-gray-200">
                Transaction with {transaction.buyer_name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {getStatusMessage(transaction.status)} • Transaction #{transaction.id}
                {soldInTransactionCount > 0 && !isCompleted && (
                  <span className="ml-2 text-yellow-600 dark:text-yellow-500">
                    ({validTransactionSwine.length}/{transactionSwineList.length} valid)
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 flex items-center gap-2 transition-all text-xs sm:text-sm"
                onClick={() => window.open(`/marketplace/profile/${transaction.buyer_id}`, '_blank')}
              >
                <User className="w-4 h-4" /> Visit Profile
              </Button>

              <Button
                className="bg-gray-100 dark:bg-gray-700 border text-gray-600 dark:text-gray-300 p-2 rounded-xl hover:bg-sidebar-primary/50 hover:text-white flex items-center gap-2 transition-all text-xs sm:text-sm"
                onClick={async () => {
                  try {
                    const res = await axios.post("/conversations/start", {
                      receiver_id: transaction.buyer_id,
                      listing_id: transaction.listing_id,
                      listing_swine_ids: validTransactionSwine.map((s) => s.listing_swine_id),
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
                <MessageCircleMore className="w-4 h-4" /> Message Buyer
              </Button>
            </div>
          </div>

          {/* Transaction Stage Tracker - Updated for 4 stages */}
          <div className="relative px-4 sm:px-6 pt-4">
            <div className="relative">
              <div className="absolute top-4 left-[16px] right-[16px] h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className={`h-1 rounded-full transition-all duration-700 bg-sidebar-primary`}
                  style={{ width: getProgressPercentage() }}
                />
              </div>

              <div className="flex items-center justify-between relative z-10">
                {stages.map((label, i) => {
                  const isActive = i <= currentStageIndex;
                  const isCurrent = i === currentStageIndex;

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

            {/* Status Message Box */}
            <div className="mt-2 sm:mt-6">
              {transaction.status === "Seller Review" && (
                <div className="flex items-start gap-2 sm:gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-400 dark:border-amber-700 text-amber-700 dark:text-amber-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Pending Your Approval</p>
                    <p className="text-[10px] sm:text-xs">
                      Please review the transaction details and approve or contact the buyer.
                    </p>
                  </div>
                </div>
              )}

              {transaction.status === "Seller Approved" && (
                <div className="flex items-start gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Approved - Awaiting Buyer Confirmation</p>
                    <p className="text-[10px] sm:text-xs">
                      You have approved this transaction. Waiting for the buyer to confirm.
                    </p>
                  </div>
                </div>
              )}

              {transaction.status === "Buyer Confirmed" && (
                <div className="flex items-start gap-2 sm:gap-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Buyer Confirmed - In Progress</p>
                    <p className="text-[10px] sm:text-xs">
                      The buyer has confirmed. You can now complete the transaction.
                    </p>
                  </div>
                </div>
              )}

              {(transaction.status === "Completed" || transaction.status === "Done") && (
                <div className="flex items-start gap-2 sm:gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Transaction {transaction.status === "Done" ? "Done" : "Completed"}</p>
                    <p className="text-[10px] sm:text-xs">
                      This transaction is finalized. All details are locked.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rating Display Section - Show if transaction is completed or done */}
          {(transaction.status === "Completed" || transaction.status === "Done") && (
            <div className="mx-4 sm:mx-6 mt-0 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          transaction.rating && transaction.rating.rating >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="ml-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {transaction.has_rating 
                        ? `${transaction.buyer_name} rated you ${transaction.rating?.rating} star${transaction.rating?.rating !== 1 ? 's' : ''}`
                        : "No rating yet"}
                    </span>
                    {transaction.has_rating && transaction.rating?.created_at && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rated on {new Date(transaction.rating.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {!transaction.has_rating && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Buyer will rate after transaction
                  </div>
                )}
              </div>
              {transaction.rating?.comment && (
                <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Review:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic mt-1">
                    "{transaction.rating.comment}"
                  </p>
                </div>
              )}
            </div>
          )}

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Buyer + Transaction Info with Contact Actions */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-chart-5 dark:text-gray-200">
                  Transaction Details
                </h3>
                
                {transaction.contact && !isCompleted && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Contact Buyer:
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCall}
                      className="flex items-center gap-1 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-xs"
                    >
                      <Phone className="h-3 w-3" />
                      <span className="hidden sm:inline">Call</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleText}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span className="hidden sm:inline">Text</span>
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Buyer:</span>{" "}
                      {transaction.buyer_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Email:</span>{" "}
                      <a href={`mailto:${transaction.email}`} className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                        {transaction.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Contact:</span>{" "}
                      <span className="font-mono text-xs">{formatPhoneNumber(transaction.contact)}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Address:</span>{" "}
                      {transaction.address}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Request Type:</span>{" "}
                      {transaction.request_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Quantity:</span>{" "}
                      <span className="text-chart-5 dark:text-gray-200">
                        {validTransactionSwine.length} Livestock
                        {soldInTransactionCount > 0 && !isCompleted && (
                          <span className="text-[10px] text-yellow-600 dark:text-yellow-500 ml-1">
                            ({soldInTransactionCount} sold excluded)
                          </span>
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="dark:text-gray-300">
                      <span className="font-semibold text-chart-5 dark:text-gray-200">Request Date:</span>{" "}
                      {transaction.transaction_date}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="dark:text-gray-300">
                        <span className="font-semibold text-chart-5 dark:text-gray-200">Price per Unit:</span>{" "}
                        ₱{transaction.price_per_unit.toLocaleString()}/{transaction.price_unit_type}
                      </span>
                      {canEditPrice && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditedPricePerUnit(transaction.price_per_unit);
                            setEditedPriceUnitType(transaction.price_unit_type);
                            setShowPriceModal(true);
                          }}
                          className="h-6 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-xs text-sidebar-primary border-sidebar-primary/30 hover:bg-sidebar-primary/10"
                        >
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </Button>
                      )}
                    </span>
                  </div>
                  {isPerKg && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="dark:text-gray-300">
                        <span className="font-semibold text-chart-5 dark:text-gray-200">Total Weight:</span>{" "}
                        {validTotalWeight.toFixed(2)} kg
                        {validTotalWeight !== transaction.total_weight && (
                          <span className="text-[10px] text-green-600 dark:text-green-500 ml-1">(updated)</span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* All Swine List Table */}
            {localSwineList && localSwineList.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-semibold text-chart-5 dark:text-gray-200">
                    All Livestock in Listing
                    <span className="text-[10px] sm:text-xs ml-1 sm:ml-2 text-gray-500 dark:text-gray-400 font-normal">
                      (Highlighted rows are in this request)
                    </span>
                  </h3>
                  <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-[10px] sm:text-xs w-fit">
                    {validTransactionSwine.length} valid • {localSwineList.length} total
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-[10px] sm:text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">ID</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Sex</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Breed</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Age</th>
                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Notes</th>
                        {!isPerKg && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Final Amount</th>
                        )}
                        {isPerKg && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Weight (kg)</th>
                        )}
                        {canModify && (
                          <th className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {localSwineList.map((item, index) => {
                        const isInTransaction = item.is_in_transaction;
                        const statusNote = getStatusNote(item);
                        const hasUnsaved = unsavedChanges[item.listing_swine_id];
                        
                        let noteMessage = item.status_display;
                        let noteColor = "text-gray-600 dark:text-gray-400";
                        let noteIcon = null;
                        
                        if (item.status === 'available') {
                          noteColor = "text-green-600 dark:text-green-400";
                        } else if (item.status === 'reserved') {
                          noteColor = "text-yellow-600 dark:text-yellow-500";
                        } else if (item.status === 'sold') {
                          if (isCompleted) {
                            noteMessage = "Sold";
                            noteColor = "text-gray-600 dark:text-gray-400";
                          } else if (isInTransaction) {
                            noteMessage = "Sold to another buyer";
                            noteColor = "text-gray-500 dark:text-gray-500";
                            noteIcon = <XCircle className="h-3 w-3 mr-1" />;
                          } else {
                            noteMessage = "Sold";
                            noteColor = "text-gray-500 dark:text-gray-500";
                          }
                        }
                        
                        return (
                          <tr 
                            key={item.listing_swine_id} 
                            className={`
                              text-center border-t transition-colors dark:border-gray-700
                              ${isInTransaction ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                              ${item.status === 'sold' && !isCompleted && isInTransaction ? 'opacity-60' : ''}
                              ${isInTransaction ? 'border-l-4 border-l-green-500' : ''}
                              ${hasUnsaved ? 'bg-yellow-50/50 dark:bg-yellow-900/20' : ''}
                            `}
                          >
                            <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700 font-mono text-[9px] sm:text-xs">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1">
                                #{item.listing_swine_id}
                                {hasUnsaved && (
                                  <span className="bg-yellow-500 text-white text-[8px] px-1 py-0 rounded">Unsaved</span>
                                )}
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
                            
                            {!isPerKg && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && item.status === 'available' ? (
                                  <div className="relative">
                                    <span className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">₱</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={item.final_amount ?? transaction.price_per_unit}
                                      onChange={(e) => handleFinalAmountChange(index, e.target.value)}
                                      className={`w-20 sm:w-24 pl-5 sm:pl-6 text-center text-[10px] sm:text-xs ${hasUnsaved ? 'border-yellow-400 dark:border-yellow-600' : ''}`}
                                      placeholder="Amount"
                                      disabled={isCompleted}
                                    />
                                  </div>
                                ) : isInTransaction ? (
                                  <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">
                                    {item.final_amount ? `₱${item.final_amount.toLocaleString()}` : '—'}
                                  </span>
                                ) : (
                                  <span className="text-gray-300 dark:text-gray-600">—</span>
                                )}
                              </td>
                            )}

                            {isPerKg && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && item.status === 'available' ? (
                                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={item.weight || ""}
                                      onChange={(e) => handleWeightChange(index, e.target.value)}
                                      className="w-16 sm:w-20 text-center text-[10px] sm:text-xs"
                                      disabled={isCompleted || !isInTransaction || item.status !== 'available'}
                                    />
                                  </div>
                                ) : isInTransaction ? (
                                  <span className="text-[10px] sm:text-xs dark:text-gray-300">{typeof item.weight === 'number' ? item.weight.toFixed(2) : item.weight} kg</span>
                                ) : (
                                  <span className="text-gray-300 dark:text-gray-600">—</span>
                                )}
                              </td>
                            )}
                            
                            {canModify && (
                              <td className="py-1.5 sm:py-2 px-2 sm:px-3 border dark:border-gray-700">
                                {isInTransaction && (
                                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    {isPerKg && item.status === 'available' && (
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() =>
                                          saveWeight(item.listing_swine_id, Number(item.weight))
                                        }
                                        disabled={!item.weight}
                                        className="h-6 sm:h-7 px-1.5 sm:px-2 text-[9px] sm:text-xs"
                                      >
                                        Save
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleRemoveSwine(item.listing_swine_id)}
                                      className="h-6 sm:h-7 px-1.5 sm:px-2 bg-red-500 hover:bg-red-600 text-white text-[9px] sm:text-xs"
                                      title="Remove from transaction"
                                    >
                                      <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    </Button>
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {!isPerKg && canModify && hasUnsavedChanges && (
                  <div className="mt-3 sm:mt-4 flex justify-end">
                    <Button
                      onClick={saveAllFinalAmounts}
                      disabled={isSavingAll}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    >
                      <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                      {isSavingAll ? "Saving..." : "Save All Final Amounts"}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {!isCompleted && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                  <div>
                    <Label className="text-xs sm:text-sm dark:text-gray-300">Valid Quantity</Label>
                    <Input
                      type="number"
                      disabled
                      value={validTransactionSwine.length}
                      className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1 sm:mb-2 block text-xs sm:text-sm dark:text-gray-300">Choose Price Option</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {transaction.offer_amount && (
                        <button
                          type="button"
                          onClick={() => setSelectedAmount(transaction.offer_amount!)}
                          className={cn(
                            "p-2 sm:p-4 rounded-xl border text-left transition-all text-xs sm:text-sm",
                            selectedAmount === transaction.offer_amount
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md"
                              : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700"
                          )}
                        >
                          <h4 className="font-medium text-green-700 dark:text-green-400 text-xs sm:text-sm">Buyer Offer</h4>
                          <p className="text-sm sm:text-lg font-semibold dark:text-gray-200">
                            ₱{transaction.offer_amount.toLocaleString()}{" "}
                            <span className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                              /{transaction.price_unit_type}
                            </span>
                          </p>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedAmount(transaction.price_per_unit)}
                        className={cn(
                          "p-2 sm:p-4 rounded-xl border text-left transition-all text-xs sm:text-sm",
                          selectedAmount === transaction.price_per_unit
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                            : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                        )}
                      >
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 text-xs sm:text-sm">Your Price (original)</h4>
                        <p className="text-sm sm:text-lg font-semibold dark:text-gray-200">
                          ₱{transaction.price_per_unit.toLocaleString()}{" "}
                          <span className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                            /{transaction.price_unit_type}
                          </span>
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Final Amount Summary */}
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-semibold text-chart-5 dark:text-gray-200 mb-2 sm:mb-3">
                  Amount Summary
                </h3>

                {isPerKg ? (
                  <div className="space-y-1 sm:space-y-2">
                    {validTransactionSwine.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-[10px] sm:text-sm border-b border-gray-200 dark:border-gray-600 pb-1"
                      >
                        <span className="dark:text-gray-300">
                          Swine #{item.listing_swine_id} - {item.weight || 0} kg
                        </span>
                        <span className="dark:text-gray-300">
                          ₱{(selectedAmount * Number(item.weight || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between text-[10px] sm:text-sm pt-2">
                      <span className="dark:text-gray-300">Subtotal ({validTotalWeight.toFixed(2)} kg × ₱{selectedAmount.toLocaleString()})</span>
                      <span className="font-medium dark:text-gray-200">
                        ₱{(selectedAmount * validTotalWeight).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 sm:space-y-2">
                    {validTransactionSwine.some(item => item.final_amount && item.final_amount > 0) ? (
                      validTransactionSwine.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-[10px] sm:text-sm border-b border-gray-200 dark:border-gray-600 pb-1"
                        >
                          <span className="dark:text-gray-300">Swine #{item.listing_swine_id}</span>
                          <span className="dark:text-gray-300">
                            ₱{(item.final_amount || selectedAmount).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between text-[10px] sm:text-sm">
                        <span className="dark:text-gray-300">{validTransactionSwine.length} heads × ₱{selectedAmount.toLocaleString()}</span>
                        <span className="font-medium dark:text-gray-200">
                          ₱{(selectedAmount * validTransactionSwine.length).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between font-semibold mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-300 dark:border-gray-600">
                  <span className="dark:text-gray-200 text-xs sm:text-sm">Total Amount</span>
                  <span className="text-primary text-sm sm:text-base md:text-lg dark:text-sidebar-primary">
                    ₱{calculatedTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 sm:gap-3">
                {transaction.status === "Seller Review" && (
                  <Button type="submit" disabled={processing} className="text-xs sm:text-sm">
                    Approve Transaction
                  </Button>
                )}

                {["Seller Approved", "Buyer Confirmed"].includes(transaction.status) && (
                  <Button
                    type="button"
                    onClick={async () => {
                      setIsSavingAll(true);
                      
                      try {
                        const itemsToSave = validTransactionSwine.filter(item => item.status === 'available');
                        
                        if (itemsToSave.length > 0) {
                          if (isPerKg) {
                            for (const item of itemsToSave) {
                              const weight = typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0;
                              const calculatedFinalAmount = weight * selectedAmount;
                              
                              await axios.post(route("marketplace.transaction.updateFinalAmount", item.listing_swine_id), {
                                final_amount: calculatedFinalAmount,
                              });
                            }
                            toast.success(`Final amounts calculated and saved for ${itemsToSave.length} pigs`);
                          } else {
                            if (hasUnsavedChanges) {
                              const unsavedItems = itemsToSave.filter(item => unsavedChanges[item.listing_swine_id]);
                              
                              for (const item of unsavedItems) {
                                const finalAmount = item.final_amount ?? transaction.price_per_unit;
                                
                                await axios.post(route("marketplace.transaction.updateFinalAmount", item.listing_swine_id), {
                                  final_amount: finalAmount,
                                });
                              }
                              
                              if (unsavedItems.length > 0) {
                                toast.success(`Saved ${unsavedItems.length} final amounts`);
                              }
                            } else {
                              for (const item of itemsToSave) {
                                if (!item.final_amount) {
                                  await axios.post(route("marketplace.transaction.updateFinalAmount", item.listing_swine_id), {
                                    final_amount: selectedAmount,
                                  });
                                }
                              }
                            }
                          }
                        }

                        const completeData: any = {
                          quantity: validTransactionSwine.length,
                          selected_amount: selectedAmount,
                        };
                        
                        if (isPerKg) {
                          completeData.total_weight = validTotalWeight;
                        }

                        router.post(route("marketplace.transaction.complete", transaction.id), completeData, {
                          onSuccess: () => {
                            toast.success("Transaction completed successfully!");
                            router.reload();
                          },
                          onError: (errors) => {
                            console.error(errors);
                            toast.error("Failed to complete transaction.");
                          },
                          onFinish: () => {
                            setIsSavingAll(false);
                          }
                        });
                      } catch (error) {
                        console.error("Error during transaction completion:", error);
                        toast.error("Failed to save final amounts. Please try again.");
                        setIsSavingAll(false);
                      }
                    }}
                    disabled={isSavingAll}
                    className={`text-xs sm:text-sm ${isSavingAll ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSavingAll ? "Processing..." : "Complete Transaction"}
                  </Button>
                )}
              </div>
            </form>

            {/* Receipt Button - Now shows for both Completed and Done */}
            {isCompleted && (
              <div className="flex justify-end">
                <Button
                  className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-700 flex items-center gap-2 transition-all text-xs sm:text-sm"
                  onClick={() => router.visit(route("marketplace.transaction.receipt", transaction.id))}
                >
                  <FileText className="w-4 h-4" /> View Receipt
                </Button>
              </div>
            )}

            {/* Quick Contact Card */}
            {!isCompleted && transaction.contact && (
              <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">Quick Contact:</span>
                  <span className="font-mono text-[10px] sm:text-xs">{formatPhoneNumber(transaction.contact)}</span>
                  <div className="flex gap-1 ml-0 sm:ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCall}
                      className="h-5 sm:h-6 px-1.5 sm:px-2 text-[9px] sm:text-xs text-green-600 dark:text-green-400 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" /> Call
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleText}
                      className="h-5 sm:h-6 px-1.5 sm:px-2 text-[9px] sm:text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" /> Text
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Edit Modal - Dark Mode Support */}
        {showPriceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full overflow-hidden">
              <div className="bg-sidebar-primary text-white px-4 py-3">
                <h3 className="text-sm sm:text-base font-semibold">Update Price</h3>
                <p className="text-[10px] sm:text-xs text-green-100 mt-0.5">
                  Change price and pricing unit
                </p>
              </div>

              <div className="p-4 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    ₱{transaction.price_per_unit.toLocaleString()}
                    <span className="text-[10px] sm:text-xs font-normal text-gray-500 ml-2">/{transaction.price_unit_type}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pricing Unit
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditedPriceUnitType('per_head')}
                      className={`
                        flex flex-col items-center py-1.5 sm:py-2 px-1 rounded-md border transition-all text-[10px] sm:text-xs
                        ${editedPriceUnitType === 'per_head' 
                          ? 'border-sidebar-primary bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className={`font-medium ${editedPriceUnitType === 'per_head' ? 'text-sidebar-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                        Per Head
                      </span>
                      <span className={`text-[8px] sm:text-[9px] mt-0.5 ${editedPriceUnitType === 'per_head' ? 'text-sidebar-primary/70' : 'text-gray-500'}`}>
                        Fixed per animal
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditedPriceUnitType('per_kg')}
                      className={`
                        flex flex-col items-center py-1.5 sm:py-2 px-1 rounded-md border transition-all text-[10px] sm:text-xs
                        ${editedPriceUnitType === 'per_kg' 
                          ? 'border-sidebar-primary bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className={`font-medium ${editedPriceUnitType === 'per_kg' ? 'text-sidebar-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                        Per Kg
                      </span>
                      <span className={`text-[8px] sm:text-[9px] mt-0.5 ${editedPriceUnitType === 'per_kg' ? 'text-sidebar-primary/70' : 'text-gray-500'}`}>
                        Based on weight
                      </span>
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs text-green-700 dark:text-green-300 font-medium mb-1">Preview</p>
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

              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
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