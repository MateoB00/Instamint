import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Body,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    // Do nothing.
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findById(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req, @Body() user: User) {
    return this.userService.update(req.user, user);
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Request() req) {
    try {
      await this.userService.deleteUser(req.user.id);

      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete user',
        error: error.message,
      };
    }
  }
}
