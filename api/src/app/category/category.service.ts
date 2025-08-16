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

  async getCategoryBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('slug', slug);

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) return [];

    return data;
  }

  async getCategoryAndLimit(limit: number) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .limit(limit);

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
      console.error(error);
      return {
        success: false,
        message: this.supabaseService.handleSupabaseError(error),
      };
    }

    return { success: true, message: 'OK' };
  }
}
