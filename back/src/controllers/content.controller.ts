import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  UseGuards,
  BadRequestException,
  Get,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentService } from '../services/content.service';
import { NFT } from '../entities/nft.entity';
import { UserService } from '../services/user.service';

@Controller('content')
export class ContentController {
  constructor(
    private contentService: ContentService,
    private userService: UserService,
  ) {
    // Do nothing.
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadOriginalContent(@UploadedFile() file, @Request() req) {
    const loggedInUser = req.user;

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const response = await this.contentService.uploadOriginalContent(
      file,
      loggedInUser,
    );

    if (response.code === 200) {
      const nft = new NFT();
      nft.user = loggedInUser.id;
      nft.nftImageUrl = response.downloadURL;
      await this.contentService.saveNFT(nft);
    }

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async getAllNFTs(@Request() req): Promise<NFT[]> {
    const loggedInUser = req.user;
    const response = await this.contentService.getAllNFTsByUser(loggedInUser);
    const nftsWithLikes = response.map(async (nft) => {
      const likesCount = await this.contentService.getLikesCount(nft.id);
      const dislikesCount = await this.contentService.getDislikesCount(nft.id);

      return {
        ...nft,
        likes: likesCount,
        dislikes: dislikesCount,
      };
    });

    return Promise.all(nftsWithLikes);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':uniqueLink/nfts')
  async getNFTsByUser(@Param('uniqueLink') uniqueLink: string): Promise<NFT[]> {
    const user = await this.userService.findByLink(uniqueLink);
    if (!user) {
      return [];
    }

    const nfts = await this.contentService.getAllNFTsByUser(user);

    const nftsWithLikes = nfts.map(async (nft) => {
      const likesCount = await this.contentService.getLikesCount(nft.id);
      const dislikesCount = await this.contentService.getDislikesCount(nft.id);

      return {
        ...nft,
        likes: likesCount,
        dislikes: dislikesCount,
      };
    });

    return Promise.all(nftsWithLikes);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me/notifications')
  async getMyNotifications(@Request() req) {
    try {
      const loggedInUser = req.user;
      const notifications =
        await this.contentService.findAllNotificationsByUserId(loggedInUser.id);

      return {
        statusCode: HttpStatus.OK,
        data: notifications,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to get notifications',
        error: error.message,
      };
    }
  }
}
