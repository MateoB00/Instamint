// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Controller, Post, Body, Param, Get, Redirect } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    // Do nothing.
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
}
