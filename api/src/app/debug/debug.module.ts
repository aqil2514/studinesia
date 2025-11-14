import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';
import { FacebookModule } from '../../config/facebook/facebook.module';

@Module({
  imports: [FacebookModule],
  controllers: [DebugController],
})
export class DebugModule {}
