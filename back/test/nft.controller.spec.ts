/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.test` });
import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from '../src/controllers/nft.controller';
import { NftService } from '../src/services/nft.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Nft } from 'src/entities/nft.entity';

describe('OriginalContentController', () => {
  let nftController: NftController;
  let nftService: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftController],
      providers: [
        {
          provide: NftService,
          useValue: {
            createDraft: jest.fn(),
            updateDraft: jest.fn(),
            getAllDraftsByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    nftController = module.get<NftController>(NftController);
    nftService = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(nftController).toBeDefined();
  });

  describe('Create a draft', () => {
    it('create a draft with success', async () => {
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
      const mockDraft = {
        id: 1,
        title: 'Unique Digital Art',
        description:
          'A unique piece of digital artwork stored on the blockchain.',
        price: 0.5,
        mediaUrl: 'https://example.com/nft.jpg',
        location: 'Virtual World',
        pathFirebase: 'path/to/nft/on/firebase',
        hashtags: ['art', 'blockchain', 'digital'],
        isDraft: true,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResponse = {
        title: 'draftCreated',
        description: 'draftCreated',
        hashtags: ['draftCreated'],
        mediaUrl: 'https://draftCreated.draftCreated.png.com',
        location: 'France',
        pathFirebase: 'original-content/3/Logo.png',
        isDraft: true,
        user: mockUser,
        price: null,
        id: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(nftService, 'createDraft').mockResolvedValue(expectedResponse);

      const result = await nftController.createDraft(
        { user: mockUser },
        mockDraft,
      );

      expect(result).toEqual(expectedResponse);
    });

    it('should throw an error if the user is not found', async () => {
      const mockUser = { email: 'nonexistent@example.com' };
      const mockDraft = {
        title: 'Draft NFT',
        description: 'Draft version of an NFT',
        mediaUrl: 'https://example.com/original.jpg',
        pathFirebase: 'original-content/draft123',
      };

      jest
        .spyOn(nftService, 'createDraft')
        .mockRejectedValue(new NotFoundException('User not found.'));

      await expect(
        nftController.createDraft({ user: mockUser }, mockDraft),
      ).rejects.toThrow('User not found.');
    });
  });

  describe('Update a draft', () => {
    it('update a draft with success', async () => {
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
      const mockDraft = {
        id: 1,
        title: 'Unique Digital Art',
        description:
          'A unique piece of digital artwork stored on the blockchain.',
        price: 0.5,
        mediaUrl: 'https://example.com/nft.jpg',
        location: 'Virtual World',
        pathFirebase: 'path/to/nft/on/firebase',
        hashtags: ['art', 'blockchain', 'digital'],
        isDraft: true,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResponse: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(nftService, 'updateDraft').mockResolvedValue(expectedResponse);

      const result = await nftController.updateDraft(
        { user: mockUser },
        mockDraft,
      );

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('Get all drafts by user', () => {
    it('Get all drafts by user with success', async () => {
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
      const mockDraft: Nft = {
        id: 1,
        title: 'Unique Digital Art',
        description:
          'A unique piece of digital artwork stored on the blockchain.',
        price: 0.5,
        mediaUrl: 'https://example.com/nft.jpg',
        location: 'Virtual World',
        pathFirebase: 'path/to/nft/on/firebase',
        hashtags: ['art', 'blockchain', 'digital'],
        isDraft: true,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResponse = [mockDraft, mockDraft];

      jest
        .spyOn(nftService, 'getAllDraftsByUser')
        .mockResolvedValue(expectedResponse);

      const result = await nftController.getAllByUser({ user: mockUser });

      expect(result).toEqual(expectedResponse);
    });
  });
});
