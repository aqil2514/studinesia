import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { Category } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase = this.supabaseService.getClient();
  private tableName = 'category';

  async getCategories() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return [];

    return data;
  }

  async createNewCategory(data: Category) {
    const { error } = await this.supabase.from(this.tableName).insert(data);

    if (error) {
      console.error();
      throw error;
    }

    return { message: 'OK' };
  }
}
