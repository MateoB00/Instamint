import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teabag } from '../entities/teabag.entity';
import { User } from '../entities/user.entity';
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

  async update(user: User, teabagChanges: Teabag) {
    const existingTeabag = await this.teabagRepository.findOne({
      where: { id: teabagChanges.id },
    });
    const cooksInExistingTeabag = await this.teabagRepository.findOne({
      where: { id: teabagChanges.id },
      select: ['cooks'],
      relations: ['cooks'],
    });

    const { cooks } = cooksInExistingTeabag;

    if (!cooks.some((cook) => cook.id === user.id)) {
      throw new BadRequestException('Current User are not a cook');
    }

    if (!existingTeabag) {
      throw new NotFoundException('Teabag not found');
    }

    Object.keys(teabagChanges).forEach((key) => {
      if (teabagChanges[key] !== null) {
        existingTeabag[key] = teabagChanges[key];
      }
    });

    return await this.teabagRepository.update(teabagChanges.id, existingTeabag);
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
