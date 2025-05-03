import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { extractLocalPhoneNumber } from 'src/common/utils/phone.utils';
@Injectable()
export class SuperAdminService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  async onModuleInit() {
    await this.createSuperAdmin();
  }
  async createSuperAdmin() {
    const findSuperAdmin = await this.prisma.user.findFirst({
      where: {
        role: 'SUPERADMIN',
      },
    });
    if (findSuperAdmin) return;
    const hashedPassword = await bcrypt.hash(
      process.env.SuperAdmin_password!,
      10,
    );
    const normalPhoneNumber = await extractLocalPhoneNumber(
      process.env.SuperAdmin_phone_number!,
    );
    await this.prisma.user.create({
      data: {
        name: process.env.SuperAdmin_name!,
        email: process.env.SuperAdmin_email!,
        password: hashedPassword,
        phone_number: normalPhoneNumber,
        role: 'SUPERADMIN',
        is_verified: true,
      },
    });
  }
  async createAdmin(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser)
      throw new BadGatewayException('Bunday id li foydalanuvchi topilmadi');
    await this.prisma.user.update({ where: { id }, data: { role: 'ADMIN' } });
    return {
      message: `${findUser.name} ismli userga  ADMIN roli tayinlandi`,
    };
  }
  async getAllUsers() {
    return await this.prisma.user.findMany({ where: { role: 'USER' } });
  }
  async getAllAdmins() {
    return await this.prisma.user.findMany({ where: { role: 'ADMIN' } });
  }
  async deleteUserById(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) throw new BadRequestException('Bunday id li user topilmadi');
    await this.prisma.user.delete({ where: { id } });
    return {
      message: "Foydalanuvchi muvafaqiyatli o'chirib yuborildi",
    };
  }
}
