import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Body,
  HttpStatus,
  Delete,
  Param,
  Patch,
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
    const loggedInUser = req.user;

    return this.userService.findOneById(loggedInUser.id);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req, @Body() user: User) {
    const loggedInUser = req.user;

    const reponse = this.userService.update(loggedInUser, user);

    return reponse;
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Request() req) {
    try {
      const loggedInUser = req.user;

      await this.userService.deleteUser(loggedInUser.id);

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

  @Get(':link')
  async findByLink(@Param('link') link: string) {
    try {
      const user = await this.userService.findByLink(link);
      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        user,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch user',
        error: error.message,
      };
    }
  }

  @Patch(':id/visibility')
  changeVisibility(@Param('id') id: number, @Body('visibility') visibility: 'private' | 'public',
  ) {
      return this.userService.changeVisibility(id, visibility);
  }
}
