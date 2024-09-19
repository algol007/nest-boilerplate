import { Controller, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users') // Grouping under 'users'
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post(':userId/generate-otp')
  @ApiOperation({ summary: 'Generate OTP for a user' })
  async generateOtp(@Param('userId') userId: number) {
    return this.usersService.generateOtp(userId);
  }

  @Post(':userId/verify-otp')
  @ApiOperation({ summary: 'Verify OTP for a user' })
  async verifyOtp(
    @Param('userId') userId: number,
    @Body() body: { otp: string },
  ) {
    return this.usersService.verifyOtp(userId, body.otp);
  }
}
