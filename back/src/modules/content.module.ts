import { Module } from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { ContentController } from '../controllers/content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from '../entities/nft.entity';
import { UserService } from 'src/services/user.service';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { Notification } from '../entities/notifications.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NFT]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Like]),
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [ContentController],
  providers: [ContentService, UserService],
  exports: [ContentService],
})
export class ContentModule {}
