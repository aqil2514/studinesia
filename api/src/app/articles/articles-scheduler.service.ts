import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticlesService } from './articles.service';
import { ArticleDB } from './articles.interface';

@Injectable()
export class ArticlesSchedulerService {
  private readonly logger = new Logger(ArticlesSchedulerService.name);

  constructor(private readonly articlesService: ArticlesService) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    this.logger.debug('Mengecek artikel yang dijadwalkan...');

    const scheduledArticles: ArticleDB[] =
      await this.articlesService.getScheduledArticles();

    if (!scheduledArticles || scheduledArticles.length === 0) {
      this.logger.debug('Tidak ada artikel yang waktunya tayang');
      return;
    }

    this.logger.debug(
      `Ada ${scheduledArticles.length} artikel yang siap dipublish`,
    );

    for (const article of scheduledArticles) {
      await this.articlesService.updateStatusArticleBySlug(
        article.slug,
        'published',
      );
      this.logger.debug(`Artikel "${article.slug}" berhasil dipublish`);
    }
  }
}
