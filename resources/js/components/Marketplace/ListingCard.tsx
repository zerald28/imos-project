import React from 'react';
import { Link } from '@inertiajs/react';

export default function ListingCard({ listing, onManage }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <img src={listing.card_image ?? '/images/no-image.png'} className="w-full h-40 object-cover rounded mb-3" />
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">{listing.title}</div>
          <div className="text-sm text-gray-500">{listing.breed || listing.category}</div>
          <div className="text-sm mt-1">Available: {listing.available_quantity}</div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={onManage} className="btn btn-outline">Manage</button>
          <Link href={`/marketplace/seller/${listing.id}`} className="btn btn-primary">View</Link>
        </div>
      </div>
    </div>
  );
}
