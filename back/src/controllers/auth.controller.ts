// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  Controller,
  Post,
  Body,
  Header,
  Res,
  Get,
  Request,
  UseGuards,
  Redirect,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { Response as ResponseType } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    // Do nothing.
  }

  @Post('login')
  @Header('Authorization', 'Bearer')
  async login(
    @Res({ passthrough: true }) res: ResponseType,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.authService.login(email, password);

    res.cookie('SESSION', token.accessToken, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });

    return token;
  }

  @Get('confirmation/:token')
  @Redirect(process.env.FRONT_END_URL, 302)
  async confirm(@Param('token') token: string) {
    await this.emailService.verifyEmail(token);

    return { url: process.env.FRONT_END_URL };
  }

  @Get('resend-confirmation')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Request() req) {
    const loggedInUser = req.user;
    await this.emailService.sendConfirmationEmail(loggedInUser);
  }
}
