import { Injectable, Logger } from '@nestjs/common';
import axios, { Axios, isAxiosError } from 'axios';
import {
  FacebookPageResponse,
  FacebookTokenMetadata,
} from './facebook.interface';
import { SupabaseService } from '../supabase/supabase.service';
import { IntegrationTokensDB } from '../integration-tokens/integration-tokens.interface';

@Injectable()
export class FacebookService {
  private readonly logger = new Logger(FacebookService.name);
  private readonly pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  private readonly pageId = process.env.FACEBOOK_PAGE_ID;
  private readonly clientId = process.env.FACEBOOK_CLIENT_ID;
  private readonly clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  private api: Axios;

  constructor(private readonly supabaseService: SupabaseService) {
    this.api = axios.create({
      baseURL: `https://graph.facebook.com/v23.0`,
    });
  }

  async exchangeToLongLivedToken(short_lived_token: string) {
    try {
      const { data } = await this.api.get('/oauth/access_token', {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          fb_exchange_token: short_lived_token,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getAccessPageToken(): Promise<
    (IntegrationTokensDB<FacebookTokenMetadata> | null)[]
  > {
    const { data, error } = await this.supabaseService
      .getAdmin()
      .from('integration_tokens')
      .select('*')
      .eq('provider', 'facebook');

    if (error) {
      console.error(error);
      throw error;
    }

    const tokens = data?.map((token: any) => ({
      ...token,
      metadata: token.metadata as FacebookTokenMetadata,
    }));

    return tokens;
  }

  async postToPage(message: string, link?: string) {
    const rawToken = await this.getAccessPageToken();
    if (!rawToken) {
      throw new Error('Page akses tidak ditemukan');
    }

    const access_token = rawToken[0].access_token;
    try {
      const payload = {
        message,
        link,
        published: true,
        access_token,
      };
      await this.api.post(`/${this.pageId}/feed`, payload);

      this.logger.debug('Berhasil terbitkan post baru');
    } catch (error) {
      console.error(error);
      this.logger.error('Terjadi kesalahan saat posting artikel');
      throw error;
    }
  }
}
