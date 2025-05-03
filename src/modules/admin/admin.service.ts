import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async markOrderAsProcessing(orderId: number) {
    const findOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!findOrder)
      throw new NotFoundException('Bunday id li nuyurtma topilmadi');
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PROCESSING',
      },
    });
    return { message: 'Buyurtma PROCESSING qilindi' };
  }
  async markOrderAsShipped(orderId: number) {
    const findOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!findOrder)
      throw new NotFoundException('Bunday id li nuyurtma topilmadi');
    if (findOrder.status !== 'PROCESSING')
      throw new BadRequestException(
        'Faqat PROCESSING bolgan buyurtmalar SHIPPED qilinadi',
      );
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'SHIPPED',
      },
    });
    return { message: 'Buyurtma SHIPPED qilindi' };
  }
  async markOrderAsDelivered(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Bunday id li buyurtma topilmadi');
    }

    if (order.status !== 'SHIPPED') {
      throw new BadRequestException(
        'Faqat SHIPPED bolgan buyurtmalar DELIVERED qilinadi',
      );
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'DELIVERED' },
    });

    return { message: 'Buyurtma DELIVERED qilindi' };
  }
  async weeklyIncome() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const income = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: 'DELIVERED',
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });
    return { message: `Bir haftalik daromad:${income._sum.total || 0} $` };
  }
}
