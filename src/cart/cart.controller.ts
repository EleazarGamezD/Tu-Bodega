import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
   @Auth(ValidRoles.user)
  update(@Param('id') id: string, 
  @Body() updateCartDto: UpdateCartDto,
  @GetUser() user:User,) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(
  @Param('id') id: string,
  @GetUser() user:User, ) {
    return this.cartService.remove(+id);
  }
}
