import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}
  private readonly supabaseAdmin = this.supabaseService.getAdmin();
  private readonly tableName = 'users';

  async getUserByUserId(userId: string) {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('id', userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data[0];
  }
}
