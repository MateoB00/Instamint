/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.test` });
import { Test, TestingModule } from '@nestjs/testing';
import { TeabagController } from '../src/controllers/teabag.controller';
import { Teabag } from '../src/entities/teabag.entity';
import { TeabagService } from '../src/services/teabag.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../src/entities/user.entity';
import { UpdateResult } from 'typeorm';

describe('TeabagController', () => {
  let teabagController: TeabagController;
  let teabagService: TeabagService;
  let mockUser: User;
  let mockTeabag: Teabag;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeabagController],
      providers: [
        {
          provide: TeabagService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getOneByLink: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    teabagController = module.get<TeabagController>(TeabagController);
    teabagService = module.get<TeabagService>(TeabagService);

    mockUser = {
      id: 3,
      email: 'test@test.email',
      password: '$2b$10$pnyCGkYzssJ3.ABGzkbfFOuLJ9d9rWCnqODZmPFbVWoAZEgB5y9jW',
      username: 'test',
      phoneNumber: 'default number',
      profilePicture: 'test',
      bio: 'default bio',
      uniqueLink: 'azeazezaeazea',
      visibility: true,
      language: 'English',
      twoFactorEnabled: false,
      twoFactorSecret: null,
      searchByEmailOrPhoneEnabled: true,
      lastLogin: null,
      otpPath: 'otpPath',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
      isAdmin: false,
      notifications: [],
      comments: [],
    };

    mockTeabag = {
      id: 1,
      name: 'name',
      bio: 'bio',
      link: 'link',
      profilePicture: 'test',
      listNfts: [],
      creator: mockUser,
      cooks: [mockUser],
      followers: [],
      followed: [],
      whitelist: [],
      whitelistStartDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      numberFollower: 0,
      numberFollowed: 0,
      numberCook: 1,
    };
  });

  it('should be defined', () => {
    expect(teabagController).toBeDefined();
  });

  describe('Create a teabag', () => {
    it('create a teabag with success', async () => {
      jest.spyOn(teabagService, 'create').mockResolvedValue(mockTeabag);

      const result = await teabagController.create(
        { user: mockUser },
        mockTeabag,
      );

      expect(result).toEqual(mockTeabag);
    });

    it('create a teabag with user not found', async () => {
      jest
        .spyOn(teabagService, 'create')
        .mockRejectedValue(new NotFoundException('User not found.'));

      await expect(
        teabagController.create({ user: mockUser }, mockTeabag),
      ).rejects.toThrow('User not found.');
    });
  });

  describe('GetAll Teabags', () => {
    it('get teabags with success', async () => {
      jest.spyOn(teabagService, 'getAll').mockResolvedValue([mockTeabag]);

      const result = await teabagController.getAll();

      expect(result).toEqual([mockTeabag]);
    });
  });

  describe('Get one Teabag', () => {
    it('get one teabag with success', async () => {
      jest.spyOn(teabagService, 'getOneByLink').mockResolvedValue(mockTeabag);

      const result = await teabagController.getOne('link');

      expect(result).toEqual(mockTeabag);
    });
  });

  describe('Update a teabag', () => {
    it('get one teabag with success', async () => {
      const expectedResponse: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(teabagService, 'update').mockResolvedValue(expectedResponse);

      const result = await teabagController.update(
        { user: mockUser },
        mockTeabag,
      );

      expect(result).toEqual(expectedResponse);
    });

    it('get one teabag with error teabag not found', async () => {
      jest
        .spyOn(teabagService, 'update')
        .mockRejectedValue(new NotFoundException('User not found.'));

      await expect(
        teabagController.update({ user: mockUser }, mockTeabag),
      ).rejects.toThrow('User not found.');
    });

    it('get one teabag with error user are not a cook', async () => {
      jest
        .spyOn(teabagService, 'update')
        .mockRejectedValue(
          new BadRequestException('Current User are not a cook'),
        );

      await expect(
        teabagController.update({ user: mockUser }, mockTeabag),
      ).rejects.toThrow('Current User are not a cook');
    });
  });
});
