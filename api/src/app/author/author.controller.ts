import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.interface';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('')
  async getAuthors() {
    return await this.authorService.getAuthors();
  }

  @Post('')
  async createNewAuthor(@Body() author: Author) {
    return await this.authorService.createNewAuthor(author);
  }
}
