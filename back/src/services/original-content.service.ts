import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FirebaseService } from './firebase.service';

@Injectable()
export class OriginalContentService {
  constructor(private readonly firebaseService: FirebaseService) {
    // Do nothing.
  }

  async uploadOriginalContent(file, user: User) {
    this.checkTypeOfFile(file);

    const metadata = {
      author: user.username,
      contentType: file.mimetype,
    };

    const downloadURL = await this.firebaseService.uploadOriginalContent(
      user.id,
      { originalname: file.originalname, buffer: file.buffer },
      metadata,
    );

    return {
      message: 'content uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL,
    };
  }

  async getAllByUser(userId: number) {
    const originalContents = await this.firebaseService.getAllUrlsItemsByUser(
      userId,
      'original-content',
    );

    return originalContents;
  }

  async deleteOne(userId: number, path: string) {
    const response = await this.firebaseService.deleteOneOriginalContent(
      userId,
      path,
    );

    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  private checkTypeOfFile(file) {
    const MAX_FILE_SIZE_BYTES = 1073741824;
    const allowedTypes = [
      'image/png',
      'image/webp',
      'audio/ogg',
      'audio/flac',
      'video/mp4',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException('File size exceeds the limit (1GB)');
    }
  }
}
