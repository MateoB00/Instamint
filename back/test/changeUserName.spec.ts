import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';

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
              changeUsername: jest.fn(),
              findOneById: jest.fn(),
            },
          },
        ],
      }).compile();
  
      userController = module.get<UserController>(UserController);
      userService = module.get<UserService>(UserService);
    });
  
  
    describe('changeUsername', () => {
      it('should change username successfully', async () => {
        const userId = 1;
        const newUsername = 'newUsername';
        jest.spyOn(userService, 'changeUsername').mockResolvedValue(true);
  
        const req = {
          user: { id: userId },
        };
        const body = { newUsername };
  
        const result = await userController.changeUsername(req, body);
  
        expect(userService.changeUsername).toHaveBeenCalledWith(userId, newUsername);
        expect(result).toEqual({ success: true, message: 'Username changed successfully' });
      });
  
      it('should throw error when username is already taken', async () => {
        const userId = 1;
        const newUsername = 'existingUsername';
        jest.spyOn(userService, 'changeUsername').mockRejectedValue(new Error('Username is already taken'));
  
        const req = {
          user: { id: userId },
        };
        const body = { newUsername };
  
        await expect(userController.changeUsername(req, body))
          .rejects
          .toThrow('Username is already taken');
  
        expect(userService.changeUsername).toHaveBeenCalledWith(userId, newUsername);
      });
    });
  
  });
  