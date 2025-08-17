import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { Tag } from './tags.interface';

@Injectable()
export class TagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabase = this.supabaseService.getClient();
  private supabaseAdmin = this.supabaseService.getAdmin();
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

  async getBulksTagsBySlug(slug: string[]) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .in('slug', slug);

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Tag[];
  }

  async createNewTags(data: Tag) {
    const { error } = await this.supabaseAdmin.from(this.tableName).insert(data);

    if (error) {
      console.error(error);
      throw error;
    }

    return { message: 'OK' };
  }

  async createBulksNewTags(tagsData: Tag[]) {
    const slugs = await this.getBulksTagsBySlug(tagsData.map((td) => td.slug));

    const existingSlugs = new Set<string>(slugs.map((s) => s.slug));

    const newTags = tagsData.filter((td) => !existingSlugs.has(td.slug));

    if (newTags.length === 0) {
      return { message: 'OK', tags: slugs };
    }

    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(newTags)
      .select();

    if (error) {
      console.error(error);
      throw error;
    }

    if (!data) {
      return { message: 'OK', tags: [] };
    }

    const tags = [...slugs, ...data];

    return { message: 'OK', tags };
  }
}
