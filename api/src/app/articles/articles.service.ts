import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  ArticleDB,
  ArticleStatus,
  ArticleTags,
  ArticleWithAuthorAndCategory,
} from './articles.interface';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly supabaseService: SupabaseService,
    private readonly tagsService: TagsService,
  ) {}

  private supabase = this.supabaseService.getClient();
  private supabaseAdmin = this.supabaseService.getAdmin();
  private tableName = 'articles';

  /** GET FUNCTIONS */

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
      this.logger.error('Terjadi kesalahan saat ambil semua artikel');
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPublishedArticles() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('published_at', { ascending: false })
      .eq('status', 'published');

    if (error) {
      this.logger.error(
        'Terjadi kesalahan saat ambil artikel yang telah dipublish',
      );
      console.error(error);
      throw error;
    }

    return data;
  }

  async getNewestArticles() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('published_at', { ascending: false })
      .eq('status', 'published')
      .limit(6);

    if (error) {
      this.logger.error(
        'Terjadi kesalahan saat ambil artikel yang telah dipublish',
      );
      console.error(error);
      throw error;
    }

    return data;
  }

  async getPublishedArticleAndLimit(page: number, limit: number) {
    const from = Number((page - 1) * limit);
    const to = Number(page * limit - 1);
    const {
      data: articles,
      count,
      error,
    } = await this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('published_at', { ascending: false })
      .eq('status', 'published');

    if (error) {
      this.logger.error(
        'Terjadi kesalahan saat ambil artikel yang telah dipublish',
      );
      console.error(error);
      throw error;
    }

    return {
      articles,
      total: count ?? 0,
      page,
      limit,
      hasMore: page * limit < (count ?? 0),
    };
  }

  async getScheduledArticles() {
    const now = new Date().toISOString();

    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('published_at', { ascending: true })
      .eq('status', 'scheduled')
      .lte('published_at', now);

    if (error) {
      this.logger.error(
        'Terjadi kesalahan saat ambil artikel yang telah dijadwalkan',
      );
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
      this.logger.error('Terjadi kesalahan saat ambil artikel sesuai slug');
      console.error(error);
      throw error;
    }

    if (!data) {
      return [];
    }
    const article: ArticleWithAuthorAndCategory = data.map((ar) => ({
      ...ar,
    }))[0];

    const articleId = article?.id ?? '';

    const tags = await this.tagsService.getTagsByArticleId(String(articleId));

    const tagsName = tags.map((tag) => tag.tag_id.name);

    const articleWithTags: ArticleWithAuthorAndCategory = {
      ...article,
      tags: tagsName,
    };
    console.log(articleWithTags);

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

  /** CREATE OR POST FUNCTIONS */

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

  //** PUT OR UPDATE FUNCTIONS */

  async putArticle(payload: ArticleDB) {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .update(payload)
      .eq('slug', payload.slug)
      .select('*');

    if (error) {
      this.logger.error('Terjadi kesalahan saat edit artikel');
      console.error(error);
      throw error;
    }

    return { message: 'OK', data };
  }

  async putArticleTags(payload: ArticleTags[]) {
    if (!payload || payload.length === 0) return;

    await this.deleteArticleTags(payload[0].article_id);
    await this.createNewArticleTag(payload);
  }

  /** DELETE FUNCTIONS */

  async deleteArticleTags(articleId: number) {
    const { error } = await this.supabaseAdmin
      .from('article_tags')
      .delete()
      .eq('article_id', articleId);

    if (error) {
      this.logger.error('Terjadi kesalahan saat hapus tag artikel');
      console.error(error);
      throw error;
    }
  }

  /** PATCH FUNCTIONS */

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

  async updateStatusArticleBySlug(slug: string, status: ArticleStatus) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ status })
      .eq('slug', slug);

    if (error) {
      this.logger.error('Terjadi kesalahan saat update status artikel');
      console.error(error);
      throw error;
    }
  }
}
