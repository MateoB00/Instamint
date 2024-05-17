import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeabagService } from '../services/teabag.service';

@Controller('teabag')
export class TeabagController {
  constructor(private teabagService: TeabagService) {
    // Do nothing.
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() body) {
    return this.teabagService.create(req.user.id, body);
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async update(@Request() req, @Body() teabagChanges) {
    return await this.teabagService.update(req.user, teabagChanges);
  }

  @Get('all')
  getAll() {
    return this.teabagService.getAll();
  }

  @Get(':link')
  getOne(@Param('link') link: string) {
    return this.teabagService.getOneByLink(link);
  }
}
