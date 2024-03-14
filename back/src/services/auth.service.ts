import { Injectable, BadRequestException } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {
    // Do nothing.
  }

  async register(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/v;
    if (!emailRegex.test(user.email)) {
      throw new BadRequestException('Email needs to be valid.');
    }

    const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/v;
    if (!password.test(user.password)) {
      throw new BadRequestException('Password needs to be valid.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      email: user.email,
      password: hashedPassword,
      username: user.username,
      phoneNumber: 'default number',
      profilePicture: 'default picture',
      bio: 'default bio',
      uniqueLink: `${user.username}-${Math.floor(Math.random() * 1000)}`,
      visibility: false,
    };

    const createdUser = await this.userRepository.save(newUser);

    await this.emailService.sendConfirmationEmail(createdUser);

    return createdUser;
  }
}
