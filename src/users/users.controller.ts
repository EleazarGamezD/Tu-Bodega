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
import { UpdateUserDetailsDto } from 'src/auth/dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('users')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'get All users', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard('jwt'))
  @Auth(ValidRoles.admin)
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('user/:id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'get user by id', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard('jwt'))
  @Auth(ValidRoles.admin)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('user/:id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'User has been Updated', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard('jwt'))
  @Auth(ValidRoles.admin)
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
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
  @UseGuards(AuthGuard('jwt'))
  @Auth(ValidRoles.admin, ValidRoles.user)
  addDetailsToUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.addDetailsToUser(user, updateUserDto);
  }

  //TODO refactorizar el codigo para actualizar los datos de los usuarios
  @Patch('update-details/:id')
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
  @UseGuards(AuthGuard('jwt'))
  @Auth(ValidRoles.admin, ValidRoles.user)
  updateUser(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateUserDetailsDto: UpdateUserDetailsDto,
    @GetUser() user: User,
  ) {
    return this.usersService.updateUserDetails(id, user, updateUserDetailsDto);
  }


  //? test delete user whit codium func delete-user-detail
  @Delete('delete-detail/:id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Detail Deleted', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, Token related' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.user, ValidRoles.admin)
  /**
 * Remove user detail.
 *
 * @param user - The authenticated user.
 * @param term - The ID of the user detail to be removed.
 * @returns - A Promise that resolves to the result of the deletion operation.
 */
  removeUserDetail(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) term: string,
  ) {
    return this.usersService.deleteUserDetail(user, term);
  }


  //TODO hacer la funcion de edicion y eliminacion de una de las direcciones
  //TODO hacer la funcion para actualizar los datos de un cliente "direccion o datos personales "
}
