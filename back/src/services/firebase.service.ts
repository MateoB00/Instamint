import { BadRequestException, Injectable } from '@nestjs/common';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../config/firebase.config';

@Injectable()
export class FirebaseService {
  constructor() {
    // Do nothing.
  }

  async uploadOriginalContent(userId, file, metadata) {
    const existingOriginalContents = await this.getAllUrlsItemsByUser(
      userId,
      'original-content',
    );
    const existingOriginalContentsNames = existingOriginalContents.map(
      (originalContent) => originalContent.name,
    );

    if (existingOriginalContentsNames.includes(file.originalname)) {
      throw new BadRequestException(
        'A original content with the same name already exists',
      );
    }

    const contentRef = ref(
      storage,
      `original-content/${userId}/${file.originalname}`,
    );

    const snapshot = await uploadBytesResumable(
      contentRef,
      file.buffer,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllUrlsItemsByUser(
    userId: number,
    itemFolder: 'original-content' | 'draft',
  ) {
    const storageRef = ref(storage, `${itemFolder}/${userId}`);

    const originalContentList = await listAll(storageRef);

    const downloadUrls = await Promise.all(
      originalContentList.items.map((item) => getDownloadURL(item)),
    );

    return downloadUrls.map((url, index) => ({
      name: originalContentList.items[index].name,
      path: originalContentList.items[index].fullPath,
      url,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  async moveOriginalContentToDraft(
    oldPath: string,
    oldUrl: string,
    newPath: string,
  ) {
    const oldRef = ref(storage, oldPath);
    const newRef = ref(storage, newPath);

    try {
      const originalContent = await fetch(oldUrl);
      const blob = await originalContent.blob();

      await uploadBytesResumable(newRef, blob);

      await deleteObject(oldRef);

      const downloadURL = await getDownloadURL(newRef);

      return downloadURL;
    } catch (error) {
      throw error;
    }
  }
}
