import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';
import { User } from 'src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line max-lines-per-function
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('get Me', () => {
    it('should return user by id', async () => {
      const mockUser: User = {
        id: 1,
        email: 'Test@test.com',
        password: 'test',
        username: 'test',
        phoneNumber: 'test',
        profilePicture: 'test',
        bio: 'test',
        uniqueLink: 'test',
        visibility: true,
        language: 'test',
        twoFactorEnabled: true,
        twoFactorSecret: 'test',
        otpPath: 'test',
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
      };

      const req = { user: { id: 1 } };

      jest.spyOn(userService, 'findOneById').mockResolvedValue(mockUser);

      const result = await userController.findById(req);

      expect(result).toEqual(mockUser);
    });

    it('should throw error if user not found', async () => {
      const req = { user: { id: 1 } };

      jest
        .spyOn(userService, 'findOneById')
        .mockRejectedValue(new NotFoundException('User not found.'));

      await expect(userController.findById(req)).rejects.toThrow(
        'User not found.',
      );
    });
  });
});