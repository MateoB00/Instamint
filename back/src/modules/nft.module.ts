import { Module } from '@nestjs/common';
import { NftService } from '../services/nft.service';
import { NftController } from 'src/controllers/nft.controller';
import { Nft } from 'src/entities/nft.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from 'src/services/firebase.service';
import { Like } from 'src/entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nft, User, Like])],
  controllers: [NftController],
  providers: [NftService, FirebaseService],
  exports: [NftService, FirebaseService],
})
export class NftModule {}
