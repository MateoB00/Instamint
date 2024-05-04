import { Controller, Get, Query, Param } from '@nestjs/common';
import { CommentService } from '../services/comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {
    // Do nothing.
  }

  @Get(':postId')
  getCommentsByPage(
    @Param('postId') postId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    return this.commentService.findCommentsByPage(postId, page, pageSize);
  }
}
