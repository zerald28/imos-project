// swine/types.ts
export interface Swine {
    id: number;
    name: string;
    owner_id: number;
    expenses_count?: number;
    total_expense?: number;
}

export interface DemoPage {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
}

// types.ts
export type TableVariant = "simple" | "striped" | "bordered" | "card";
export type CollapsibleType = "none" | "row" | "section";

export interface TableColumn<T> {
  key: keyof T;           // data key
  label: string;          // column title
  render?: (item: T) => React.ReactNode; // custom cell renderer
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  variant?: TableVariant;
  collapsible?: CollapsibleType;
  onRowClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  filterable?: boolean;
  sortable?: boolean;
}

