import { Injectable } from '@nestjs/common';

import { userPayload } from 'src/common/interfaces/express-user.interface';
import { ResetPAsswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
