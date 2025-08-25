import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticlesService } from './articles.service';
import { ArticleDB } from './articles.interface';
import { ResendService } from 'src/config/resend/resend.service';
import { NewsletterService } from '../newsletter/newsletter.service';
import { baseSiteUrl } from 'src/config/sites';

@Injectable()
export class ArticlesSchedulerService {
  private readonly logger = new Logger(ArticlesSchedulerService.name);

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly resendService: ResendService,
    private readonly newsletterService: NewsletterService,
  ) {}

  @Cron('0 */5 * * * *')
  // Buat Debug
  // @Cron('*/10 * * * * *')
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
