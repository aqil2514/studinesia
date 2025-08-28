import { Module } from '@nestjs/common';
import { IntegrationTokensService } from './integration-tokens.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [IntegrationTokensService],
  exports: [IntegrationTokensService],
})
export class IntegrationTokensModule {}
