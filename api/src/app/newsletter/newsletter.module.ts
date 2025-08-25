import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { ResendModule } from 'src/config/resend/resend.module';
import { SupabaseModule } from 'src/config/supabase/supabase.module';

@Module({
  imports: [ResendModule, SupabaseModule],
  providers: [NewsletterService],
  controllers: [NewsletterController],
  exports: [NewsletterService],
})
export class NewsletterModule {}
