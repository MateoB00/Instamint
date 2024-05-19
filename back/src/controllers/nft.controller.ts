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
    return await this.nftService.createDraft(req.user.email, draft);
  }

  @Put('update-draft')
  @UseGuards(AuthGuard('jwt'))
  async updateDraft(@Request() req, @Body() draft) {
    return await this.nftService.updateDraft(req.user, draft);
  }

  @Get('allByUser')
  @UseGuards(AuthGuard('jwt'))
  async getAllByUser(@Request() req) {
    return await this.nftService.getAllDraftsByUser(req.user);
  }
}
