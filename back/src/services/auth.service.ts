import {
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
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
}
