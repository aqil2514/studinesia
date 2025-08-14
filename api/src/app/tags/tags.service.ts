import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { Tag } from './tags.interface';

@Injectable()
export class TagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase = this.supabaseService.getClient();
  private tableName = 'tags';

  async getTags() {
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

  async createNewTags(data: Tag) {
    const { error } = await this.supabase.from(this.tableName).insert(data);

    if (error) {
      console.error();
      throw error;
    }

    return { message: 'OK' };
  }
}
