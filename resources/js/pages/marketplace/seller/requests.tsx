import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function SellerRequests() {
  const { requests }: any = usePage().props;

  const statusColor = (status: string) => {
  switch (status) {
    case 'pending_request':
      return 'bg-yellow-100 text-yellow-800';
    case 'seller_review':
      return 'bg-blue-100 text-blue-800';
    case 'seller_approved':
      return 'bg-green-100 text-green-800';
    case 'buyer_confirmed':
      return 'bg-indigo-100 text-indigo-800';
    case 'in_progress':
      return 'bg-purple-100 text-purple-800';
    case 'completed':
      return 'bg-green-200 text-green-900';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const requestTypeColor = (type: string) => {
  switch (type) {
    case 'purchase':
      return 'bg-green-100 text-green-800';
    case 'reservation':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};



  return (
    <AppLayout>
      <Head title="Seller Requests" />

      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Swine Requests & Transactions</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto ">
          <table className="min-w-full table-fixed border  border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 w-10">No.</th>
                <th className="px-4 py-2 w-36">Buyer Name</th>
                <th className="px-4 py-2 w-36">Contact</th>
                <th className="px-4 py-2 w-28">Request Type</th>
                <th className="px-4 py-2 w-20">Quantity</th>
                <th className="px-4 py-2 w-24">Amount</th>
                <th className="px-4 py-2 w-32">Status</th>
                <th className="px-4 py-2 w-32">Date</th>
              </tr>
            </thead>
         <tbody>
  {requests.map((r: any, idx: number) => (
    <tr key={r.transaction_id} className="border-t border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-2">{idx + 1}</td>
      <td className="px-4 py-2">{r.buyer_name}</td>
      <td className="px-4 py-2">{r.contact}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${requestTypeColor(r.request)}`}
        >
          {r.request.charAt(0).toUpperCase() + r.request.slice(1)}
        </span>
      </td>
      <td className="px-4 py-2">{r.quantity}</td>
      <td className="px-4 py-2">{r.amount.toFixed(2)}</td>
   <td className="px-4 py-2">
  <span
    className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(r.raw_status)}`}
  >
    {r.status} {/* Already formatted from backend */}
  </span>
</td>

<td className="px-4 py-2">{r.transaction_date}</td> {/* Only date now */}

    </tr>
  ))}
</tbody>


          </table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
