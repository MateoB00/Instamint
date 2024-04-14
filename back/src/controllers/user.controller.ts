import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
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
}
