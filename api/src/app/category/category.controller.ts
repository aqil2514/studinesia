import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, GetCategoryQuery } from './category.interface';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';

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

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('')
  async createNewCategory(@Body() body: Category) {
    return await this.categoryService.createNewCategory(body);
  }
}
