import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    // Do nothing.
  }
  findCommentsByPage(
    Id: number,
    page: number,
    pageSize: number,
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId: Id },
      order: { createdAt: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
