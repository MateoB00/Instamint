// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  Controller,
  Post,
  Body,
  Header,
  Res,
  Get,
  Redirect,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { Response as ResponseType } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    private userService: UserService,
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
  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.authService.register(user);
  }

  @Get('confirmation/:token')
  @Redirect(process.env.FRONT_END_URL, 302)
  async confirm(@Param('token') token: string) {
    await this.emailService.verifyEmail(token);

    return { url: process.env.FRONT_END_URL };
  }

  @Post('resend-confirmation')
  async resendEmailConfirmation(@Body('email') email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      await this.emailService.sendConfirmationEmail(user);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  @Get('logout')
  logout(@Res({ passthrough: true }) res: ResponseType) {
    res.cookie('SESSION', null, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
  }
}
