import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from 'src/auth/auth.module';


import { CartRepository } from 'src/repositories/cart-repository';
import { OrderRepository } from 'src/repositories/order-repository';
import { UserRepository } from 'src/repositories/user-repository';
import { AuthService } from '../auth/auth.service';
import { CartModule } from 'src/cart/cart.module';
import { OrdersModule } from 'src/orders/orders.module';



@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    AuthService,
    CartRepository,
    OrderRepository,
    UserRepository,
    
  ],
  imports: [ProductsModule, AuthModule, CartModule, OrdersModule],
})
export class SeedModule {}
