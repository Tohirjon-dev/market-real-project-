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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

@UseGuards(AuthGuard, RolesGuard)
@RolesDeco('ADMIN')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDeco('ADMIN')
  @Post('create')
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('search')
  async searchProducts(@Query('name') query: string) {
    try {
      return await this.productService.searchProduct(query);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDeco('ADMIN')
  @Patch('add')
  async addProduct(@Body() body: UpdateProductDto) {
    try {
      return await this.productService.addProduct(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
