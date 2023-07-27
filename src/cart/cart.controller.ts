import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';

import { ApiTags } from '@nestjs/swagger';
import {  GetUser } from 'src/auth/decorator';

import { User } from 'src/auth/entities/user.entity';

import { AuthGuard } from '@nestjs/passport';


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

  @Post('place-order')
  @UseGuards(AuthGuard())
  async placeOrder(@GetUser() user: User){
  return this.cartService.placeOrder(user);

}
}