import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport';
import * as speakeasy from 'speakeasy';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TwoFactorAuthStrategy extends PassportStrategy(
  Strategy,
  'two-factor',
) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async authenticate(req: Request) {
    try {
      const userEmail = req.body.email;
      const { otp } = req.body;

      const user = await this.authService.validateUser(userEmail);

      if (!user || !user.twoFactorSecret) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otp,
      });

      if (!verified) {
        throw new UnauthorizedException('Invalid OTP');
      }

      this.success(user);
    } catch (error) {
      this.error(error);
    }
  }
}