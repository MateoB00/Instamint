import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeabagService } from 'src/services/teabag.service';
import { TeabagController } from 'src/controllers/teabag.controller';
import { Teabag } from 'src/entities/teabag.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teabag, User])],
  controllers: [TeabagController],
  providers: [TeabagService],
  exports: [TeabagService],
})
export class TeabagModule {}
