import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { GeminiService } from './gemini/gemini.service';
import { GeminiModule } from './gemini/gemini.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { TagsModule } from './tags/tags.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
    GeminiModule,
    AuthorModule,
    CategoryModule,
    TagsModule,
    UploadModule,
    UserModule,
    NewsletterModule,
  ],
  controllers: [AppController],
  providers: [AppService, GeminiService],
})
export class AppModule {}
