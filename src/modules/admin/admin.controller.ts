import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@RolesDeco('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Patch('order/:id/procces')
  async markOrderAsProcess(@Param('id') id: string) {
    try {
      return await this.adminService.markOrderAsProcessing(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Patch('order/:id/ship')
  async markOrderAsShip(@Param('id') id: string) {
    try {
      return await this.adminService.markOrderAsShipped(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Patch('order/:id/deliver')
  async markOrderAsDeliver(@Param('id') id: string) {
    try {
      return await this.adminService.markOrderAsDelivered(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('weekly-income')
  async weeklIncome() {
    try {
      return await this.adminService.weeklyIncome();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
