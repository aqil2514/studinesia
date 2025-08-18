import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { SupabaseModule } from 'src/config/supabase/supabase.module';
import { TagsService } from '../tags/tags.service';

@Module({
  imports:[HttpModule, SupabaseModule],
  providers: [ArticlesService, TagsService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
