import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('createItem')
  @HttpCode(201)
  @Auth(ValidRoles.admin)
  @ApiBearerAuth('token')
  @ApiResponse({
    status: 201,
    description: 'product was created',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 201, description: 'get All Products', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @HttpCode(200)
  @ApiResponse({
    status: 201,
    description: 'Product by ${term} found',
    type: Product,
  })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @ApiBearerAuth('token')
  @HttpCode(200)
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 201,
    description: 'product was updated',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth('token')
  @HttpCode(200)
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 201,
    description: 'product was removed',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.productsService.remove(id);
  }
}
