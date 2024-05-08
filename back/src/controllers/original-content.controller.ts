import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  UseGuards,
  Get,
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
    return await this.originalContentService.uploadOriginalContent(
      file,
      req.user,
    );
  }

  @Get('allByUser')
  @UseGuards(AuthGuard('jwt'))
  async getAllByUser(@Request() req) {
    return await this.originalContentService.getAllByUser(req.user.id);
  }
}
