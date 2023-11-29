import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from './decorator';

import { Auth } from './decorator/auth.decorator';
import { ApiBearerAuth,ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from './interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(201)
  @ApiResponse({ status: 200, description: 'User Created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} createUserDto - The data to create the user.
   * @param {User} user - The user object.
   * @return {Promise<any>} A promise that resolves with the created user.
   */
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 204, description: 'Email or Password Invalid' })
  /**
   * Logs in a user with the provided email and password.
   * @param loginUserDto - The login user data transfer object containing the user's email and password.
   * @returns A promise that resolves to the result of the login operation.
   */
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Token Renovated', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 204, description: 'Email or Password Invalid' })
  @ApiBearerAuth('token')
  @Auth(ValidRoles.admin)
  @UseGuards(AuthGuard('jwt'))
  /**
   * Checks the authentication status of the user.
   *
   * @param {User} user - The user object.
   * @return {void} Returns nothing.
   */
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
