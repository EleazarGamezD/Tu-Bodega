import { Controller, Post, Body, UseGuards,  } from '@nestjs/common';
import { CartItem } from "./../cart/entities/cart-item.entity";
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';


import { AuthGuard } from '@nestjs/passport';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  
@Post('place-order')
@UseGuards(AuthGuard())
  async createOrder(
    @Body() order: Order,
    @Body() items:CartItem[],
  ): Promise<Order> {
    return this.ordersService.createOrder(order, items);
  }
}



