import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtStrategy } from '../middlewares/jwt.strategy';
import { EmailService } from 'src/services/email.service';
import { PassportModule } from '@nestjs/passport';
import { TwoFactorAuthStrategy } from '../middlewares/2fa.strategy';
import { Notification } from 'src/entities/notifications.entity';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    EmailService,
    TwoFactorAuthStrategy,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Notification]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
