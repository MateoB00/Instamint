import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teabag } from 'src/entities/teabag.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeabagService {
  constructor(
    @InjectRepository(Teabag) private teabagRepository: Repository<Teabag>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Do nothing.
  }

  async create(user: User, teabag: Teabag) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    teabag.cooks = [existingUser];
    teabag.creator = existingUser;
    teabag.followers = [existingUser];
    teabag.profilePicture = '/default_teabag_icon.png';

    return await this.teabagRepository.save(teabag);
  }

  async getOneByLink(link: string): Promise<Teabag | undefined> {
    return await this.teabagRepository.findOne({
      where: { link },
      relations: ['cooks'],
    });
  }

  async getAll(): Promise<Teabag[] | undefined> {
    return await this.teabagRepository.find({
      relations: ['cooks'],
    });
  }
}
