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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/express-user.interface';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('create')
  async createOrder(
    @Body() body: CreateOrderDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.orderService.createOrder(user, body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('pending')
  async getMyPendingProducts(@CurrentUser() user: userPayload) {
    try {
      return await this.orderService.myPendingProducts(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('all')
  async getMyOrders(@CurrentUser() user: userPayload) {
    try {
      return await this.orderService.myOrders(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('id/:id')
  async getOrderById(
    @Param('id') id: string,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.orderService.myOrderById(user, +id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('stats')
  async getStats(@CurrentUser() user: userPayload) {
    console.log(user);
    try {
      return await this.orderService.myOrdersStats(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Post('from-cart')
  async creatOrderFromCart(@CurrentUser() user: userPayload) {
    try {
      return await this.orderService.createOrderByCart(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('delete/:id')
  async cancelOrderById(
    @Param('id') id: string,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.orderService.cancelMyOrder(user, +id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
