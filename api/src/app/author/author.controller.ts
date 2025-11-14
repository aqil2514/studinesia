import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.interface';
import { JWTAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../decorators/role.decorator';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('')
  async getAuthors() {
    return await this.authorService.getAuthors();
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('')
  async createNewAuthor(@Body() author: Author) {
    return await this.authorService.createNewAuthor(author);
  }
}
