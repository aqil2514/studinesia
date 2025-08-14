import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { Readable } from 'stream';

@Injectable()
export class UploadService {

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(fileBuffer: Buffer, folder = 'studinesia') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        },
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  }
}
