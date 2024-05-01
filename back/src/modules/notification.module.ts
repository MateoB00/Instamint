import { Module } from '@nestjs/common';
import { NftController } from 'src/controllers/nft.controller';
import { Notification } from '../entities/notifications.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from 'src/services/firebase.service';
import { NotificationService } from 'src/services/Notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NftController],
  providers: [NotificationService, FirebaseService],
  exports: [NotificationService, FirebaseService],
})
export class NftModule {}
