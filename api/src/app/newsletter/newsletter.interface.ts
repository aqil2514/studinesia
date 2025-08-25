export interface NewsletterDB {
  id?: number;
  email: string;
  name: string;
  is_confirmed: boolean;
  confirmation_token: string;
  created_at: string;
  updated_at: string;
}

export type NewsletterCode = 'SEND' | 'SUBSCRIBED';
