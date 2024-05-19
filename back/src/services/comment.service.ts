import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/Comment.entity';
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
      where: { id: 1 },
      order: { createdAt: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
  async createComment(userId: number, content: string): Promise<Comment> {
    const newComment = await this.commentRepository.create({
      user: { id: userId },
      content,
    });

    return await this.commentRepository.save(newComment);
  }
}
