import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Do nothing.
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const fetchUserByEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (!fetchUserByEmail) {
      throw new NotFoundException('User not found.');
    }

    return fetchUserByEmail;
  }

  async findOneById(id: number): Promise<User | undefined> {
    const fetchUserById = await this.userRepository.findOne({
      where: { id },
    });

    if (!fetchUserById) {
      throw new NotFoundException('User not found.');
    }

    return fetchUserById;
  }
  async changeUsername(userId: number, newUsername: string): Promise<boolean> {
    const userExists = await this.userRepository.findOneBy({
      username: newUsername,
    });

    if (userExists) {
      throw new Error('Username is already taken');
    }

    await this.userRepository.update(userId, { username: newUsername });

    return true;
  }
}
