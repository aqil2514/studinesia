export interface FacebookPageCategory {
  id: string;
  name: string;
}

export interface FacebookTokenMetadata {
  type: "page" | "user";
  page_id?: string;      
  page_name?: string;
  user_id: string;
  app_id: string;
  scopes: string[];
  issued_at: number;              
  expires_at?: number | null;     
  data_access_expires_at?: number | null; 
}


export interface FacebookPageData {
  access_token: string;
  category: string;
  category_list: FacebookPageCategory[];
  name: string;
  id: string;
  tasks: string[];
}

export interface FacebookPagingCursors {
  before: string;
  after: string;
}

export interface FacebookPaging {
  cursors: FacebookPagingCursors;
}

export interface FacebookPageResponse {
  data: FacebookPageData[];
  paging: FacebookPaging;
}
