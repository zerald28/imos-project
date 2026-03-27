export type Swine = {
  id: number;
  tag_number: string;
  sex: "male" | "female";
  stage: string;
  purpose: string;
  category: string;
breed?: { id: number; name: string } | null; // ✅ add id here
  cuztom_breed?: string | null;
  weight?: number;
  birthdate: string; // YYYY-MM-DD

    category_readable?: string;
  purpose_readable?: string;
  stage_readable?: string;

  description?: string;
  status: string;
  owner?: { id: number; name: string };
  // expenses: { id: number; item: string; amount: number; date: string }[];
  groups: { id: number; name: string; group_type: string }[];
  listings: { id: number; title: string; available_quantity: number }[];
}
