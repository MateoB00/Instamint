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

  async update(loggedUser: User, changesUser) {
    const { id } = loggedUser;
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    Object.keys(changesUser).forEach((key) => {
      if (changesUser[key] !== null) {
        existingUser[key] = changesUser[key];
      }
    });

    await this.userRepository.update(id, existingUser);

    return {
      success: true,
      message: 'User updated successfully.',
    };
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }

  async getAllUsernames(): Promise<string[]> {
    const users = await this.userRepository.find();

    return users.map((user) => user.username);
  }

  async searchUsers(username: string, location: string): Promise<User[]> {
    const queryBuilder = await this.userRepository.createQueryBuilder('user');

    if (username) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }

    if (location) {
      queryBuilder.andWhere('user.location LIKE :location', {
        location: `%${location}%`,
      });
    }

    return queryBuilder.getMany();
  }
}
