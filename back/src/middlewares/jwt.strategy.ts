import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Comment JwtStrategy.extractJWT if you want to use PostMan or without website
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    const cookieHeader = req.headers && req.headers.cookie;

    if (!cookieHeader) {
      return null;
    }

    const regex = /SESSION=([^;]*)/u;
    const match = cookieHeader.match(regex);

    if (match && match.length > 1) {
      return match[1];
    }

    return null;
  }

  validate(payload) {
    return this.authService.validateUser(payload.username);
  }
}
