export type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "ilike"
  | "like"
  | "in";

export interface Filter {
  key: string;
  operator: FilterOperator;
  value: unknown;
}

export interface QueryOptions {
  filters?: Filter[];
  sort?: { key: string; direction?: "asc" | "desc" }[];
  limit?: number;
  page?: number;
  select?: string;
}