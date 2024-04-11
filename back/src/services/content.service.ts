import { BadRequestException, Injectable } from '@nestjs/common';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
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
      throw new BadRequestException('File type not allowed');
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException('File size exceeds the limit (1GB)');
    }

    const fileName = `${file.originalname}-${user.username}`;

    const storageRef = ref(storage, `drafts`);
    const draftsList = await listAll(storageRef);
    const existingContents = draftsList.items.map((content) => content.name);

    if (existingContents.includes(fileName)) {
      throw new BadRequestException(
        'A content with the same name already exists',
      );
    }

    const metadata = {
      author: user.username,
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      message: 'content uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL,
    };
  }
}
