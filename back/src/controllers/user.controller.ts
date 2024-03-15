import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
}
