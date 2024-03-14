import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthService } from '../src/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../src/services/email.service';
import { UserService } from '../src/services/user.service';
import { User } from '../src/entities/user.entity';

// eslint-disable-next-line max-lines-per-function
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendConfirmationEmail: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOneByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // eslint-disable-next-line max-lines-per-function
  describe('register', () => {
    it('should return user', async () => {
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
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
      };

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser);

      const result = await authController.register(mockUser);

      expect(result).toEqual(mockUser);
    });

    it('should throw error user already exists', async () => {
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
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
      };
      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new Error('User already exists'));

      await expect(authController.register(mockUser)).rejects.toThrow(
        'User already exists',
      );
    });

    it('should throw error email needs to be valid', async () => {
      const mockUser: User = {
        id: 1,
        email: 'Test',
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
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
      };
      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new Error('Email needs to be valid.'));

      await expect(authController.register(mockUser)).rejects.toThrow(
        'Email needs to be valid.',
      );
    });

    it('should throw error password needs to be valid', async () => {
      const mockUser: User = {
        id: 1,
        email: 'Test',
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
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
      };
      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new Error('Password needs to be valid.'));

      await expect(authController.register(mockUser)).rejects.toThrow(
        'Password needs to be valid.',
      );
    });
  });
});
