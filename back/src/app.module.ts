import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Nft } from 'src/entities/nft.entity';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from 'src/modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NftModule } from './modules/nft.module';
import { FirebaseModule } from './modules/firebase.module';
import { OriginalContentModule } from './modules/original-content.module';
import { TeabagModule } from './modules/teabag.module';
import { Teabag } from './entities/teabag.entity';

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
        entities: [User, Nft, Teabag],
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
    OriginalContentModule,
    TeabagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
