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
  NotFoundException,
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

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':uniqueLink/nfts')
  async getNFTsByUser(@Param('uniqueLink') uniqueLink: string): Promise<NFT[]> {
    const user = await this.userService.findByLink(uniqueLink);
    if (!user) {
      return [];
    }

    return this.contentService.getAllNFTsByUser(user);
  }

  @Get(':nftId/likes')
  async getLikesAndDislikes(@Param('nftId') nftId: number) {
    const likesCount = await this.contentService.getLikesCount(nftId);
    const dislikesCount = await this.contentService.getDislikesCount(nftId);

    return { likes: likesCount, dislikes: dislikesCount };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':nftId/like')
  async likeNFT(@Request() req, @Param('nftId') nftId: number) {
    const loggedInUser = req.user;

    const nft = await this.contentService.findNFTById(nftId);
    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    const newLike = await this.contentService.createLikeOrDislike(
      loggedInUser,
      nft,
      true,
    );

    return { message: 'NFT liked successfully', like: newLike };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':nftId/dislike')
  async dislikeNFT(@Request() req, @Param('nftId') nftId: number) {
    const loggedInUser = req.user;

    const nft = await this.contentService.findNFTById(nftId);
    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    const newLike = await this.contentService.createLikeOrDislike(
      loggedInUser,
      nft,
      false,
    );

    return { message: 'NFT liked successfully', like: newLike };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/notifications')
  async getMyNotifications(@Request() req) {
    try {
      const loggedInUser = req.user;
      const notifications = await this.userService.findAllNotificationsByUserId(
        loggedInUser.id,
      );

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
