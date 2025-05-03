import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { loginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Post('login')
  async login(
    @Body() body: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(body);
    res.cookie('authToken', data.token, {
      httpOnly: true,
    });
    try {
      return data.data;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
