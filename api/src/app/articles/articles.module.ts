import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { HttpModule } from '@nestjs/axios';
import { ArticlesController } from './articles.controller';
import { SupabaseModule } from 'src/config/supabase/supabase.module';

@Module({
  imports:[HttpModule, SupabaseModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
