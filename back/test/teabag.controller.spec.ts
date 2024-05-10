/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.test` });
import { Test, TestingModule } from '@nestjs/testing';
import { TeabagController } from '../src/controllers/teabag.controller';
import { Teabag } from '../src/entities/teabag.entity';
import { TeabagService } from '../src/services/teabag.service';
import { NotFoundException } from '@nestjs/common';

describe('OriginalContentController', () => {
  let teabagController: TeabagController;
  let teabagService: TeabagService;

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
          },
        },
      ],
    }).compile();

    teabagController = module.get<TeabagController>(TeabagController);
    teabagService = module.get<TeabagService>(TeabagService);
  });

  it('should be defined', () => {
    expect(teabagController).toBeDefined();
  });

  describe('Create a teabag', () => {
    it('create a teabag with success', async () => {
      const mockUser = {
        id: 3,
        email: 'test@test.email',
        password:
          '$2b$10$pnyCGkYzssJ3.ABGzkbfFOuLJ9d9rWCnqODZmPFbVWoAZEgB5y9jW',
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
      };

      const mockTeabag: Teabag = {
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

      jest.spyOn(teabagService, 'create').mockResolvedValue(mockTeabag);

      const result = await teabagController.create(
        { user: mockUser },
        mockTeabag,
      );

      expect(result).toEqual(mockTeabag);
    });

    it('create a teabag with user not found', async () => {
      const mockUser = {
        id: 3,
        email: 'not user',
        password:
          '$2b$10$pnyCGkYzssJ3.ABGzkbfFOuLJ9d9rWCnqODZmPFbVWoAZEgB5y9jW',
        username: 'not user',
        phoneNumber: 'not user',
        profilePicture: 'not user',
        bio: 'not user',
        uniqueLink: 'not user',
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
      };

      const mockTeabag: Teabag = {
        id: 1,
        name: 'name',
        bio: 'bio',
        link: 'link',
        profilePicture: 'test',
        listNfts: [],
        creator: mockUser,
        cooks: [],
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
      const mockUser = {
        id: 3,
        email: 'test@test.email',
        password:
          '$2b$10$pnyCGkYzssJ3.ABGzkbfFOuLJ9d9rWCnqODZmPFbVWoAZEgB5y9jW',
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
      };

      const mockTeabag: Teabag = {
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

      jest.spyOn(teabagService, 'getAll').mockResolvedValue([mockTeabag]);

      const result = await teabagController.getAll();

      expect(result).toEqual([mockTeabag]);
    });
  });

  describe('Get one Teabag', () => {
    it('get one teabag with success', async () => {
      const mockUser = {
        id: 3,
        email: 'test@test.email',
        password:
          '$2b$10$pnyCGkYzssJ3.ABGzkbfFOuLJ9d9rWCnqODZmPFbVWoAZEgB5y9jW',
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
      };

      const mockTeabag: Teabag = {
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

      jest.spyOn(teabagService, 'getOneByLink').mockResolvedValue(mockTeabag);

      const result = await teabagController.getOne('link');

      expect(result).toEqual(mockTeabag);
    });
  });
});
