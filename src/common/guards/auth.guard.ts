import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.authToken;
    try {
      if (!token)
        throw new UnauthorizedException(
          "Token topilmadi,iltimos logindan o'ting",
        );
      const decoded = await this.jwt.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        "Token muddati eskirgan, qaytadan logindan o'ting",
      );
    }
  }
}
