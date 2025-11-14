import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import { JWTAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../decorators/role.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Role('admin')
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    if (!file) {
      throw new BadRequestException('Tidak ada file yang diupload');
    }

    const result = await this.uploadService.uploadImage(
      file.buffer,
      folder || 'studinesia',
    );

    return { url: result['secure_url'] };
  }

  @Post('/image/n8n')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async uploadImageN8N(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    if (!file) {
      throw new BadRequestException('Tidak ada file yang diupload');
    }

    const result = await this.uploadService.uploadImage(
      file.buffer,
      folder || 'studinesia',
    );

    return { url: result['secure_url'] };
  }

}
