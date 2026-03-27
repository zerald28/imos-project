export type StatProps = {
  totalFarmers: number;
  totalSwine: number;
  activeSwine: number;
  deadSwine: number;
  soldSwine: number;
};

export type PurposeCount = {
  purpose: string;
  total: number;
};

export type MonthlyMortality = {
  year: number;
  month: number;
  total: number;
};

export type BarangayDistribution = {
  barangay_id: number | null;
  barangay_name: string;
  total: number;
  total_swine: number;
};



export type ActivityLog = {
  id: number;
  action: string;
  module: string;
  meta: string;
  user_id: number | null;
  user_name?: string | null;
  created_at: string;
};
