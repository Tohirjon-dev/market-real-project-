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
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @RolesDeco('ADMIN')
  @Post('create')
  async createCategory(@Body() body: CreateCategoryDto) {
    try {
      return await this.categoryService.createCategory(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('all')
  async getAllCategories() {
    try {
      return this.categoryService.getAllCategories();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('allWithProducts')
  async GetAllWithProducts() {
    try {
      return await this.categoryService.getcategoriesWithProducts();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @RolesDeco('ADMIN')
  @Get('total_sum')
  async getTotalAmountByCategory() {
    try {
      return await this.categoryService.getTotalAmountByCategory();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @RolesDeco('ADMIN')
  @Delete('delete/:id')
  async removeById(@Param('id') id: string) {
    try {
      return await this.categoryService.removeCategoryById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
