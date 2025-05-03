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
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/express-user.interface';

@UseGuards(AuthGuard)
@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}
  @Post('create')
  async createAdress(
    @Body() body: CreateAdressDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.adressService.createAdress(user, body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('me')
  async getMyAdress(@CurrentUser() user: userPayload) {
    try {
      return await this.adressService.getMyAdress(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Patch('update')
  async updateAdress(
    @Body() body: UpdateAdressDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.adressService.updateAdress(body, user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('delete')
  async deleteMyAdress(@CurrentUser() user: userPayload) {
    try {
      return await this.adressService.deleteMyAdress(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
