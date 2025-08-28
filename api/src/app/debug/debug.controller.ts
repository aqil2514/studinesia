import { Controller, Get } from '@nestjs/common';
import { FacebookService } from 'src/config/facebook/facebook.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('/facebook')
  async debugFacebook() {
    return await this.facebookService.postToPage('TEST');
  }
}
