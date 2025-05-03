import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addProductToCard(userId: number, productId: number) {
    const findProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!findProduct)
      throw new NotFoundException('Bunday id li mahsulot topilmadi');
    const existingCartItem = await this.prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    if (existingCartItem) {
      const updatedCartItem = await this.prisma.cart.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return updatedCartItem;
    } else {
      const newCartItem = await this.prisma.cart.create({
        data: {
          userId,
          productId,
          quantity: 1,
        },
      });
      return newCartItem;
    }
  }
  async getAllProductsMyCart(user_id: number) {
    return await this.prisma.$queryRaw<
      { productId: number; name: string; price: number; quantity: number }[]
    >`
    SELECT 
      p.id as "productId", 
      p.name, 
      p.price, 
      c.quantity
    FROM carts c
    JOIN products p ON c."productId" = p.id
    WHERE c."userId" = ${user_id}
  `;
  }
  async totalValuMyCart(user_id: number) {
    const result = await this.prisma.$queryRaw<{ totalValue: number }[]>`
   SELECT COALESCE(SUM(COALESCE(p.price, 0) * COALESCE(c.quantity, 0)), 0) AS "totalValue"
  FROM carts c
  JOIN products p ON c."productId" = p.id
  WHERE c."userId" = ${user_id}
    `;
    return { totalValue: result[0]?.totalValue ?? 0 };
  }
  async removeProductFromCart(userId: number, productId: number) {
    const findProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!findProduct)
      throw new NotFoundException(
        'Bunday id li maxsulot savatingizda mavjud emas',
      );
    const deleteProduct = await this.prisma.cart.delete({
      where: {
        userId_productId: { userId, productId },
      },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });
    return {
      message: "Maxsulot savatdan o'chirib yuborildi",
      product_name: deleteProduct.product.name,
    };
  }
  async clearCart(userId: number) {
    await this.prisma.cart.deleteMany({ where: { userId } });
    return { message: 'Savat tozalandi' };
  }
  async checkCartSort(userId: number) {
    const result = await this.prisma.$queryRaw<
      {
        name: string;
        price: number;
        stock: number;
        is_available: boolean;
      }[]
    >`
    SELECT
    p.name,
    p.price,
    p.stock,
    CASE 
    WHEN p.stock > 0 THEN true
    ELSE false
    END AS is_available
    FROM "carts" AS c
    JOIN "products" AS p ON c."productId" = p.id
    WHERE c."userId" = ${userId}
    `;
    const available = result.filter((item) => item.is_available);
    const unavailable = result.filter((item) => !item.is_available);
    return { available, unavailable };
  }
}
