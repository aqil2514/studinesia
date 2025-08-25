import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import {
  newsletterEmailHtml,
  subscriptionConfirmationEmail,
} from './resend.email-html';

@Injectable()
export class ResendService {
  private resend: Resend;
  private readonly logger = new Logger(ResendService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendConfirmationEmail(email: string, name: string, confirmUrl: string) {
    try {
      await this.resend.emails.send({
        from: 'Studinesia <noreply@studinesia.io>',
        to: email,
        subject: 'Konfirmasi Langganan',
        html: subscriptionConfirmationEmail(name, confirmUrl),
        text: `Halo ${name},\n\nTerima kasih sudah mendaftar Studinesia.\nSilakan konfirmasi langganan Anda dengan klik link berikut: ${confirmUrl}`,
      });
    } catch (error) {
      this.logger.error(
        `❌ Gagal mengirim email ke ${email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async sendSubscriptionEmail(email: string, name: string) {
    try {
      await this.resend.emails.send({
        from: 'Studinesia <noreply@studinesia.io>',
        to: email,
        subject: 'Selamat Berlangganan!',
        html: newsletterEmailHtml(name, email),
      });
    } catch (error) {
      this.logger.error(
        `❌ Gagal mengirim email ke ${email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
