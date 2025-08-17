export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface DBUser {
  id: string;
  name: string;
  email: string;
  image: string;
  is_admin: boolean;
}
