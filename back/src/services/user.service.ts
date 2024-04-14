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

    const dataUpdatedUser = { ...existingUser };

    for (const key in changesUser) {
      if (changesUser[key] !== null) {
        dataUpdatedUser[key] = changesUser[key];
      }
    }

    await this.userRepository.update(existingUser.id, {
      ...dataUpdatedUser,
    });

    return {
      success: true,
      message: 'User updated successfully.',
    };
  }

  async updateTwoAuth(
    id: number,
    twoAuthenticationEnabled: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.twoFactorEnabled = twoAuthenticationEnabled;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }

  async findByLink(uniqueLink: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { uniqueLink },
      select: ['username', 'bio', 'uniqueLink', 'profilePicture', 'language'],
    });
  }
}
