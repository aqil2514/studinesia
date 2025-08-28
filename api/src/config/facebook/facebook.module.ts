import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
