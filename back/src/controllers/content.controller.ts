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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentService } from '../services/content.service';
import { NFT } from 'src/entities/nft.entity';
import { UserService } from 'src/services/user.service';

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
}
