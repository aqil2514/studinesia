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
  ArticleWithAuthorAndCategory,
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
    const { mode, category_id, limit, page, type } = query;

    console.log(query);

    // MODE QUERY
    if (mode === 'published') {
      if (limit && page)
        return this.articlesService.getPublishedArticleAndLimit(page, limit);
      return this.articlesService.getPublishedArticles();
    } else if (mode === 'newest') {
      return await this.articlesService.getNewestArticles();
    }

    // CATEGORY QUERY
    if (category_id)
      return this.articlesService.getArticleByCategoryId(category_id);

    // TYPE QUERY
    if (type === 'full') {
      if (page)
        return this.articlesService.getAllArticlesWithPagination(limit, page);
      if (limit) return this.articlesService.getAllArticlesFullAndLimit(limit);
      return this.articlesService.getAllArticlesFull();
    }

    return this.articlesService.getAllArticles();
  }

  @Get('/query')
  async getArticleByQuery(
    @Query('query') query: string,
  ): Promise<ResponseWithData<ArticleWithAuthorAndCategory[]>> {
    const articles = await this.articlesService.getArticleByQuery(query);

    return {
      message: 'Pencarian Berhasil',
      success: true,
      data: articles,
    };
  }

  @Get(':slug')
  async getArticleBySlug(@Param() param: { slug: string }) {
    const { slug } = param;

    return await this.articlesService.getArticleBySlug(slug);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Get(':slug/admin')
  async getArticleBySlugAdmin(@Param() param: { slug: string }) {
    const { slug } = param;

    return await this.articlesService.getArticleBySlugAdmin(slug);
  }

  @Get(':slug/preview')
  async getArticleBySlugPreview(@Param() param: { slug: string }) {
    const { slug } = param;

    return await this.articlesService.getArticleBySlugAdmin(slug);
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
