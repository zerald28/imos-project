// ✅ resources/js/types/marketplace.ts
export interface Address {
  street?: string;
  purok?: string;
  barangay?: string;
  municipal?: string;
  province?: string;
  full_address?: string;
}

export interface ListingSwine {
  id: number;
  swine_id: number;
  status: string;
  scaled_weight?: number | null;
}

export interface MarketplaceListing {
  id: number;
  title: string;
  category: string;
  price_per_unit: number;
  price_unit_type: string;
  available_quantity: number;
  image?: string | null;
  full_address?: string;
  created_at: string;
  listing_swine?: ListingSwine[];
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profile?: {
    avatar?: string | null;
    province?: string | null;
    municipal?: string | null;
    barangay?: string | null;
  };
}
