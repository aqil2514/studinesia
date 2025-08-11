import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}
  @Post('article')
  async generateArticleContent(@Body() body: any) {
    const { title, description }: { title: string; description: string } = body;
    return await this.geminiService.generateText(title, description);
  }
}
