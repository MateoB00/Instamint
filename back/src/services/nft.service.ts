import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nft } from '../entities/nft.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { FirebaseService } from './firebase.service';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(Nft) private nftRepository: Repository<Nft>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private firebaseService: FirebaseService,
  ) {
    // Do nothing.
  }

  async createDraft(email: string, draft: Nft) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    draft.user = existingUser;

    if (draft.description === '' || draft.description === null) {
      throw new BadRequestException('Description cannot nullable');
    }

    const originalPath = draft.pathFirebase;
    const newDraftPath = originalPath.replace('original-content', 'draft');
    const downloadUrl = await this.firebaseService.moveOriginalContentToDraft(
      originalPath,
      draft.mediaUrl,
      newDraftPath,
    );

    draft.mediaUrl = downloadUrl;

    const response = await this.nftRepository.save(draft);

    return response;
  }

  async updateDraft(loggedInUser, changesDraft) {
    const existingDraft = await this.nftRepository.findOne({
      where: { isDraft: true, mediaUrl: changesDraft.mediaUrl },
      relations: ['user'],
    });

    if (loggedInUser.id !== existingDraft.user.id) {
      throw new BadRequestException('Bad USER');
    }

    const dataUpdatedDraft = { ...existingDraft };

    for (const key in changesDraft) {
      if (changesDraft[key] !== null) {
        dataUpdatedDraft[key] = changesDraft[key];
      }
    }

    const response = await this.nftRepository.update(existingDraft.id, {
      ...dataUpdatedDraft,
    });

    return response;
  }

  async getAllDraftsByUser(user: User) {
    const drafts = await this.nftRepository.find({
      where: { user, isDraft: true },
    });

    return drafts;
  }

  async getAllNFTsByUser(user: User): Promise<Nft[]> {
    return await this.nftRepository.find({
      where: { user, isDraft: false },
    });
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
}
