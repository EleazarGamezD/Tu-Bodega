import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser, RawHeaders } from 'src/auth/decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService
    
    ) {}


  @Post('place-order')
  @UseGuards(AuthGuard())
   async purchaseCart( 
    @GetUser() user : User,): Promise<Order> {   
    return this.cartService.placeOrder(user)
    }

   @Post('add-item')
   @UseGuards(AuthGuard())
   addItemToCart(
    @GetUser() user : User,
    @Body() createCartDto: CreateCartItemDto) {
    return this.cartService.addItemToCart(createCartDto,user);
  }
}
