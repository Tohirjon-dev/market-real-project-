import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ReviewModule } from './modules/review/review.module';
import { AdressModule } from './modules/adress/adress.module';
import { CartModule } from './modules/cart/cart.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import AllConfig from './common/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exceptions.filter';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    AuthModule,
    CategoryModule,
    SuperAdminModule,
    OrderModule,
    OrderItemModule,
    ReviewModule,
    AdressModule,
    CartModule,
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: AllConfig,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return config.get('JWT_CONFIG') as JwtModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
