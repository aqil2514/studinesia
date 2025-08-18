import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  ArticleDB,
  ArticleTags,
  ArticleWithAuthorAndCategory,
} from './articles.interface';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly supabaseService: SupabaseService,
    private readonly tagsService: TagsService,
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

  async getAllArticles() {
    const { error, data } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('published_at', { ascending: false })
      .is('deleted_at', null);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPublishedArticles() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .is('deleted_at', null);

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

    if (!data) {
      return [];
    }
    const article: ArticleWithAuthorAndCategory = data[0];

    const articleId = article?.id ?? '';

    const tags = await this.tagsService.getTagsByArticleId(String(articleId));

    const tagsName = tags.map((tag) => tag.tag_id.name);

    const articleWithTags: ArticleWithAuthorAndCategory = {
      ...article,
      tags: tagsName,
    };

    return articleWithTags;
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
    const { error } = await this.supabaseAdmin
      .from('article_tags')
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async softDeleteArticleBySlug(slug: string) {
    const now = new Date().toISOString();
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ deleted_at: now })
      .eq('slug', slug);

    if (error) {
      console.error(error);
      throw error;
    }

    return { message: 'OK' };
  }
}
