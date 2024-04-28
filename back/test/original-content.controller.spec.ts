/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.test` });
import { Test, TestingModule } from '@nestjs/testing';
import { OriginalContentController } from '../src/controllers/original-content.controller';
import { OriginalContentService } from '../src/services/original-content.service';
import { BadRequestException } from '@nestjs/common';

describe('OriginalContentController', () => {
  let contentController: OriginalContentController;
  let originalContentService: OriginalContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalContentController],
      providers: [
        {
          provide: OriginalContentService,
          useValue: {
            uploadOriginalContent: jest.fn(),
            getAllByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    contentController = module.get<OriginalContentController>(
      OriginalContentController,
    );
    originalContentService = module.get<OriginalContentService>(
      OriginalContentService,
    );
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
        .spyOn(originalContentService, 'uploadOriginalContent')
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
        .spyOn(originalContentService, 'uploadOriginalContent')
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
        .spyOn(originalContentService, 'uploadOriginalContent')
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
        .spyOn(originalContentService, 'uploadOriginalContent')
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

  describe('getAllByUser', () => {
    it('should retrieve all user content successfully', async () => {
      const mockUserId = 1;
      const mockOriginalContents = [
        {
          name: 'file1.jpg',
          path: 'original-content/1/file1.jpg',
          url: 'https://example.com/file1.jpg',
        },
        {
          name: 'file2.jpg',
          path: 'original-content/1/file2.jpg',
          url: 'https://example.com/file2.jpg',
        },
      ];

      jest
        .spyOn(originalContentService, 'getAllByUser')
        .mockResolvedValue(mockOriginalContents);

      const req = { user: { id: mockUserId } };
      const result = await contentController.getAllByUser(req);

      expect(result).toEqual(mockOriginalContents);
      expect(originalContentService.getAllByUser).toHaveBeenCalledWith(
        mockUserId,
      );
    });

    it('should handle no content found for the user', async () => {
      const mockUserId = 2;
      const mockOriginalContents = [];

      jest
        .spyOn(originalContentService, 'getAllByUser')
        .mockResolvedValue(mockOriginalContents);

      const req = { user: { id: mockUserId } };
      const result = await contentController.getAllByUser(req);

      expect(result).toEqual(mockOriginalContents);
      expect(originalContentService.getAllByUser).toHaveBeenCalledWith(
        mockUserId,
      );
    });

    it('should handle errors when service fails', async () => {
      const mockUserId = 3;
      const errorMessage = 'Error fetching user content';

      jest
        .spyOn(originalContentService, 'getAllByUser')
        .mockRejectedValue(new Error(errorMessage));

      const req = { user: { id: mockUserId } };

      await expect(contentController.getAllByUser(req)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
