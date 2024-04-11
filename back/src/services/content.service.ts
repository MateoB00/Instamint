import { BadRequestException, Injectable } from '@nestjs/common';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { User } from '../entities/user.entity';

@Injectable()
export class ContentService {
  constructor() {
    // Do nothing.
  }

  // Remove this after done create draft task
  // eslint-disable-next-line class-methods-use-this
  async uploadOriginalContent(file, user: User) {
    const allowedTypes = [
      'image/png',
      'image/webp',
      'audio/ogg',
      'audio/flac',
      'video/h264',
    ];
    const MAX_FILE_SIZE_BYTES = 1073741824;

    if (!allowedTypes.includes(file.mimetype)) {
      return new BadRequestException('File type not allowed');
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return new BadRequestException('File size exceeds the limit (1GB)');
    }

    const date = new Date().getTime();
    const storageRef = ref(
      storage,
      `drafts/${file.originalname}-${user.username}-${date}`,
    );

    const metadata = {
      author: user.username,
      date,
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      message: 'file uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL,
    };
  }
}
