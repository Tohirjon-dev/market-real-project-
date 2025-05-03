import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/express-user.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('add')
  async addProductToCart(
    @Query('product_id') product_id: string,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.cartService.addProductToCard(user.id, +product_id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('all')
  async getAllProductsMyCart(@CurrentUser() user: userPayload) {
    try {
      return await this.cartService.getAllProductsMyCart(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('total')
  async totalValuMyCart(@CurrentUser() user: userPayload) {
    try {
      return await this.cartService.totalValuMyCart(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('remove/:id')
  async removeProduct(
    @Param('id') id: string,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.cartService.removeProductFromCart(user.id, +id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('clear')
  async clearCart(@CurrentUser() user: userPayload) {
    try {
      return await this.cartService.clearCart(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('check')
  async checkCart(@CurrentUser() user: userPayload) {
    try {
      return await this.cartService.checkCartSort(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
