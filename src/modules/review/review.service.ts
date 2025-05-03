import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { userPayload } from 'src/common/interfaces/express-user.interface';
import { DeliveryReviewgDto } from './dto/deliver-ratings.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async createReview(dto: CreateReviewDto, user: userPayload) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id: dto.orderItemId },
      include: {
        order: true,
        product: true,
      },
    });
    if (!orderItem) throw new BadRequestException('OrderItem topilmadi');
    if (orderItem.order.userId !== user.id)
      throw new BadRequestException('Siz bu buyurtmaga egalik qilmaysiz');
    if (orderItem.order.status !== 'DELIVERED')
      throw new BadRequestException(
        'Siz faqat yetkazib berilgan mahsulotga review yoza olasiz',
      );
    const alreadyReviewed = await this.prisma.review.findFirst({
      where: { userId: user.id, orderItemId: dto.orderItemId },
    });
    if (alreadyReviewed)
      throw new BadRequestException('Bu mahsulotga oldin sharx yozgansiz');
    const review = await this.prisma.review.create({
      data: {
        userId: user.id,
        productId: orderItem.productId,
        orderItemId: dto.orderItemId,
        content: dto.content,
        rating: dto.rating,
      },
    });

    return {
      message: 'Fikr mulohazangiz uchun tashakkur',
      reviewId: review.id,
      name: orderItem.product.name,
      rating: review.rating,
      content: review.content,
    };
  }
  async deliveryRating(dto: DeliveryReviewgDto, user: userPayload) {
    const findOrder = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });
    if (!findOrder)
      throw new BadRequestException(
        'Bunday id li buyurtma amalga oshirmagansiz',
      );
    const alreadyReviewed = await this.prisma.order.findFirst({
      where: { userId: user.id, id: dto.orderId },
    });
    if (alreadyReviewed)
      throw new BadRequestException(
        'Siz allaqachon bu buyurtma yetkazib berilishini baxolab bolgansiz',
      );
    const ratings = await this.prisma.order.update({
      where: { id: findOrder.id },
      data: {
        deliverRating: dto.deliveryRating,
        deliveryFeedback: dto.deliveryFeedback,
      },
    });
    return {
      message: 'Fikr mulohazangiz uchun tashakkur',
      deliveryRating: ratings.deliverRating,
      deliveryFeedback: ratings.deliveryFeedback,
    };
  }
  async deleteReviewById(reviewId: number, user: userPayload) {
    const findReview = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!findReview)
      throw new BadRequestException(
        'Bunday id li buyurtma uchun  sharx topilmadi',
      );
    if (findReview?.userId !== user.id)
      throw new BadRequestException('Bu buyurtma sizga tegishli emas');
    await this.prisma.review.delete({ where: { id: reviewId } });
    return {
      message: "Qoldirilgan sharx va ratinglar o'chirib yuborildi ",
      deleted: findReview,
    };
  }
}
