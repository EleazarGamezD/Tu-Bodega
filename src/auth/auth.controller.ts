import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from './decorator';

import { Auth } from './decorator/auth.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from './interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto, user: User) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @HttpCode(200)
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('all-users')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'get All users', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth()
  @Auth(ValidRoles.admin)
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  //TODO hacer la funcion de edicion y eliminacion de una de las direcciones
  //TODO hacer la funcion para actualizar los datos de un cliente "direccion o datos personales "
}
