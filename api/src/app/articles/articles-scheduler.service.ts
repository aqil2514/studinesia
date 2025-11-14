import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticlesService } from './articles.service';
import { ArticleDB } from './articles.interface';
import { ResendService } from '../../config/resend/resend.service';
import { NewsletterService } from '../newsletter/newsletter.service';
import { baseSiteUrl } from '../../config/sites';
import { TwitterService } from '../../config/twitter/twitter.service';
import { generateTweet } from '../../config/twitter/twitter.tweet';
import { FacebookService } from '../../config/facebook/facebook.service';
import { createSocialPostMessage } from '../../config/facebook/facebook.post';

@Injectable()
export class ArticlesSchedulerService {
  private readonly logger = new Logger(ArticlesSchedulerService.name);

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly resendService: ResendService,
    private readonly newsletterService: NewsletterService,
    private readonly twitterService: TwitterService,
    private readonly facebookService: FacebookService,
  ) {}

  // Buat Debug
  // @Cron('*/10 * * * * *')
  // // DEBUG AREA

  // const testArticle = await this.articlesService.getArticleBySlug(
    // 'apa-itu-frugal-living-panduan-lengkap-untuk-pemula',
  // );
  // await this.twitterService.postTweet(generateTweet(testArticle));
  // await this.facebookService.postToPage(
    // createSocialPostMessage(testArticle),
    // `${baseSiteUrl}/articles/${testArticle.slug}`,
  // );

  // // DEBUG AREA
  @Cron('0 */5 * * * *')
  async handleCron() {

    this.logger.debug('Mengecek artikel yang dijadwalkan...');

    const scheduledArticles: ArticleDB[] =
      await this.articlesService.getScheduledArticles();

    if (!scheduledArticles || scheduledArticles.length === 0) {
      this.logger.debug('Tidak ada artikel yang waktunya tayang');
      return;
    }

    const subscribers = await this.newsletterService.getSubscriber();

    this.logger.debug(
      `Ada ${scheduledArticles.length} artikel yang siap dipublish`,
    );

    for (const article of scheduledArticles) {
      await this.articlesService.updateStatusArticleBySlug(
        article.slug,
        'published',
      );
      this.logger.debug(`Artikel "${article.slug}" berhasil dipublish`);

      const fullArticle = await this.articlesService.getArticleBySlug(
        article.slug,
      );

      await this.twitterService.postTweet(generateTweet(fullArticle));
      await this.facebookService.postToPage(
        createSocialPostMessage(fullArticle),
        `${baseSiteUrl}/articles/${fullArticle.slug}`,
      );

      for (const subscriber of subscribers) {
        await this.resendService.sendNewArticleEmail(
          subscriber.email,
          subscriber.name,
          article.title,
          `${baseSiteUrl}/articles/${article.slug}`,
        );
      }
    }
  }
}
