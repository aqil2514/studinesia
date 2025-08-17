import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ArticleDB, ArticleTags } from './articles.interface';
import { SupabaseService } from 'src/config/supabase/supabase.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private supabase = this.supabaseService.getClient();
  private supabaseAdmin = this.supabaseService.getAdmin();
  private tableName = 'articles';

  async getIndonesianArticles(query: string) {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&language=id&apiKey=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPublishedArticles() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getArticleBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*, author_id(name, id), category_id(id, name, slug)')
      .eq('slug', slug);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getArticleByCategoryId(categoryId: string) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*, author_id(name, id), category_id(id, name, slug)')
      .eq('category_id', categoryId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async createNewArticle(payload: ArticleDB) {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(payload)
      .select();
    if (error) {
      console.error(error);
      throw error;
    }

    return { message: 'OK', data };
  }

  async createNewArticleTag(payload: ArticleTags[]) {
    const { error } = await this.supabaseAdmin.from('article_tags').insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
