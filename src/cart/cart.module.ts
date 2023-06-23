import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports:[ConfigModule] ,
})
export class CartModule {}
