import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';

@Module({
  imports:[HttpModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
