import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { SupabaseModule } from '../../config/supabase/supabase.module';
import { TagsService } from '../tags/tags.service';
import { ArticlesSchedulerService } from './articles-scheduler.service';
import { ResendModule } from '../../config/resend/resend.module';
import { NewsletterModule } from '../newsletter/newsletter.module';
import { TwitterModule } from '../../config/twitter/twitter.module';
import { FacebookModule } from '../../config/facebook/facebook.module';

@Module({
  imports:[HttpModule, SupabaseModule, ResendModule, NewsletterModule, TwitterModule, FacebookModule],
  providers: [ArticlesService, TagsService, ArticlesSchedulerService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
