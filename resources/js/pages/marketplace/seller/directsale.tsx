import React, { useState, useRef, useEffect } from "react";
import { useForm, usePage, Link, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { 
  CheckCircle,
  AlertCircle,
  Calendar,
  Tag,
  ChevronRight,
  X,
  FileText,
  Grid3x3,
  User,
  CreditCard,
  Receipt,
  ChevronLeft,
  PhilippinePeso,
  Edit,
  Trash2,
  Save,
  Plus,
  Store,
 
} from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PigIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { route } from "ziggy-js";

interface Swine {
  id: number;
  name: string;
  tag_number: string;
  sex: string;
  birthdate: string;
  breed_name: string;
  weight?: number;
  category: string;
  status: string;
}

interface DirectSaleData {
  id?: number;
  swine_id: number;
  price: number;
  quantity: number;
  total_amount: number;
  sold_at: string;
  buyer_name: string;
  payment_method: string;
  notes?: string;
  swine?: Swine;
}

interface Props {
  availableSwine?: Swine[];
  selectedSwineIds?: number[];
  directSale?: DirectSaleData;
  isEdit?: boolean;
  flash?: {
    success?: string;
    error?: string;
  };
}

const DirectSale: React.FC<Props> = ({ 
  availableSwine = [], 
  selectedSwineIds = [], 
  directSale,
  isEdit = false,
  flash: propFlash
}) => {
  const [selectedCount, setSelectedCount] = useState(selectedSwineIds.length);
  const [activeTab, setActiveTab] = useState<'details' | 'swine'>('details');
  const [selectedSwine, setSelectedSwine] = useState<Swine | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const { auth, flash: pageFlash } = usePage().props as any;
  
  // Combine props flash with page flash
  const flash = propFlash || pageFlash;

  // Initialize form data
  const { data, setData, post, put, delete: destroy, errors, processing } = useForm({
    swine_id: directSale?.swine_id?.toString() || "",
    price: directSale?.price?.toString() || "",
    quantity: directSale?.quantity?.toString() || "1",
    sold_at: directSale?.sold_at || new Date().toISOString().split('T')[0],
    buyer_name: directSale?.buyer_name || "",
    payment_method: directSale?.payment_method || "cash",
    notes: directSale?.notes || "",
  });

  // Initialize with selected swine
  useEffect(() => {
    if (directSale?.swine) {
      setSelectedSwine(directSale.swine);
      setSelectedCount(1);
    } else if (selectedSwineIds.length === 1 && availableSwine.length > 0) {
      const swine = availableSwine.find(s => s.id === selectedSwineIds[0]);
      if (swine) {
        setSelectedSwine(swine);
        setData("swine_id", swine.id.toString());
      }
    }
  }, [directSale, selectedSwineIds, availableSwine]);

  // Scroll to top when flash messages appear
  useEffect(() => {
    if (flash?.success || flash?.error) {
      scrollToTop();
    }
  }, [flash]);

  

  const toggleSwine = (id: number) => {
    if (data.swine_id === id.toString()) {
      // Deselect if already selected
      setData("swine_id", "");
      setSelectedSwine(null);
      setSelectedCount(0);
    } else {
      // Select new swine
      const swine = availableSwine.find(s => s.id === id);
      if (swine) {
        setData("swine_id", id.toString());
        setSelectedSwine(swine);
        setSelectedCount(1);
        setActiveTab('details');
      }
    }
  };

  const handleUncheckAll = () => {
    setData("swine_id", "");
    setSelectedSwine(null);
    setSelectedCount(0);
  };

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to scroll to bottom smoothly (for form submission)
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && directSale?.id) {
      // Update existing direct sale
      put(route('marketplace.seller.direct-sale.update', directSale.id), {
        preserveScroll: true,
        onSuccess: () => {
          // Scroll to top to show success message
          setTimeout(scrollToTop, 100);
        },
        onError: () => {
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey === 'swine_id') {
            setActiveTab('swine');
          }
          // Scroll to first error
          scrollToFirstError();
        }
      });
    } else {
      setIsLoading(true);
      // Create new direct sale
      post(route('marketplace.seller.direct-sale.store'), {
        preserveScroll: false, // Allow redirect to edit page
        onSuccess: () => {
          setIsLoading(false);
          // Backend will redirect to edit page
          // Scroll to top will happen automatically after redirect
        },
        onError: () => {
          setIsLoading(false);
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey === 'swine_id') {
            setActiveTab('swine');
          }
          // Scroll to first error
          scrollToFirstError();
        }
      });
    }
  };
