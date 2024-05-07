import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { Comment } from 'src/entities/comment.entity';
import { FirebaseService } from 'src/services/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, FirebaseService],
  exports: [CommentService, FirebaseService],
})
export class CommentModule {}
