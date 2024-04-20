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
  UseGuards,
  Request,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    const user = await this.authService.validateUser(email);
    const { twoFactorEnabled } = user;

    if (!twoFactorEnabled) {
      res.cookie('SESSION', token.accessToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
      });
      res.status(202);
    }

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
  @Post('change-email')
  async requestChangeEmail(
    @Res({ passthrough: true }) res: ResponseType,
    @Body('userId') userId: number,
    @Body('newEmail') newEmail: string,
  ) {
    const existingUser = await this.userService.findOneByEmail(newEmail);
    if (existingUser) {
      throw new Error('Email is already in use.');
    }

    const token = await this.emailService.generateChangeEmailToken(
      newEmail,
      userId,
    );

    await this.emailService.sendChangeEmail(newEmail, token);

    res
      .status(HttpStatus.OK)
      .json({ message: 'Verification email sent to new email address.' });
  }
  @Post('2fa')
  @Header('Authorization', 'Bearer')
  @UseGuards(AuthGuard('two-factor'))
  async twoFactorAuth(
    @Res({ passthrough: true }) res: ResponseType,
    @Request() req,
  ) {
    try {
      const { email, otp, password } = req.body;

      await this.authService.validateTwoFactor(email, otp);

      const token = await this.authService.login(email, password);

      res.cookie('SESSION', token.accessToken, {
        httpOnly: true,
        domain: process.env.DOMAIN,
      });

      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reset-password-request')
  async requestPasswordReset(@Body('email') email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = await this.authService.generatePasswordResetToken(user.id);
    await this.authService.sendPasswordResetEmail(user, token);

    return { message: 'Password reset email sent successfully' };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    const userId = await this.authService.validatePasswordResetToken(token);

    if (!userId) {
      throw new BadRequestException('Invalid or expired token');
    }
    await this.authService.updatePassword(userId, password);

    return { message: 'Password reset successfully' };
  }
}