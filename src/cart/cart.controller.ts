import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';

import { ApiTags } from '@nestjs/swagger';
import {  GetUser } from 'src/auth/decorator';

import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { AuthGuard } from '@nestjs/passport';
import { Cart } from './entities/cart.entity';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService
    
    ) {}

    
 @Post('add-item')
    @UseGuards(AuthGuard())
     addItemToCart(
     @GetUser() user : User,
     @Body() createCartDto: CreateCartItemDto) {
     return this.cartService.addItemToCart(createCartDto,user);
   }

  // @Post('place-order')
  //   @UseGuards(AuthGuard())
  //   async purchaseCart( 
  //   @GetUser() user : User): Promise<Order> {   
  //   return this.cartService.placeOrder(user,items[])
  //   }

  @Post('place-order')
  @UseGuards(AuthGuard())
  async placeOrder(@GetUser() user: User){
  return this.cartService.placeOrder(user);

}
}