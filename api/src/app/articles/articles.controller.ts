import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDB, ArticleTags } from './articles.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Get()
  getIndonesianArticles(@Query() params: { query: string }) {
    const { query } = params;

    return this.articlesService.getIndonesianArticles(query);
  }

  @Get("/published")
  async getPublishedArticles() {
    return await this.articlesService.getPublishedArticles();
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
