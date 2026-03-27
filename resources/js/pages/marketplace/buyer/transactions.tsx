    import React, { useState, useEffect } from "react";
    import { Head, useForm } from "@inertiajs/react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { toast } from "sonner";
    import AppLayout from "@/layouts/app-layout";
    import { route } from "ziggy-js";
    import { cn } from "@/lib/utils"; // ✅ For conditional classes
    import axios from "axios";
    import { router } from "@inertiajs/react";
import { Check } from "lucide-react";



    type Transaction = {
    id: number;
    buyer_name: string;
    email: string;
    contact: string;
    address: string;
    request_type: string;
    quantity: number;
    offer_amount?: number;
    original_amount: number;
    price_label: string;
    status: string;
    transaction_date: string;
    };

    type Props = {
    transaction: Transaction;
    swine_list: {
        listing_swine_id: number;
        sex: string;
        breed: string;
        age_days: string;
        weight: string | number;
    }[];
    };

    const TransactionSetup: React.FC<Props> = ({ transaction,swine_list }) => {
    const [selectedAmount, setSelectedAmount] = useState<number>(
        transaction.offer_amount || transaction.original_amount
    );

    const { data, setData, post, processing } = useForm({
        final_quantity: transaction.quantity,
        final_amount: selectedAmount,
    });

   useEffect(() => {
  setData("final_amount", selectedAmount);
}, [selectedAmount]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("marketplace.transaction.approve", transaction.id), {
        onSuccess: () => toast.success("Transaction approved successfully!"),
        onError: () => toast.error("Failed to approve transaction."),
        });
    };

    const [swineList, setSwineList] = useState(swine_list);

    const handleWeightChange = (index: number, value: string) => {
  const updated = [...swineList];
  updated[index].weight = value;
  setSwineList(updated);
};

const saveWeight = async (listing_swine_id: number, newWeight: number) => {
  try {
    await axios.post(route("marketplace.transaction.updateWeight", listing_swine_id), {
      scaled_weight: newWeight,
    });
    toast.success("Weight updated!");
  } catch {
    toast.error("Failed to update weight");
  }
};

