import { Injectable, Logger } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IntegrationTokensDB } from './integration-tokens.interface';

@Injectable()
export class IntegrationTokensService {
  private readonly logger = new Logger(IntegrationTokensService.name);

  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Simpan token baru atau update jika sudah ada
   */
  async upsertToken<T = unknown>(
    token: IntegrationTokensDB<T>,
  ): Promise<IntegrationTokensDB<T> | null> {
    const { data, error } = await this.supabase
      .from('integration_tokens')
      .upsert(token)
      .select()
      .single();

    if (error) {
      this.logger.error(`Gagal menyimpan token: ${error.message}`);
      throw error;
    }

    return data as IntegrationTokensDB<T>;
  }

  /**
   * Ambil token berdasarkan provider + account_id
   */
  async getToken<T = unknown>(
    provider: string,
    accountId: string,
  ): Promise<IntegrationTokensDB<T> | null> {
    const { data, error } = await this.supabase
      .from('integration_tokens')
      .select('*')
      .eq('provider', provider)
      .eq('account_id', accountId)
      .single();

    if (error) {
      this.logger.warn(
        `Token tidak ditemukan untuk provider=${provider}, accountId=${accountId}`,
      );
      return null;
    }

    return data as IntegrationTokensDB<T>;
  }

  /**
   * Hapus token berdasarkan provider + account_id
   */
  async deleteToken(provider: string, accountId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('integration_tokens')
      .delete()
      .eq('provider', provider)
      .eq('account_id', accountId);

    if (error) {
      this.logger.error(
        `Gagal menghapus token untuk provider=${provider}, accountId=${accountId}`,
      );
      return false;
    }

    return true;
  }
}
