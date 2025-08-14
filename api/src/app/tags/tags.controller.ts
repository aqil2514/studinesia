import { Body, Controller, Post } from '@nestjs/common';
import { Tag } from './tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

    constructor(
        private readonly tagsService:TagsService
    ){}

    @Post('')
      async createNewTags(@Body() body: Tag) {
        return await this.tagsService.createNewTags(body);
      }
}
