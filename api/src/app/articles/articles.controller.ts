import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  ArticleDB,
  ArticleStatus,
  ArticleTags,
  GetQueryArticle,
} from './articles.interface';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /** GET ENDPOINT */
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

  /** POST ENDPOINT */
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

  /** PUT ENDPOINT */

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Put()
  async putArticle(@Body() payload: ArticleDB) {
    return await this.articlesService.putArticle(payload);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Put('/article-tags')
  async putArticleTag(@Body() payload: ArticleTags[]) {
    return await this.articlesService.putArticleTags(payload);
  }

  /** PATCH ENDPOINT */

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Patch(':slug/soft-delete')
  async softDeleteArticleBySlug(@Param('slug') slug: string) {
    return await this.articlesService.softDeleteArticleBySlug(slug);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Patch(':slug/status')
  async updateStatusArticleBySlug(
    @Param('slug') slug: string,
    @Body('status') status: ArticleStatus,
  ) {
    return await this.articlesService.updateStatusArticleBySlug(slug, status);
  }
}
