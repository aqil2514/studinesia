import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { SupabaseModule } from '../../config/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
