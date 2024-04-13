import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
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

  @Put('/change-username')
  async changeUsername(@Request() req, @Body() body) {
    const userId = req.user.id;
    const { newUsername } = body;
    await this.userService.changeUsername(userId, newUsername);

    return { success: true, message: 'Username changed successfully' };
  }

  @Get('allUsernames')
  async getAllUsernames() {
    return await this.userService.getAllUsernames();
}

}
