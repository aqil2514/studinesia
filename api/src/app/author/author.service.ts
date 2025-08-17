import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { Author } from './author.interface';

@Injectable()
export class AuthorService {
  constructor(private readonly supabaseService: SupabaseService) {}
  private tableName: string = 'author';
  private supabase = this.supabaseService.getClient();
  private supabaseAdmin = this.supabaseService.getAdmin();

  async createNewAuthor(data: Author) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(data);

    if (error) {
      console.error(error);

      throw error;
    }

    return { message: 'OK' };
  }

  async getAuthors() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return { authors: [] };

    return data;
  }
}
