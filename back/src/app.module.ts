import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from 'src/modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ContentModule } from './modules/content.module';
import { NFT } from './entities/nft.entity';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';

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
        entities: [User, NFT, Like, Comment],
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
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
