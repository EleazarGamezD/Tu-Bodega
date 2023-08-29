import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateUserDto } from 'src/auth/dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'get All users', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin)
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Delete('delete-detail/:term')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Detail Deleted', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.user, ValidRoles.admin)
  removeUserDetail(
    @GetUser() user: User,
    @Param('term', ParseUUIDPipe) term: string,
  ) {
    return this.usersService.deleteUserDetail(user, term);
  }

  //TODO refactorizar el codigo para actualizar los datos de los usuarios 
  @Patch('update-user')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User has been Updated',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @GetUser() user: User,

    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user, updateUserDto);
  }

  @Post('add-details-user')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'the Details has been added ',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard('jwt'))
  addDetailsToUser(
    @GetUser() user: User,
    @Body()    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.addDetailsToUser(user, updateUserDto);
  }

  //TODO hacer la funcion de edicion y eliminacion de una de las direcciones
  //TODO hacer la funcion para actualizar los datos de un cliente "direccion o datos personales "
}
