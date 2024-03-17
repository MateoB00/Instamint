import { Controller, Get, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';

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

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Request() req) {
    const { userId } = req.user;

    return await this.userService.deleteUser(userId);
  }
}
