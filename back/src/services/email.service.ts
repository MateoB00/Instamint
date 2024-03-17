import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
  ) {
    // Do nothing.
  }

  sendConfirmationEmail(user: User) {
    const payload = {
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    const confirmationUrl = `${process.env.API_URL}/auth/confirmation/${token}`;

    this.mailerService
      .sendMail({
        to: user.email,
        from: process.env.USER_MAILER,
        subject: 'Instamint - Please confirm your email',
        text: 'Instamint - Please confirm your email',
        html: `<a href="${confirmationUrl}">Please confirm your email</a>`,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('success');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Failed to send confirmation email ${error}`);
        throw new Error('Failed to send confirmation email');
      });
  }

  verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);

      this.userRepository.update(
        { email: decoded.email },
        { isVerified: true },
      );
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  generateChangeEmailToken(newEmail: string, userId: number): Promise<string> {
    const emailChangeToken = this.jwtService.sign(
      { userId, newEmail },
      { expiresIn: '15m' },
    );

    return Promise.resolve(emailChangeToken);
  }

  async sendChangeEmail(newEmail: string, token: string): Promise<void> {
    const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-email-change?token=${token}`;
    await this.mailerService.sendMail({
      to: newEmail,
      subject: 'Confirm your new email',
      html: `Please click this link to confirm your new email: <a href="${confirmationUrl}">Confirm Email</a>`,
    });
  }
}
