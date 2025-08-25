import { Injectable, Logger } from '@nestjs/common';
import { ResendService } from 'src/config/resend/resend.service';
import { randomUUID } from 'crypto';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { NewsletterCode, NewsletterDB } from './newsletter.interface';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class NewsletterService {
  private tableName = 'newsletter_subscribers';
  private supabaseClient: SupabaseClient;
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly resendService: ResendService,
    private readonly supabaseService: SupabaseService,
  ) {
    this.supabaseClient = this.supabaseService.getClient();
  }

  async getNewsletterSubscribeInfoByEmail(
    email: string,
  ): Promise<NewsletterDB | null> {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      this.logger.error(error.message);
      throw error;
    }

    if (!data) return null;

    return data;
  }

  async createNewsletterSubscribe(payload: NewsletterDB) {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .insert(payload);

    if (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async createOrUploadNewsletterSubscribe(payload: NewsletterDB) {
    const existData = await this.getNewsletterSubscribeInfoByEmail(
      payload.email,
    );
    if (!existData) return this.createNewsletterSubscribe(payload);

    if (!existData.is_confirmed) return this.uploadNewsletterSubscribe(payload);
  }

  async uploadNewsletterSubscribe(payload: NewsletterDB) {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .update(payload)
      .eq('email', payload.email);

    if (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async patchIsConfirmedSubscription(
    token: string,
  ): Promise<ResponseWithData<NewsletterDB>> {
    const { error, data } = await this.supabaseClient
      .from(this.tableName)
      .update({ is_confirmed: true })
      .eq('confirmation_token', token)
      .select('*')
      .maybeSingle();

    if (error || !data) {
      this.logger.error('Something error', error.stack);
      throw error;
    }

    return {
      message: 'Berhasil',
      success: true,
      data,
    };
  }

  async isSubscribedEmail(email: string): Promise<boolean> {
    const existData = await this.getNewsletterSubscribeInfoByEmail(email);

    if (existData?.is_confirmed) return true;

    return false;
  }

  async subscribe(name: string, email: string): Promise<NewsletterCode> {
    const token = randomUUID();

    const isSubscribed = await this.isSubscribedEmail(email);

    if (isSubscribed) return 'SUBSCRIBED';

    const confirmUrl = `https://studinesia.online/newsletter/confirm?token=${token}`;

    const payload: NewsletterDB = {
      confirmation_token: token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email,
      is_confirmed: false,
      name,
    };

    try {
      await Promise.all([
        this.createOrUploadNewsletterSubscribe(payload),
        this.resendService.sendConfirmationEmail(email, name, confirmUrl),
      ]);

      this.logger.log(`✅ Email konfirmasi berhasil dikirim ke ${email}`);
      return 'SEND';
    } catch (error) {
      console.error(error);
      this.logger.error(`Terjadi kesalahan saat mengirim email`);
      throw error;
    }
  }

  async confirmSubscription(token: string) {
    const { data } = await this.patchIsConfirmedSubscription(token);
    const { name, email } = data;

    await this.resendService.sendSubscriptionEmail(email, name);
  }
}
