import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  
  @Post('place-order')
  createOrder(
  @Body() order: Order,
  @Body() items: CartItem[]): Promise<Order> {
    return this.ordersService.createOrder(order, items);
}


}