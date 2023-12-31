import { Controller, Post, Body, UseGuards, HttpCode, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-item')
  @ApiResponse({ status: 200, description: 'New Item Added' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @HttpCode(200)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  @Auth(ValidRoles.admin, ValidRoles.user)
  addItemToCart(
    @GetUser() user: User,
    @Body() createCartDto: CreateCartItemDto,
  ) {
    return this.cartService.addItemToCart(createCartDto, user);
  }

  //TODO verificar antes de hacer el place order (si no tiene items o estos estan en 0 debe limpiar y ejecutar el place order )
  @Post('place-order')
  @ApiResponse({ status: 201, description: 'Order Has been Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async placeOrder(@GetUser() user: User) {
    return this.cartService.placeOrder(user);
  }

  @Delete('clear-item')
  @ApiResponse({ status: 200, description: 'Item Deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async updateOrder(@GetUser() user: User) {
    'this items has ben updated '; //TODO hacer la logica para poder limpiar un item en especifico "no modificar la cantidad BORRA"
  }
}
