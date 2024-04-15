import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NFT } from '../entities/nft.entity';
import { Like } from '../entities/like.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(NFT) private nftRepository: Repository<NFT>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {
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

    const contentRef = ref(
      storage,
      `drafts/${file.originalname}-${user.username}`,
    );

    const snapshot = await uploadBytesResumable(
      contentRef,
      file.buffer,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      message: 'content uploaded to firebase storage',
      name: file.originalname,
      type: file.mimetype,
      downloadURL,
      code: 200,
    };
  }

  async saveNFT(nft: NFT): Promise<NFT> {
    try {
      return await this.nftRepository.save(nft);
    } catch (error) {
      throw new Error(`Failed to save NFT to database: ${error.message}`);
    }
  }

  async getAllNFTsByUser(user: User): Promise<NFT[]> {
    return await this.nftRepository.find({ where: { user: user.id } });
  }

  async findNFTById(id: number): Promise<NFT | null> {
    const nft = await this.nftRepository.findOne({ where: { id } });
    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    return nft;
  }

  async getLikesCount(nftId: number): Promise<number> {
    const likesCount = await this.likeRepository.count({
      where: { nftId, isLike: true },
    });

    return likesCount;
  }

  async getDislikesCount(nftId: number): Promise<number> {
    const dislikesCount = await this.likeRepository.count({
      where: { nftId, isLike: false },
    });

    return dislikesCount;
  }

  async createLikeOrDislike(
    user: User,
    nft: NFT,
    isLike: boolean,
  ): Promise<Like> {
    const newLike = new Like();
    newLike.user = user.id;
    newLike.nftId = nft.id;
    newLike.isLike = isLike;

    return await this.likeRepository.save(newLike);
  }
}
