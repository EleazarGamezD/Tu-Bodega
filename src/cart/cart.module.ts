import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AuthModule } from 'src/auth/auth.module';
import { CartItemRepository, CartRepository } from 'src/repositories/cart-repository';


@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository, CartItemRepository], //?remember add personal or extends repository's here
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    ConfigModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],

  exports: [CartService, TypeOrmModule],
})
export class CartModule {}
