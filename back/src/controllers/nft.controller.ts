import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NftService } from '../services/nft.service';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {
    // Do nothing.
  }

  @Post('create-draft')
  @UseGuards(AuthGuard('jwt'))
  async createDraft(@Request() req, @Body() draft) {
    const loggedInUser = req.user;

    const response = await this.nftService.createDraft(
      loggedInUser.email,
      draft,
    );

    return response;
  }

  @Put('update-draft')
  @UseGuards(AuthGuard('jwt'))
  async updateDraft(@Request() req, @Body() draft) {
    const loggedInUser = req.user;

    const response = await this.nftService.updateDraft(loggedInUser, draft);

    return response;
  }

  @Get('allByUser')
  @UseGuards(AuthGuard('jwt'))
  async getAllByUser(@Request() req) {
    const loggedInUser = req.user;

    const response = await this.nftService.getAllDraftsByUser(loggedInUser);

    return response;
  }

  @Get('all-my-nfts')
  @UseGuards(AuthGuard('jwt'))
  async getAllNFTs(@Request() req) {
    const loggedInUser = req.user;
    const response = await this.nftService.getAllNFTsByUser(loggedInUser);
    const nftsWithLikes = response.map(async (nft) => {
      const likesCount = await this.nftService.getLikesCount(nft.id);
      const dislikesCount = await this.nftService.getDislikesCount(nft.id);

      return {
        ...nft,
        likes: likesCount,
        dislikes: dislikesCount,
      };
    });

    return nftsWithLikes;
  }
}
