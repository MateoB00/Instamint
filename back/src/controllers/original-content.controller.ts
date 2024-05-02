import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { OriginalContentService } from '../services/original-content.service';

@Controller('original-content')
export class OriginalContentController {
  constructor(private originalContentService: OriginalContentService) {
    // Do nothing.
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadOriginalContent(@UploadedFile() file, @Request() req) {
    const loggedInUser = req.user;

    const response = await this.originalContentService.uploadOriginalContent(
      file,
      loggedInUser,
    );

    return response;
  }

  @Get('allByUser')
  @UseGuards(AuthGuard('jwt'))
  async getAllByUser(@Request() req) {
    const loggedInUser = req.user;

    const response = await this.originalContentService.getAllByUser(
      loggedInUser.id,
    );

    return response;
  }

  @Post('deleteOne')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Request() req, @Body() body) {
    const loggedInUser = req.user;
    const { path } = body;

    const response = await this.originalContentService.deleteOne(
      loggedInUser.id,
      path,
    );

    return response;
  }
}
