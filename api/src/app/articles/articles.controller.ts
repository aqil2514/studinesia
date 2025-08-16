import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDB, ArticleTags } from './articles.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('')
  async getPublishedArticles(
    @Query() query: { mode: string; category_id: string },
  ) {
    const { mode, category_id } = query;
    if (mode) {
      switch (mode) {
        case 'published':
          return await this.articlesService.getPublishedArticles();
      }
    }

    if (category_id) return this.articlesService.getArticleByCategoryId(category_id);
  }

  @Get(':slug')
  async getArticleBySlug(@Param() param: { slug: string }) {
    const { slug } = param;

    return await this.articlesService.getArticleBySlug(slug);
  }

  @Post()
  async createNewArticle(@Body() payload: ArticleDB) {
    return await this.articlesService.createNewArticle(payload);
  }

  @Post('/article-tags')
  async createNewArticleTag(@Body() payload: ArticleTags[]) {
    return await this.articlesService.createNewArticleTag(payload);
  }
}
