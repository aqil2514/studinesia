import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SupabaseModule } from '../../config/supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  providers: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}
