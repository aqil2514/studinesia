import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../../config/supabase/supabase.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly supabaseService: SupabaseService) {}
  private readonly supabaseAdmin = this.supabaseService.getAdmin();
  private readonly tableName = 'users';

  async getUserByUserId(userId: string): Promise<User | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error(error);
      this.logger.error('Terjadi kesalahan saat mengambil data user');
      throw error;
    }

    if (!data) return null;

    return data as User;
  }
}
