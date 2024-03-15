import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtStrategy } from '../middlewares/jwt.strategy';
import { EmailService } from 'src/services/email.service';

@Module({
  providers: [AuthService, JwtStrategy, UserService, EmailService],
=======
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { EmailService } from 'src/services/email.service';

@Module({
  providers: [AuthService, EmailService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService, JwtStrategy],
=======
  exports: [AuthService],
})
export class AuthModule {}
