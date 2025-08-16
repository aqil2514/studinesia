import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getCategories(@Query() query) {
    const { limit } = query;
    if (limit) return await this.categoryService.getCategoryAndLimit(limit);

    return await this.categoryService.getCategories();
  }

  @Post('')
  async createNewCategory(@Body() body: Category) {
    return await this.categoryService.createNewCategory(body);
  }
}
