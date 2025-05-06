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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';

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
  @UseGuards(RolesGuard)
  @RolesDeco('ADMIN')
  @Patch('ban/:id')
  async banUserById(@Param('id') id: string) {
    try {
      return await this.userService.banUserById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @UseGuards(RolesGuard)
  @RolesDeco('ADMIN')
  @Patch('active/:id')
  async activeUserById(@Param('id') id: string) {
    try {
      return await this.userService.activeUserById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('close')
  async close() {
    
  }
}
