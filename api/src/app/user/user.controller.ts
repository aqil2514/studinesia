import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUserById(@Query('user_id') userId: string) {
    return this.userService.getUserByUserId(userId);
  }
}
