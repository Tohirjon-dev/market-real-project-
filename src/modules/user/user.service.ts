import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { userPayload } from 'src/common/interfaces/express-user.interface';
import { ResetPAsswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { pid } from 'process';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async resetPassword(
    userData: userPayload,
    resetPasswordDto: ResetPAsswordDto,
  ) {
    const hasshedPassword = await bcrypt.hash(
      resetPasswordDto.new_password,
      10,
    );
    await this.prisma.user.update({
      where: { id: userData.id },
      data: {
        password: hasshedPassword,
        updatedAt: new Date(),
      },
    });
    return {
      message: "Parol muvafaqiyatli o'zgartirildi",
      newPassword: resetPasswordDto.new_password,
    };
  }
  async getMe(user: userPayload) {
    return await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        phone_number: true,
        email: true,
        status: true,
      },
    });
  }
  async banUserById(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) throw new ConflictException('Bunday id li user topilmadi');
    if (findUser.status === 'BANNED')
      throw new BadRequestException('Foydalanuvchi allaqachon BAN xolatida');
    await this.prisma.user.update({
      where: { id },
      data: { status: 'BANNED' },
    });
    return { message: `${id} id li foydalanuvchi bloklandi` };
  }
  async activeUserById(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) throw new ConflictException('Bunday id li user topilmadi');
    if (findUser.status === 'ACTIVE')
      throw new BadRequestException('Foydalanuvchi allaqachon ACTIVE xolatida');
    await this.prisma.user.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
    return { message: `${id} id li foydalanuvchi ACTIVE xolatiga o'tkazildi` };
  }
}
