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
import { SuperAdminService } from './super-admin.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}
  @Get('create-admin/:id')
  async createAdmin(@Param('id') id: string) {
    try {
      return await this.superAdminService.createAdmin(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('admins')
  async getAllAdmins() {
    try {
      return await this.superAdminService.getAllAdmins();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('users')
  async getAllUsers() {
    try {
      return await this.superAdminService.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('delete/:id')
  async deleteUserById(@Param('id') id: string) {
    try {
      return await this.superAdminService.deleteUserById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
