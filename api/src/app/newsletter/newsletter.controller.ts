import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('/subscribe')
  async subscribe(
    @Body() body: { name: string; email: string },
  ): Promise<BasicResponse> {
    const { email, name } = body;
    try {
      const action = await this.newsletterService.subscribe(name, email);

      if (action === 'SUBSCRIBED') {
        return {
          message: `Email ${email} sudah berlangganan`,
          success: true,
          status: 200,
        };
      }

      return {
        message: `Email sudah dikirim! Konfirmasi email anda ${email}`,
        success: true,
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Terjadi kesalahan',
        success: false,
      };
    }
  }

  @Get('/subscribe/confirm')
  async confirmSubscription(@Query('token') token: string) {
    return await this.newsletterService.confirmSubscription(token);
  }
}