const handleDelete = () => {
  if (!directSale?.id) return;

  destroy(route('marketplace.seller.direct-sale.destroy', directSale.id), {
    preserveScroll: false,
    onSuccess: () => {
      // ✅ nothing here
      // Laravel already redirected WITH flash
    },
  });
};


  const formRef = useRef<HTMLFormElement | null>(null);
  const swineListRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to first error
  const scrollToFirstError = () => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey && formRef.current) {
      const el = formRef.current.querySelector(`[name="${firstErrorKey}"]`);
      if (el) {
        const yOffset = -100;
        const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        (el as HTMLElement).focus();
        return;
      }
    }

    if (errors.swine_id && swineListRef.current) {
      setActiveTab('swine');
      const yOffset = -100;
      const y = swineListRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      swineListRef.current.classList.add("ring-2", "ring-red-500", "ring-offset-2");
      setTimeout(() => {
        swineListRef.current?.classList.remove("ring-2", "ring-red-500", "ring-offset-2");
      }, 1500);
    }
  };

  useEffect(() => {
    // Scroll to first error when errors change
    if (Object.keys(errors).length > 0) {
      setTimeout(scrollToFirstError, 100);
    }
  }, [errors]);

  const calculateTotal = () => {
    const price = parseFloat(data.price) || 0;
    const quantity = parseInt(data.quantity) || 0;
    return (price * quantity).toLocaleString();
  };

  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "check", label: "Check" },
    { value: "mobile_payment", label: "Mobile Payment" },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Scroll to Top Button */}
       

        {/* Flash Messages - Moved outside header */}
        {(flash?.success || flash?.error) && (
          <div className="max-w-7xl mx-auto px-4 pt-4 animate-fade-in">
            {flash.success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-700 font-medium">{flash.success}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.reload({ only: [] })}
                    className="text-green-600 hover:text-green-800 hover:bg-green-100"
                    aria-label="Dismiss message"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            {flash.error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-red-700 font-medium">{flash.error}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.reload({ only: [] })}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100"
                    aria-label="Dismiss message"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href={isEdit ? "/marketplace/seller/direct-sale" : "/marketplace/seller/create"}
                  className="hover:opacity-80 transition-opacity flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">
                    {isEdit ? 'Sale' : 'Marketplace'}
                  </span>
                </Link>
                <div className="p-2 bg-white/20 rounded-lg">
                  {isEdit ? (
                    <Edit className="w-6 h-6" />
                  ) : (
                    <Store className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {isEdit ? `Edit Direct Sale #${directSale?.id}` : 'Direct Sale'}
                  </h1>
                  <p className="text-blue-100 dark:text-gray-300">
                    {isEdit ? 'Update direct sale details' : 'Sell swine directly to a buyer'}
                  </p>
                </div>
              </div>
              {isEdit && directSale?.id && (
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 border-0"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete Sale
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will delete this direct sale record and change the swine status back to "active". 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Sale
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4">
          {/* Tab Navigation */}
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-1">
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'details'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <PhilippinePeso className="w-4 h-4" />
                <span>Sale Details</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('swine')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'swine'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                disabled={isEdit}
              >
                <Grid3x3 className="w-4 h-4" />
                <span>Select Swine</span>
                <Badge variant="secondary" className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5">
                  {selectedCount}
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Sale Details Form */}
            <div className={`space-y-6 ${activeTab !== 'details' && 'lg:block hidden'}`}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Sale Information</h2>
                  {isEdit && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Editing Sale #{directSale?.id}
                    </Badge>
                  )}
                </div>

                <form ref={formRef} onSubmit={submit} className="space-y-6">
                  {/* Selected Swine Display */}
                  {selectedSwine && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PigIcon className="w-4 h-4" />
                          <span className="font-semibold">Selected Swine</span>
                        </div>
                        {!isEdit && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleUncheckAll}
                            className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Tag:</span>
                          <span className="font-medium ml-2">{selectedSwine.tag_number}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Breed:</span>
                          <span className="font-medium ml-2">{selectedSwine.breed_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className="font-medium ml-2">{selectedSwine.status}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">ID:</span>
                          <span className="font-medium ml-2">#{selectedSwine.id}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <PhilippinePeso className="w-3 h-3" />
                        Price per Unit (₱)
                      </Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        required
                        step="0.01"
                        min="0"
                      />
                      {errors.price && (
                        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors.price}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Quantity
                      </Label>
                      <Input
                        type="number"
                        placeholder="1"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        min="1"
                        required
                      />
                      {errors.quantity && (
                        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors.quantity}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sale Date & Buyer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Sale Date
                      </Label>
                      <Input
                        type="date"
                        value={data.sold_at}
                        onChange={(e) => setData("sold_at", e.target.value)}
                        required
                      />
                      {errors.sold_at && (
                        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors.sold_at}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Buyer Name
                      </Label>
                      <Input
                        placeholder="Enter buyer's name"
                        value={data.buyer_name}
                        onChange={(e) => setData("buyer_name", e.target.value)}
                        required
                      />
                      {errors.buyer_name && (
                        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors.buyer_name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      Payment Method
                    </Label>
                    <Select
                      value={data.payment_method}
                      onValueChange={(value: string) => setData("payment_method", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.payment_method && (
                      <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        {errors.payment_method}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      placeholder="Any additional information about the sale..."
                      value={data.notes}
                      onChange={(e) => setData("notes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={processing || isLoading || (!isEdit && !data.swine_id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6"
                      onClick={() => {
                        // Store current scroll position before submission
                        sessionStorage.setItem('directSaleScrollPosition', window.scrollY.toString());
                      }}
                    >
                      {processing || isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          {isEdit ? 'Updating Sale...' : 'Processing Sale...'}
                        </>
                      ) : (
                        <>
                          {isEdit ? (
                            <>
                              <Save className="mr-2" />
                              Update Sale
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2" />
                              Complete Direct Sale
                            </>
                          )}
                        </>
                      )}
                    </Button>
                    
                    {isEdit && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.visit(route('marketplace.seller.listings'))}
                        className="py-6"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Card>

              {/* Total Summary */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Sale Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Unit:</span>
                    <span className="font-semibold">₱{parseFloat(data.price || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{data.quantity}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">₱{calculateTotal()}</span>
                    </div>
                  </div>
                  {isEdit && directSale?.total_amount && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Original Total:</span>
                        <span>₱{directSale.total_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Swine Selection - Only show for create, not edit */}
            {!isEdit && (
              <div className={`${activeTab !== 'swine' && 'lg:block hidden'}`}>
                <Card className="p-6 lg:sticky lg:top-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold">Select Swine</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Choose one swine for direct sale
                      </p>
                    </div>
                    {selectedCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {selectedCount} selected
                        </Badge>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleUncheckAll}
                          className="text-red-600 hover:text-red-700"
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>

                  <div ref={swineListRef} className="space-y-3 max-h-[500px] overflow-y-auto">
                    {availableSwine.length > 0 ? (
                      availableSwine.map((s) => {
                        const isSelected = data.swine_id === s.id.toString();
                        
                        return (
                          <div
                            key={s.id}
                            onClick={() => toggleSwine(s.id)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                              }`}>
                                {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">
                                    {s.name || `Swine #${s.id}`}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    s.status === 'active' 
                                      ? 'bg-green-100 text-green-700'
                                      : s.status === 'sold'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {s.status}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {s.tag_number}
                                  </span>
                                  <span>{s.breed_name}</span>
                                </div>
                              </div>
                              <div className="text-sm capitalize">{s.sex}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-700 mb-2">No Swine Available</h3>
                        <p className="text-sm text-gray-500">
                          All your swine are currently listed or unavailable for direct sale.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="lg:hidden mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'details' ? 'swine' : 'details')}
                      variant="outline"
                      className="w-full"
                    >
                      {activeTab === 'details' ? (
                        <>
                          Continue to Swine Selection
                          <ChevronRight className="ml-2" />
                        </>
                      ) : (
                        <>
                          <ChevronRight className="mr-2 rotate-180" />
                          Back to Sale Details
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DirectSale;