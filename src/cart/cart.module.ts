import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports:[TypeOrmModule.forFeature([Cart,CartItem]),ConfigModule] ,
  exports:[CartService,TypeOrmModule]
})
export class CartModule {}
