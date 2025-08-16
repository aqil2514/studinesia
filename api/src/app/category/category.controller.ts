import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, GetCategoryQuery } from './category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getCategories(@Query() query: GetCategoryQuery) {
    const { limit, slug } = query;
    if (limit) return await this.categoryService.getCategoryAndLimit(limit);
    else if (slug) return await this.categoryService.getCategoryBySlug(slug);

    return await this.categoryService.getCategories();
  }

  @Post('')
  async createNewCategory(@Body() body: Category) {
    return await this.categoryService.createNewCategory(body);
  }
}
