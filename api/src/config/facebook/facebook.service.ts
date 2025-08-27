import { Injectable, Logger } from '@nestjs/common';
import axios, { Axios } from 'axios';

@Injectable()
export class FacebookService {
  private readonly logger = new Logger(FacebookService.name);
  private readonly pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  private readonly pageId = process.env.FACEBOOK_PAGE_ID;
  private api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: `https://graph.facebook.com/v23.0/${this.pageId}/feed`,
    });
  }

  async postToPage(message: string, link?: string) {
    try {
      const payload = {
        message,
        link,
        published: true,
        access_token: this.pageAccessToken,
      };
      const { data } = await this.api.post('/', payload);

      console.log(data);
    } catch (error) {
      console.error(error);
      this.logger.error('Terjadi kesalahan saat posting artikel');
      throw error;
    }
  }
}
