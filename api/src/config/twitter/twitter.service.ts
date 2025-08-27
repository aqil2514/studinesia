import { Injectable, Logger } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);
  private client: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_TOKEN_SECRET,
    });
  }

  async postTweet(text: string) {
    try {
      const { data } = await this.client.v2.tweet(text);
      this.logger.log(`Tweet posted successfully: ${data.id}`);
      return data;
    } catch (error) {
      console.log(error);
      this.logger.error('Posting ke Twitter gagal', error);
      throw error;
    }
  }
}
