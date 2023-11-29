import { Controller, Post, Body, UseGuards, Get, Param, Query, HttpCode,  } from '@nestjs/common';
import { CartItem } from "./../cart/entities/cart-item.entity";

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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


  @Auth(ValidRoles.admin,ValidRoles.user)
  @UseGuards(AuthGuard())
  async createOrder(
    @Body() order: Order,
    @Body() items: CartItem[],
  ): Promise<Order> {
    return this.ordersService.createOrder(order, items);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Get Order', type: Order })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') term: string) {
    return this.ordersService.findOneTerm(term);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Get All Orders', type: Order })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  
}