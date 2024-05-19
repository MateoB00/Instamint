import {
  Controller,
  Get,
  Query,
  Post,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {
    // Do nothing.
  }

  @Get(':postId')
  @UseGuards(AuthGuard('jwt'))
  getCommentsByPage(
    @Query('id') id: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    return this.commentService.findCommentsByPage(id, page, pageSize);
  }
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  createComment(@Request() req, @Body() body) {
    return this.commentService.createComment(req.user.id, body);
  }
}
