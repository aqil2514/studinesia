import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Tag } from './tags.interface';
import { TagsService } from './tags.service';
import { JWTAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../decorators/role.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  /** GET ENDPOINT */
  @Get()
  async getTags() {
    const tags = await this.tagsService.getTags();

    const response: ResponseWithData<Tag[]> = {
      message: 'Data tag berhasil diambil',
      success: true,
      data: tags,
    };
    return response;
  }

  /** POST ENDPOINT */
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
