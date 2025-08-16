export interface Category {
  id?: number;
  created_at?: string;
  name: string;
  slug: string;
  description: string;
}

export interface GetCategoryQuery {
  limit?: number;
  slug?: string;
}