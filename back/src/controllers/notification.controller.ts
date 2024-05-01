import {
  Controller,
  UseGuards,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from '../services/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {
    // Do nothing.
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me/notifications')
  async getMyNotifications(@Request() req) {
    try {
      const loggedInUser = req.user;
      const notifications =
        await this.notificationService.findAllNotificationsByUserId(
          loggedInUser.id,
        );

      return {
        statusCode: HttpStatus.OK,
        data: notifications,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to get notifications',
        error: error.message,
      };
    }
  }
}
