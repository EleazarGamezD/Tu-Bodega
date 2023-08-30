import { Controller, Post, Body, UseGuards, Get, Param, Query, HttpCode,  } from '@nestjs/common';
import { CartItem } from "./../cart/entities/cart-item.entity";

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';


import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorator';
import { OrdersService } from './orders.service';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('place-order')
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin,ValidRoles.user)
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async createOrder(
    @Body() order: Order,
    @Body() items: CartItem[],
  ): Promise<Order> {
    return this.ordersService.createOrder(order, items);
  }

  @Get(':term')
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @HttpCode(200)
  findOne(@Param('term') term: string) {
    return this.ordersService.findOneTerm(term);
  }

  @Get()
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin)
  @HttpCode(200)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  //TODO agregar todos los api response para el swagger
}