const isCompleted = transaction.status === "Completed";

    return (
        <AppLayout>
        <div className="max-w-4xl mx-auto ">
            <Head title="Finalize Transaction" />


            <Card className="shadow-lg">
               {/* ✅ Transaction Stage Tracker */}
<div className=" relative">
  {/* Base progress line */}
  <div className="absolute top-4 mx-30 left-[16px] right-[16px] h-1 bg-gray-200 rounded-full">
    {/* Filled progress line that connects between circles */}
    <div
      className={`h-1 rounded-full transition-all duration-700 bg-sidebar-primary`}
      style={{
        width:
          transaction.status === "Seller Review"
            ? "0%"
            : transaction.status === "Seller Approved"
            ? "50%"
            : transaction.status === "Completed"
            ? "100%"
            : "0%",
      }}
    ></div>
  </div>

  {/* Step Circles and Labels */}
  <div className="flex items-center justify-between relative z-10">
    {["Pending", "Approved", "Completed"].map((label, i) => {
      const isActive =
        (transaction.status === "Seller Review" && i === 0) ||
        (transaction.status === "Seller Approved" && i <= 1) ||
        (transaction.status === "Completed" && i <= 2);

      const isCurrent =
        (transaction.status === "Seller Review" && i === 0) ||
        (transaction.status === "Seller Approved" && i === 1) ||
        (transaction.status === "Completed" && i === 2);

      return (
        <div
          key={i}
          className="flex flex-col items-center text-center flex-1 relative"
        >
          {/* Step circle */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
              isActive
                ? "bg-sidebar-primary text-white border-sidebar-primary shadow-md"
                : "bg-white text-gray-400 border-gray-300"
            } ${isCurrent ? "scale-110 ring-4 ring-sidebar-primary/30" : ""}`}
          >
            {isActive ? <Check className="w-4 h-4" /> : i + 1}
          </div>

          {/* Step label */}
          <span
            className={`mt-2 text-sm font-medium ${
              isActive ? "text-sidebar-primary" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
</div>

{/* 🪄 Status Message Box */}
{transaction.status === "Seller Review" && (
  <div className="flex items-start gap-3 bg-green-50 border mx-5 border-green-400 text-green-700 px-3 py-2 rounded-lg shadow-sm">
    <span className="text-xl">⏳</span>
    <div>
      <p className="font-semibold">Pending Approval</p>
      <p className="text-sm">
        Waiting for seller confirmation to proceed.
      </p>
    </div>
  </div>
)}

{transaction.status === "Seller Approved" && (
  <div className="flex items-start gap-3 mx-5 bg-green-50 border border-green-400 text-green-700 px-3 py-2 rounded-lg shadow-sm">
    <span className="text-xl">📝</span>
    <div>
      <p className="font-semibold">Approved</p>
      <p className="text-sm">
        The transaction has been approved. You can now update or finalize it.
      </p>
    </div>
  </div>
)}

{transaction.status === "Completed" && (
  <div className="flex items-start gap-3 bg-green-50 mx-5 border border-green-400 text-green-700 px-3 py-2 rounded-lg shadow-sm">
    <span className="text-xl">✅</span>
    <div>
      <p className="font-semibold">Transaction Completed</p>
      <p className="text-sm">
        This transaction is finalized. All details are locked.
      </p>
    </div>
  </div>
)}

            <CardHeader>
                <CardTitle className="text-xl text-chart-5 font-semibold">
                Finalize Transaction
                </CardTitle>
            </CardHeader>
           

            <CardContent className="space-y-4">
                {/* Buyer + Transaction Info */}
            <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
    <h3 className="text-lg font-semibold text-chart-5 mb-4">
        Transaction Summary
    
            <span className="text-sm ml-5 text-chart-5">Transaction #
            {transaction.id}
            </span>
        
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
        {/* Left: Buyer Info */}
        <div>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Buyer Name:</span>{" "}
            {transaction.buyer_name}
        </p>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Email:</span>{" "}
            {transaction.email}
        </p>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Contact:</span>{" "}
            {transaction.contact}
        </p>
        <p>
            <span className="font-semibold text-chart-5">Address:</span>{" "}
            {transaction.address}
        </p>
        </div>

        {/* Right: Transaction Info */}
        <div>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Request Type:</span>{" "}
            {transaction.request_type}
        </p>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Status:</span>{" "}
            <span
            className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                transaction.status.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : transaction.status.toLowerCase() === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
            >
            {transaction.status}
            </span>
        </p>
        <p className="mb-1">
            <span className="font-semibold text-chart-5">Request Date:</span>{" "}
            {transaction.transaction_date}
        </p>
        <p>
            <span className="font-semibold text-chart-5">Price Label:</span>{" "}
            {transaction.price_label}
        </p>
        </div>
    </div>
    </div>

    {/* Swine List Table */}
   {/* Swine List Table */}
{swine_list && swine_list.length > 0 && (
  <div className="mt-6 bg-gray-50 rounded-xl border p-4 shadow-sm">
    <h3 className="text-lg font-semibold text-chart-5 mb-4">
      Swine List for This Transaction
    </h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3 border">Item ID</th>
            <th className="py-2 px-3 border">Sex</th>
            <th className="py-2 px-3 border">Breed</th>
            <th className="py-2 px-3 border">Age (days)</th>
           
      {/* ✅ Conditionally show Weight header */}
      {transaction.price_label !== "per_head" && (
        <th className="py-2 px-3 border">Weight (kg)</th>
      )}
          </tr>
        </thead>
        <tbody>
          {swine_list.map((item, index) => (
            <tr key={item.listing_swine_id} className="text-center border-t hover:bg-gray-100">
              <td className="py-2 px-3 border">{item.listing_swine_id}</td>
              <td className="py-2 px-3 border">{item.sex}</td>
              <td className="py-2 px-3 border">{item.breed}</td>
              <td className="py-2 px-3 border">{item.age_days}</td>
              
         {/* ✅ Conditionally render Weight cell */}
        {transaction.price_label !== "per_head" && (
         
          <td className="py-2 px-3 border">
              <div className="flex items-center justify-center gap-2">
                <Input
                  type="number"
                  min="0"
                  value={item.weight || ""}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  className="w-20 text-center"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    saveWeight(item.listing_swine_id, Number(item.weight))
                  }
                >
                  Save
                </Button>
              </div>
          
</td>
          
        )}


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}




            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Quantity */}
           {/* ✅ Quantity input (hidden when completed) */}
{!isCompleted && (
  <div>
    <Label>Quantity</Label>
    <Input
      type="number"
      min="1"
      value={data.final_quantity}
      onChange={(e) => setData("final_quantity", Number(e.target.value))}
    />
  </div>
)}

{!isCompleted && (
  <div>
    <Label className="mb-2 block">Choose Price Option</Label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {transaction.offer_amount && (
        <button
          type="button"
          onClick={() => setSelectedAmount(transaction.offer_amount!)}
          className={cn(
            "p-4 rounded-xl border text-left transition-all",
            selectedAmount === transaction.offer_amount
              ? "border-green-500 bg-green-50 shadow-md"
              : "border-gray-300 hover:border-green-300"
          )}
        >
          <h4 className="font-medium text-green-700">Buyer Offer</h4>
          <p className="text-lg font-semibold">
            ₱{transaction.offer_amount.toLocaleString()}{" "}
            <span className="text-sm text-gray-500">
              {transaction.price_label}
            </span>
          </p>
        </button>
      )}

      <button
        type="button"
        onClick={() => setSelectedAmount(transaction.original_amount)}
        className={cn(
          "p-4 rounded-xl border text-left transition-all",
          selectedAmount === transaction.original_amount
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-300 hover:border-blue-300"
        )}
      >
        <h4 className="font-medium text-blue-700">Original Price</h4>
        <p className="text-lg font-semibold">
          ₱{transaction.original_amount.toLocaleString()}{" "}
          <span className="text-sm text-gray-500">
            {transaction.price_label}
          </span>
        </p>
      </button>
    </div>
  </div>
)}

            {/* ✅ Final Amount Summary */}
<div className="bg-gray-100 p-4 rounded-lg border mt-2">
  <h3 className="text-lg font-semibold text-chart-5 mb-3">
    Final Amount Summary
  </h3>

  {isCompleted ? (
    <div className="space-y-2 text-sm">
      {/* ✅ Swine item breakdown */}
      {swine_list.map((item, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-gray-200 pb-1"
        >
          <span>
            Swine #{item.listing_swine_id}{" "}
            {transaction.price_label === "per_head"
              ? ""
              : `(${item.weight || 0} kg)`}
          </span>
          <span>
            ₱
            {(
              selectedAmount *
              (transaction.price_label === "per_head"
                ? 1
                : Number(item.weight || 0))
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      ))}

      {/* ✅ Show quantity here only when complete */}
      <div className="flex justify-between text-sm mt-2">
        <span>Quantity</span>
        <span>{data.final_quantity}</span>
      </div>

      {/* ✅ Total */}
      <div className="flex justify-between font-semibold mt-3 pt-2 border-t border-gray-300">
        <span>Total</span>
        <span>
          ₱
          {(selectedAmount * data.final_quantity).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  ) : (
    <h3 className="text-lg font-semibold">
      Final Total:{" "}
      <span className="text-primary">
        ₱
        {(selectedAmount * data.final_quantity).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </span>
    </h3>
  )}
</div>



              {/* <div className="flex justify-end mt-4">
                <Button type="submit" disabled={processing}>
                  Approve Transaction
                </Button>
              </div> */}
             
              <div className="flex justify-end gap-3 mt-6">
  {/* Show Approve only if still under review */}
  {transaction.status === "Seller Review" && (
    <Button type="submit" disabled={processing}>
      Approve Transaction
    </Button>
  )}

  {/* Show Complete only if approved or in process */}
  {["Seller Approved", "In Process"].includes(transaction.status) && (
    <Button
      type="button"
      onClick={() => {
       router.post(route("marketplace.transaction.complete", transaction.id), {
  quantity: data.final_quantity,
  selected_amount: selectedAmount,
}, {
  onSuccess: () => toast.success("Transaction completed!"),
  onError: () => toast.error("Failed to complete transaction."),
});
      }}
    >
      Complete Transaction
    </Button>
  )}
</div>

            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TransactionSetup;
