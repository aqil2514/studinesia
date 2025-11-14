import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { ResendModule } from '../../config/resend/resend.module';
import { SupabaseModule } from '../../config/supabase/supabase.module';

@Module({
  imports: [ResendModule, SupabaseModule],
  providers: [NewsletterService],
  controllers: [NewsletterController],
  exports: [NewsletterService],
})
export class NewsletterModule {}
