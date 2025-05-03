import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(AuthGuard, RolesGuard)
@RolesDeco('SUPERADMIN', 'ADMIN')
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });
    if (findCategory)
      throw new ConflictException('Bu kategoriya allaqachon mavjud');
    const newCatgory = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return {
      message: 'Kategoriya muvafaqiyatli yaratildi',
      ...newCatgory,
    };
  }
  async getAllCategories() {
    return await this.prisma.category.findMany();
  }
  async getcategoriesWithProducts() {
    return await this.prisma.category.findMany({ include: { products: true } });
  }
  async getTotalAmountByCategory() {
    const result = await this.prisma.$queryRaw`
    SELECT 
    c.id,
    c.name,
    COALESCE(SUM(p.price * p.stock), 0) as totalValue
  FROM categories c
  LEFT JOIN products p ON p."categoryId" = c.id
  GROUP BY c.id, c.name
  ORDER BY totalValue DESC`;
    return result;
  }
}
