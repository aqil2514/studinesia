export type FilterOperator =
  | "eq" // sama dengan
  | "neq" // tidak sama dengan
  | "lt" // kurang dari
  | "lte" // kurang dari atau sama
  | "gt" // lebih dari
  | "gte" // lebih dari atau sama
  | "like" // mengandung (case-insensitive)
  | "ilike" // mengandung (insensitive, pattern)
  | "in"; // termasuk dalam array

export interface FilterState {
  key: string;
  operator: FilterOperator;
  value: string | number | boolean | string[];
}
