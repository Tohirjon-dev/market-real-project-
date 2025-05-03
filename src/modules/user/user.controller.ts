import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResetPAsswordDto } from './dto/reset-password.dto';
import { userPayload } from 'src/common/interfaces/express-user.interface';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('reset_password')
  async resetPassword(
    @Body() body: ResetPAsswordDto,
    @CurrentUser() userData: userPayload,
  ) {
    try {
      return await this.userService.resetPassword(userData, body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('me')
  async getMe(@CurrentUser() user: userPayload) {
    try {
      return await this.userService.getMe(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
