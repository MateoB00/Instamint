import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as speakeasy from 'speakeasy';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private readonly mailerService: MailerService,
  ) {
    // Do nothing.
  }
  async login(email: string, password: string) {
    const userByEmail = await this.userService.findOneByEmail(email);

    if (!userByEmail) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, userByEmail.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!userByEmail.isVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const payload = {
      username: email,
      sub: {
        email: userByEmail.email,
      },
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async validateUser(userEmail) {
    return await this.userService.findOneByEmail(userEmail);
  }

  async register(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    if (!emailRegex.test(user.email)) {
      throw new BadRequestException('Email needs to be valid.');
    }

    const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/u;
    if (!password.test(user.password)) {
      throw new BadRequestException('Password needs to be valid.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const generatedSecret2FA = speakeasy.generateSecret({ length: 20 });

    const secret = generatedSecret2FA.base32;
    const newUser = {
      email: user.email,
      password: hashedPassword,
      username: user.username,
      phoneNumber: 'default number',
      profilePicture: './default_profile_icon.png',
      bio: 'default bio',
      uniqueLink: `${user.username}-${Math.floor(Math.random() * 1000)}`,
      twoFactorSecret: secret,
      otpPath: `otpauth://totp/SecretKey?secret=${secret}`,
    };

    const createdUser = await this.userRepository.save(newUser);

    await this.emailService.sendConfirmationEmail(createdUser);

    return createdUser;
  }

  async validateTwoFactor(userEmail: string, otp: string): Promise<User> {
    const user = await this.userService.findOneByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: otp,
      window: 2,
    });

    if (!verified) {
      throw new Error('Invalid OTP');
    }

    return user;
  }

  async generatePasswordResetToken(userId: number): Promise<string> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const payload = { userId: user.id };

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async validatePasswordResetToken(token: string): Promise<number | null> {
    try {
      const decoded = await this.jwtService.verify(token);

      return decoded.userId;
    } catch (error) {
      return null;
    }
  }

  async sendPasswordResetEmail(user: User, token: string): Promise<void> {
    const mailOptions = {
      to: user.email,
      from: process.env.USER_MAILER,
      subject: 'Password Reset Request',
      text: `Dear ${user.username},\n\nYou have requested to reset your password. Click the following link to reset your password:\n\n${process.env.FRONT_END_URL}/reset-password/${token}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour App Team`,
    };

    await this.mailerService.sendMail(mailOptions).catch((error) => {
      throw new Error(`Failed to send password reset request email ${error}`);
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
  async changeEmail(userId: number, newEmail: string) {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emailAlreadyExists = await this.userService.findOneByEmail(newEmail);

    if (emailAlreadyExists) {
      throw new UnauthorizedException('Email is already in use');
    }

    const emailVerificationToken = this.jwtService.sign(
      {
        email: newEmail,
        userId: user.id,
      },
      { expiresIn: '1h' },
    );
    await this.emailService.sendChangeEmail(newEmail, emailVerificationToken);
  }
}
