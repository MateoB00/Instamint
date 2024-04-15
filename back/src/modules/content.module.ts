import { Module } from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { ContentController } from '../controllers/content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from 'src/entities/nft.entity';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/user.entity';
import { Like } from 'src/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NFT]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Like]),
  ],
  controllers: [ContentController],
  providers: [ContentService, UserService],
  exports: [ContentService],
})
export class ContentModule {}
