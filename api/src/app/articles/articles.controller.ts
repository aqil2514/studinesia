import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Get()
  getIndonesianArticles(@Query() params: { query: string }) {
    const { query } = params;

    return this.articlesService.getIndonesianArticles(query);
  }
}
