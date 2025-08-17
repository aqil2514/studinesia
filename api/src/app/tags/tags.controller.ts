import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Tag } from './tags.interface';
import { TagsService } from './tags.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('')
  async createNewTags(@Body() body: Tag) {
    return await this.tagsService.createNewTags(body);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('/bulks')
  async createBulksNewTags(@Body() body: Tag[]) {
    return await this.tagsService.createBulksNewTags(body);
  }
}
