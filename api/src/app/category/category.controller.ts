import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Post('')
  async createNewCategory(@Body() body: Category) {
    return await this.categoryService.createNewCategory(body);
  }
}
