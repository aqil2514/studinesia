import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { SupabaseModule } from 'src/config/supabase/supabase.module';
import { TagsService } from '../tags/tags.service';
import { ArticlesSchedulerService } from './articles-scheduler.service';

@Module({
  imports:[HttpModule, SupabaseModule],
  providers: [ArticlesService, TagsService, ArticlesSchedulerService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
