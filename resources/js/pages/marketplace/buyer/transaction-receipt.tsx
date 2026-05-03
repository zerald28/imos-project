import React, { useMemo, useRef } from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AppLayout from "@/layouts/marketplaceLayout";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import { 
  Printer, 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CheckCircle,
  Store,
  CreditCard
} from "lucide-react";

type ReceiptItem = {
  listing_swine_id: number;
  sex: string;
  breed: string;
  age_days: string;
  age_months: string;
  weight: string | number | null;
  formatted_weight: string;
  final_amount?: number | null;
};

type ReceiptTransaction = {
  id: number;
  transaction_number: string;
  date: string;
  time: string;
  status: string;
  request_type: string;
  payment_method: string;
  
  buyer: {
    id: number;
    full_name: string;
    email: string;
    contact: string;
    address: string;
  };
  
  seller: {
    id: number;
    full_name: string;
    email: string;
    contact: string;
    address: string;
    farm_name?: string | null;
  };
  
  listing: {
    id: number;
    title: string;
    description: string;
    category: string;
  };
  
  pricing: {
    price_per_unit: number;
    price_unit_type: string;
    quantity: number;
    total_weight: number;
    subtotal: number;
    offer_amount?: number;
    final_amount: number;
  };
  
  items: ReceiptItem[];
  item_count: number;
};

type Props = {
  transaction: ReceiptTransaction;
};

