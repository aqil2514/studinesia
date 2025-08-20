import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDB, ArticleTags, GetQueryArticle } from './articles.interface';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('')
  async getArticles(@Query() query: GetQueryArticle) {
    const { mode, category_id } = query;
    if (mode) {
      switch (mode) {
        case 'published':
          return await this.articlesService.getPublishedArticles();
      }
    }

    if (category_id)
      return this.articlesService.getArticleByCategoryId(category_id);

    return this.articlesService.getAllArticles();
  }

  @Get(':slug')
  async getArticleBySlug(@Param() param: { slug: string }) {
    const { slug } = param;

    return await this.articlesService.getArticleBySlug(slug);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Patch(':slug/soft-delete')
  async softDeleteArticleBySlug(@Param('slug') slug: string) {
    console.log(slug);
    return await this.articlesService.softDeleteArticleBySlug(slug);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post()
  async createNewArticle(@Body() payload: ArticleDB) {
    return await this.articlesService.createNewArticle(payload);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('/article-tags')
  async createNewArticleTag(@Body() payload: ArticleTags[]) {
    return await this.articlesService.createNewArticleTag(payload);
  }
}
