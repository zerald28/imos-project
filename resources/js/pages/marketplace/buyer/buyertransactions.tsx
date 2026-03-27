import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/marketplaceLayout";
import { usePage } from "@inertiajs/react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

interface Transaction {
  id: number;
  quantity: number;
  state: string;
  transaction_date: string;
  updated_at: string;
  amount?: number;
  listing?: {
    id: number | null;
    image: string | null;
    description: string;
    category: string;
    price_per_unit?: number;
  } | null;
  seller: {
    id: number;
    name: string;
  };
  swineRequest: any[];
}

interface Props {
  transactions: Transaction[];
}

const BuyerTransactions: React.FC<Props> = ({ transactions }) => {
  
  const [selectedTab, setSelectedTab] = useState<"purchase" | "reservation" | "issues">("purchase");
  const urlParams = new URLSearchParams(window.location.search);
  const queryTab = urlParams.get("tab") as "cancelled" | "progress" | "completed" | "issues";

  const { props } = usePage();

  const [progressTab, setProgressTab] = useState<"cancelled" | "progress" | "completed" | "issues">(queryTab || "progress");

  const { flash } = usePage().props as {
    flash?: {
      success?: string;
      error?: string;
    };
  };

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }

    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const statusColor = (status: string) => {
    switch (status.toLowerCase().replace(/\s+/g, "_")) {
      case "pending_request":
        return "bg-yellow-100 text-yellow-800";
      case "seller_review":
        return "bg-blue-100 text-blue-800";
      case "seller_approved":
        return "bg-green-100 text-green-800";
      case "buyer_confirmed":
        return "bg-indigo-100 text-indigo-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-200 text-green-900";
        case "done":
        return "bg-green-200 text-green-900";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-200 text-gray-800";
      case "unavailable":
        return "bg-orange-100 text-orange-800";
      case "listing_deleted":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const groupByUpdatedAt = (items: Transaction[]) => {
    const grouped: Record<string, Transaction[]> = {};
    items.forEach((item) => {
      if (!grouped[item.updated_at]) grouped[item.updated_at] = [];
      grouped[item.updated_at].push(item);
    });
    return grouped;
  };

  // Define all possible states
  const cancelled = transactions.filter((t) => t.state === "Cancelled");
  const completed = transactions.filter((t) => t.state === "Completed" || t.state === "Done");
  const issues = transactions.filter((t) => 
    ["Unavailable", "Listing Deleted", "Expired"].includes(t.state)
  );
const progress = transactions.filter((t) => 
  !["Cancelled", "Completed", "Done", "Unavailable", "Listing Deleted", "Expired"].includes(t.state)
);

  const filtered =
    progressTab === "cancelled"
      ? cancelled
      : progressTab === "completed"
      ? completed
      : progressTab === "issues"
      ? issues
      : progress;

  // Update purchase requests to include all active states
  const purchaseRequests = filtered.filter((t) =>
  [
    "Pending Request", 
    "Seller Review", 
    "Seller Approved", 
    "Buyer Confirmed", 
    "Payment Completed", 
    "In Progress"
  ].includes(t.state)
);

  const reservationRequests = filtered.filter((t) =>
    ["Seller Approved", "Buyer Confirmed"].includes(t.state)
  );

  const groupedTransactions = groupByUpdatedAt(filtered);
  const purchaseGrouped = groupByUpdatedAt(purchaseRequests);
  const reservationGrouped = groupByUpdatedAt(reservationRequests);
  const issuesGrouped = groupByUpdatedAt(issues);

  const goToTransaction = (id: number) => {
    router.visit(route("marketplace.buyer.transaction.setup", id));
  };

  // === Reusable Card List ===
  const renderCards = (grouped: Record<string, Transaction[]>) =>
    Object.keys(grouped).length > 0 ? (
      Object.entries(grouped).map(([date, group]) => (
        <div key={date}>
          <p className="sm:text-sm text-xs p-2 text-right text-gray-500/70">
            Last Action {date}
          </p>
          <div className="space-y-2">
            {group.map((t) => (
              <Card
                key={t.id}
                onClick={() => goToTransaction(t.id)}
                className={`border py-1 border-gray-200 cursor-pointer hover:shadow-md transition ${
                  t.state === "Listing Deleted" ? "border-red-300 bg-red-50/30" : ""
                } ${t.state === "Unavailable" ? "border-orange-300 bg-orange-50/30" : ""}`}
              >
                <CardContent className="py-1 px-2 flex items-center space-x-4">
                  {/* Image or placeholder */}
                  {t.listing?.image ? (
                    <img
                      src={t.listing.image}
                      alt={t.listing?.description || 'Listing image'}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : t.listing?.description === '[Listing Deleted by Seller]' ? (
                    <div className="w-24 h-24 bg-red-100 rounded flex items-center justify-center text-red-500 border border-red-200">
                      <Trash2 className="h-8 w-8" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <span className="text-xs text-center">No<br />Image</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="sm:text-lg text-sm font-medium truncate">
                        {t.listing?.description === '[Listing Deleted by Seller]' 
                          ? '🚫 Listing Deleted' 
                          : t.listing?.description || 'Listing unavailable'}
                      </h3>
                      
                      {/* Status badges */}
                      {t.state === "Listing Deleted" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-200 text-red-800 border border-red-300">
                          <Trash2 className="h-2.5 w-2.5 mr-0.5" />
                          Deleted
                        </span>
                      )}
                      {t.state === "Unavailable" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                          Unavailable
                        </span>
                      )}
                      {t.state === "Expired" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-200 text-gray-800 border border-gray-300">
                          Expired
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-500">Seller: {t.seller.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Quantity: {t.quantity}</p>

                    <span
                      className={`inline-block mt-1 text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(
                        t.state
                      )}`}
                    >
                      {t.state}
                    </span>

                  {(progressTab === "completed" && t.amount) && (
  <p className="text-xs sm:text-sm text-green-700 mt-1 font-medium">
    Final Amount: ₱{t.amount.toLocaleString()}
  </p>
)}

                    {/* Additional context for deleted listings */}
                    {t.state === "Listing Deleted" && (
                      <p className="text-xs text-red-600 mt-1">
                        The seller removed this listing
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No {progressTab} transactions found.</p>
    );

  return (
    <AppLayout>
      <div className="p-2 max-w-4xl mx-auto flex flex-col h-[calc(100vh-60px)]">
        <h1 className="text-2xl font-semibold mb-2">Buyer Transactions</h1>

        {/* === Progress Tabs - Issues tab shows issues directly === */}
        <div className="flex items-center justify-between sm:justify-center mb-4 border-b border-gray-200">
          {[
            { key: "cancelled", label: "Cancelled" },
            { key: "progress", label: "In Progress" },
            { key: "completed", label: "Completed" },
            { key: "issues", label: "Issues" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setProgressTab(tab.key as any);
                // Reset selected tab to purchase when switching away from issues
                if (tab.key !== "issues") {
                  setSelectedTab("purchase");
                }
              }}
              className={`flex-1 text-center px-3 py-2 text-sm sm:text-base font-medium border-b-2 transition ${
                progressTab === tab.key
                  ? "border-sidebar-primary text-sidebar-primary"
                  : "border-transparent text-gray-500 hover:text-sidebar-primary/80"
              }`}
            >
              {tab.label}
              {tab.key === "issues" && issues.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                  {issues.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* === Dropdown - Only for Progress tab === */}
        {progressTab === "progress" && (
          <div className="mb-2 inline-block">
            <Select
              value={selectedTab}
              onValueChange={(v) => setSelectedTab(v as any)}
            >
              <SelectTrigger className="bg-transparent border-none shadow-none p-0 hover:bg-transparent focus:ring-0">
                <SelectValue
                  placeholder="Select Transaction Type"
                  className="text-gray-700 cursor-pointer text-lg font-semibold"
                />
              </SelectTrigger>
              <SelectContent className="text-gray-700">
                <SelectItem value="purchase">Purchase Request</SelectItem>
                <SelectItem value="reservation">Reservation Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* === Fixed Height Scrollable Content === */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto px-1 sm:px-10 transition-all duration-300">
            {progressTab === "progress" ? (
              selectedTab === "purchase" 
                ? renderCards(purchaseGrouped)
                : renderCards(reservationGrouped)
            ) : progressTab === "issues" ? (
              /* Issues tab shows issues directly - no dropdown needed */
              renderCards(issuesGrouped)
            ) : (
              renderCards(groupedTransactions)
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BuyerTransactions;