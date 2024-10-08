import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Nft } from 'src/entities/nft.entity';
import { Comment } from 'src/entities/Comment.entity';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from 'src/modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NftModule } from './modules/nft.module';
import { FirebaseModule } from './modules/firebase.module';
import { OriginalContentModule } from './modules/original-content.module';
import { Like } from './entities/like.entity';
import { TeabagModule } from './modules/teabag.module';
import { Teabag } from './entities/teabag.entity';
import { Notification } from './entities/notifications.entity';
import { NotificationModule } from './modules/notification.module';
import { CommentModule } from './modules/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Nft, Teabag, Notification, Comment, Like],
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.SMTP_MAILER,
      }),
    }),
    UserModule,
    AuthModule,
    FirebaseModule,
    NftModule,
    NotificationModule,
    CommentModule,
    OriginalContentModule,
    TeabagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
