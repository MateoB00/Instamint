/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.test` });
import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from '../src/controllers/content.controller';
import { ContentService } from '../src/services/content.service';
import { UserService } from '../src/services/user.service';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entities/user.entity';
import { Repository } from 'typeorm';
import { NFT } from '../src/entities/nft.entity';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        ContentService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: ContentService,
          useValue: {
            uploadOriginalContent: jest.fn(),
          },
        },
      ],
    }).compile();

    contentController = module.get<ContentController>(ContentController);
    contentService = module.get<ContentService>(ContentService);
    contentService.saveNFT = jest.fn();
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
  });

  describe('Upload Original Content', () => {
    it('should upload content successfully', async () => {
      const mockFile = {
        originalname: 'test.png',
        mimetype: 'image/png',
        buffer: Buffer.from('fake-image-data'),
      };
      const mockUser = { username: 'testuser' };

      const expectedResponse = {
        message: 'file uploaded to firebase storage',
        name: 'test.jpg',
        type: 'image/jpeg',
        downloadURL: 'https://example.com/download-url',
        code: 200,
      };

      jest
        .spyOn(contentService, 'uploadOriginalContent')
        .mockResolvedValue(expectedResponse);

      const result = await contentController.uploadOriginalContent(mockFile, {
        user: mockUser,
      });

      expect(result).toEqual(expectedResponse);
      expect(contentService.saveNFT).toHaveBeenCalledWith(expect.any(NFT));
    });

    it('should throw error for file exceeding maximum size', async () => {
      const mockFile = {
        originalname: 'test.png',
        mimetype: 'image/png',
        buffer: Buffer.alloc(1073741825),
        size: 1073741825,
      };
      const mockUser = { username: 'testuser' };

      jest
        .spyOn(contentService, 'uploadOriginalContent')
        .mockRejectedValue(
          new BadRequestException('File size exceeds the limit (1GB)'),
        );

      await expect(
        contentController.uploadOriginalContent(mockFile, { user: mockUser }),
      ).rejects.toThrow('File size exceeds the limit (1GB)');
    });

    it('should throw error for file has bad types', async () => {
      const mockFile = {
        originalname: 'test.jpeg',
        mimetype: 'image/jpeg',
        buffer: Buffer.alloc(999),
        size: 999,
      };
      const mockUser = { username: 'testuser' };

      jest
        .spyOn(contentService, 'uploadOriginalContent')
        .mockRejectedValue(new BadRequestException('File type not allowed'));

      await expect(
        contentController.uploadOriginalContent(mockFile, { user: mockUser }),
      ).rejects.toThrow('File type not allowed');
    });

    it('should throw error when file content exists', async () => {
      const mockFile = {
        originalname: 'test.jpeg',
        mimetype: 'image/jpeg',
        buffer: Buffer.alloc(999),
        size: 999,
      };
      const mockUser = { username: 'testuser' };

      jest
        .spyOn(contentService, 'uploadOriginalContent')
        .mockRejectedValue(
          new BadRequestException(
            'A content with the same name already exists',
          ),
        );

      await expect(
        contentController.uploadOriginalContent(mockFile, { user: mockUser }),
      ).rejects.toThrow('A content with the same name already exists');
    });
  });
});
