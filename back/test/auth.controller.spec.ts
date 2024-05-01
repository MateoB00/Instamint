import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthService } from '../src/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../src/services/email.service';
import { UserService } from '../src/services/user.service';
import { User } from '../src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line max-lines-per-function
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let emailService: EmailService;
  let userService: UserService;

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
            findOneByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    emailService = module.get<EmailService>(EmailService);
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
        otpPath: 'test',
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
        profileVisibility: 'private',
        notifications: [],
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
        otpPath: 'test',
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
        profileVisibility: 'private',
        notifications: [],
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
        otpPath: 'test',
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
        profileVisibility: 'private',
        notifications: [],
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
        otpPath: 'test',
        searchByEmailOrPhoneEnabled: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
        isAdmin: false,
        profileVisibility: 'private',
        notifications: [],
      };
      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new Error('Password needs to be valid.'));

      await expect(authController.register(mockUser)).rejects.toThrow(
        'Password needs to be valid.',
      );
    });
  });

  // eslint-disable-next-line max-lines-per-function
  describe('login', () => {
    it('should log in user and return access token', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
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
        profileVisibility: 'private',
        notifications: [],
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);
      jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce({ accessToken: 'mockAccessToken' });

      const result = await authService.login('test@example.com', 'password');

      expect(result.accessToken).toEqual('mockAccessToken');
    });

    it('should throw error User not found', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new NotFoundException('User not found.'));

      await expect(
        authService.login('test@example.com', 'password'),
      ).rejects.toThrow('User not found.');
    });

    it('should throw error Invalid password', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'InvalidPassword',
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
        profileVisibility: 'private',
        notifications: [],
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new NotFoundException('Invalid password.'));

      await expect(
        authService.login('test@example.com', 'password'),
      ).rejects.toThrow('Invalid password.');
    });
  });

  describe('resend-confirmation', () => {
    it('should not resend email if user does not exist', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      await authController.resendEmailConfirmation('nonexistent@example.com');

      expect(emailService.sendConfirmationEmail).not.toHaveBeenCalled();
    });
  });

  it('should resend email of confirmation', async () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
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
      profileVisibility: 'private',
      notifications: [],
    };

    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);

    jest.spyOn(emailService, 'sendConfirmationEmail').mockReturnValueOnce();

    await authController.resendEmailConfirmation('test@example.com');

    expect(emailService.sendConfirmationEmail).toHaveBeenCalledWith(mockUser);
  });
});
