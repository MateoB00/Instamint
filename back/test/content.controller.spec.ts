/* eslint-disable max-lines-per-function */
require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from '../src/controllers/content.controller';
import { ContentService } from '../src/services/content.service';
import { BadRequestException } from '@nestjs/common';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
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
      };

      jest
        .spyOn(contentService, 'uploadOriginalContent')
        .mockResolvedValue(expectedResponse);

      const result = await contentController.uploadOriginalContent(mockFile, {
        user: mockUser,
      });

      expect(result).toEqual(expectedResponse);
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
  });
});