const TransactionReceipt: React.FC<Props> = ({ transaction }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const isPerKg = transaction.pricing.price_unit_type === 'per_kg';
  
  // Calculate the final total with proper fallback logic
  const finalTotal = useMemo(() => {
    if (isPerKg) {
      // Check if all items have weights
      const hasWeights = transaction.items.every(item => {
        const weight = item.weight !== null && item.weight !== undefined && item.weight !== '';
        return weight;
      });
      
      if (hasWeights) {
        // Use weight × price per kg calculation
        const totalWeight = transaction.items.reduce((sum, item) => {
          const weight = typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0;
          return sum + weight;
        }, 0);
        return totalWeight * transaction.pricing.price_per_unit;
      } else {
        // Fallback: use individual final_amount for each item
        const totalFromFinalAmounts = transaction.items.reduce((sum, item) => {
          const finalAmount = item.final_amount ? Number(item.final_amount) : 0;
          return sum + finalAmount;
        }, 0);
        
        // If there are final amounts, use them; otherwise use the provided final_amount
        if (totalFromFinalAmounts > 0) {
          return totalFromFinalAmounts;
        }
        return transaction.pricing.final_amount;
      }
    }
    return transaction.pricing.final_amount;
  }, [transaction.pricing, transaction.items, isPerKg]);

  // Calculate individual item totals for per-kg with fallback
  const itemTotals = useMemo(() => {
    if (!isPerKg) return [];
    
    return transaction.items.map(item => {
      const weight = item.weight !== null && item.weight !== undefined && item.weight !== ''
        ? (typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0)
        : null;
      
      let itemTotal = 0;
      let displayMethod = '';
      
      if (weight !== null && weight > 0) {
        // Use weight × price per kg
        itemTotal = weight * transaction.pricing.price_per_unit;
        displayMethod = 'weight';
      } else if (item.final_amount && item.final_amount > 0) {
        // Fallback to individual final amount
        itemTotal = item.final_amount;
        displayMethod = 'final';
      } else {
        // Last resort: use average
        itemTotal = transaction.pricing.final_amount / transaction.items.length;
        displayMethod = 'average';
      }
      
      return {
        ...item,
        weight: weight !== null ? weight : 0,
        weightDisplay: weight !== null ? `${weight.toFixed(2)} kg` : 'N/A',
        itemTotal,
        displayMethod
      };
    });
  }, [transaction.items, transaction.pricing.price_per_unit, transaction.pricing.final_amount, isPerKg]);

  // Calculate total weight for display (only valid weights)
  const totalWeight = useMemo(() => {
    if (!isPerKg) return 0;
    
    return transaction.items.reduce((sum, item) => {
      const weight = item.weight !== null && item.weight !== undefined && item.weight !== ''
        ? (typeof item.weight === 'number' ? item.weight : parseFloat(item.weight as string) || 0)
        : 0;
      return sum + weight;
    }, 0);
  }, [transaction.items, isPerKg]);

  // Get subtotal display text based on calculation method
  const getSubtotalDisplay = () => {
    if (isPerKg) {
      const hasWeights = transaction.items.every(item => {
        const weight = item.weight !== null && item.weight !== undefined && item.weight !== '';
        return weight;
      });
      
      if (hasWeights) {
        return `${totalWeight.toFixed(2)} kg × ${formatCurrency(transaction.pricing.price_per_unit)}`;
      } else {
        const hasFinalAmounts = transaction.items.some(item => item.final_amount && item.final_amount > 0);
        if (hasFinalAmounts) {
          return "Sum of individual item final amounts";
        }
        return "Custom total amount";
      }
    }
    return `${transaction.pricing.quantity} heads × ${formatCurrency(transaction.pricing.price_per_unit)}`;
  };

  const handlePrint = async () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const originalTitle = document.title;
    document.title = `Receipt_${transaction.transaction_number}`;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow pop-ups to print the receipt");
      return;
    }

    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    let stylesHTML = '';
    styles.forEach((style) => {
      if (style.tagName === 'STYLE') {
        stylesHTML += style.outerHTML;
      } else if (style.tagName === 'LINK') {
        stylesHTML += style.outerHTML;
      }
    });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt_${transaction.transaction_number}</title>
          <meta charset="utf-8" />
          ${stylesHTML}
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: white;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .no-print {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:border-0 {
              border: 0 !important;
            }
            .dark\\:bg-gray-900, .dark\\:bg-gray-800 {
              background-color: white !important;
            }
            .dark\\:text-gray-300, .dark\\:text-gray-200, .dark\\:text-gray-400 {
              color: #333 !important;
            }
            .dark\\:border-gray-600, .dark\\:border-gray-700 {
              border-color: #e5e5e5 !important;
            }
            .dark\\:bg-gray-700\\/50, .dark\\:bg-gray-700 {
              background-color: #f9f9f9 !important;
            }
            button, .no-print {
              display: none !important;
            }
            /* Ensure seller and buyer are in a row when printing */
            .parties-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 1.5rem !important;
            }
            @media print {
              body {
                padding: 0;
              }
              .page-break {
                page-break-before: always;
              }
              /* Force grid layout for print */
              .parties-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 1.5rem !important;
              }
              .parties-grid > div {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  const handleBack = () => {
    router.visit(route("marketplace.transaction.setup", transaction.id));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 print:p-0 dark:bg-gray-900">
        <Head title={`Receipt #${transaction.transaction_number}`} />

        {/* Action Buttons - Hidden when printing */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 no-print">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Transaction
          </Button>
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Printer className="h-4 w-4" /> Print Receipt
          </Button>
        </div>

        {/* Receipt Card - This entire component from here down to "Generated on" will be printed */}
        <div ref={receiptRef}>
          <Card className="shadow-lg print:shadow-none pt-0 print:border-0 dark:bg-gray-800 dark:border-gray-700">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 text-white px-4 sm:px-6 pb-0 py-3 sm:py-4 rounded-t-lg print:bg-white print:text-black print:border-b print:border-gray-300 dark:print:bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold">Transaction Receipt</h1>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                  <p className="text-xs sm:text-sm opacity-90 print:text-gray-600">
                    {transaction.transaction_number}
                  </p>
                  <p className="text-[10px] sm:text-xs opacity-75 print:text-gray-500">
                    {transaction.date} • {transaction.time}
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="space-y-4 sm:space-y-6 p-4 pt-0 sm:p-6">
              {/* Status Badge */}
              

              {/* Parties Involved Grid - Added parties-grid class for consistent row layout */}
              <div className="parties-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Seller Information */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border dark:border-gray-600">
                  <h3 className="font-semibold text-sidebar-primary dark:text-sidebar-primary mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Store className="h-4 w-4" /> Seller
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="font-medium dark:text-gray-200">{transaction.seller.full_name}</p>
                    {transaction.seller.farm_name && (
                      <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">{transaction.seller.farm_name}</p>
                    )}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <a href={`mailto:${transaction.seller.email}`} className="hover:underline truncate text-[10px] sm:text-xs">
                        {transaction.seller.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs">{transaction.seller.contact}</span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <span className="text-[10px] sm:text-xs break-words">{transaction.seller.address}</span>
                    </div>
                  </div>
                </div>

                {/* Buyer Information */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border dark:border-gray-600">
                  <h3 className="font-semibold text-sidebar-primary dark:text-sidebar-primary mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <User className="h-4 w-4" /> Buyer
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="font-medium dark:text-gray-200">{transaction.buyer.full_name}</p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <a href={`mailto:${transaction.buyer.email}`} className="hover:underline truncate text-[10px] sm:text-xs">
                        {transaction.buyer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs">{transaction.buyer.contact}</span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <span className="text-[10px] sm:text-xs break-words">{transaction.buyer.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table - Removed listing details card, added ID beside item purchase */}
              <div className="border rounded-lg overflow-hidden dark:border-gray-600">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 sm:px-4 py-2 sm:py-3 font-semibold flex items-center gap-2 text-sm sm:text-base dark:text-gray-200">
                  <Package className="h-4 w-4" /> Items Purchased ({transaction.item_count})
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-y dark:border-gray-600">
                      <tr className="dark:text-gray-300">
                        <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-left">ID</th>
                        <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-left">Sex/Breed</th>
                        <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-left">Age</th>
                        <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-right">
                          {isPerKg ? 'Weight' : 'Price'}
                        </th>
                        {isPerKg && (
                          <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-right">Subtotal</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-600">
                      {isPerKg ? (
                        // Per KG items with individual totals
                        itemTotals.map((item) => (
                          <tr key={item.listing_swine_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:text-gray-300">
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs">
                              #{item.listing_swine_id}
                            </td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs">
                              {item.sex} • {item.breed}
                            </td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs">{item.age_months}</td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs">
                              {item.weightDisplay}
                              {item.displayMethod === 'final' && (
                                <span className="ml-1 text-[8px] text-blue-500">(fixed price)</span>
                              )}
                              {item.displayMethod === 'average' && (
                                <span className="ml-1 text-[8px] text-orange-500">(estimated)</span>
                              )}
                            </td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right font-medium text-[10px] sm:text-xs">
                              {formatCurrency(item.itemTotal)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        // Per Head items - now showing ID prominently
                        transaction.items.map((item) => (
                          <tr key={item.listing_swine_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:text-gray-300">
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs">
                              #{item.listing_swine_id}
                            </td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs">
                              {item.sex} • {item.breed}
                            </td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs">{item.age_months}</td>
                            <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right font-medium text-[10px] sm:text-xs">
                              {item.final_amount && item.final_amount > 0 
                                ? formatCurrency(item.final_amount)
                                : formatCurrency(transaction.pricing.price_per_unit)
                              }
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border dark:border-gray-600">
                <h3 className="font-semibold text-sidebar-primary dark:text-sidebar-primary mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <CreditCard className="h-4 w-4" /> Payment Summary
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {/* Price Breakdown */}
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price per unit:</span>
                      <span className="font-medium dark:text-gray-200">
                        {formatCurrency(transaction.pricing.price_per_unit)} /{transaction.pricing.price_unit_type}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                      <span className="font-medium dark:text-gray-200">{transaction.pricing.quantity} heads</span>
                    </div>
                    
                    {isPerKg && totalWeight > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total weight:</span>
                        <span className="font-medium dark:text-gray-200">{totalWeight.toFixed(2)} kg</span>
                      </div>
                    )}
                    
                    {transaction.pricing.offer_amount && (
                      <div className="flex justify-between text-amber-600 dark:text-amber-400">
                        <span>Original offer:</span>
                        <span>{formatCurrency(transaction.pricing.offer_amount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-300 dark:border-gray-600 pt-2 sm:pt-3">
                    {/* Subtotal */}
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-medium dark:text-gray-200">
                        {getSubtotalDisplay()}
                      </span>
                    </div>
                    
                    {/* Per-item breakdown for per-head if individual prices were set */}
                    {!isPerKg && transaction.items.some(item => item.final_amount && item.final_amount > 0) && (
                      <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 pl-3 sm:pl-4 space-y-0.5 sm:space-y-1">
                        {transaction.items.map((item, idx) => (
                          item.final_amount && item.final_amount > 0 && (
                            <div key={idx} className="flex justify-between">
                              <span>Item #{item.listing_swine_id}</span>
                              <span>{formatCurrency(item.final_amount)}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>

                  {/* GRAND TOTAL - Prominently displayed */}
                  <div className="border-t-2 border-sidebar-primary dark:border-sidebar-primary pt-2 sm:pt-3 mt-1 sm:mt-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-sidebar-primary dark:text-sidebar-primary">
                        TOTAL AMOUNT
                      </span>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-bold text-sidebar-primary dark:text-sidebar-primary">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex justify-between text-xs sm:text-sm pt-1 sm:pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Payment method:</span>
                    <span className="font-medium capitalize dark:text-gray-200">{transaction.payment_method}</span>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 pt-3 sm:pt-4 border-t dark:border-gray-700">
                <p>This is an official receipt for transaction #{transaction.transaction_number}</p>
                <p className="mt-0.5 sm:mt-1">Generated on {transaction.date} at {transaction.time}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default TransactionReceipt;