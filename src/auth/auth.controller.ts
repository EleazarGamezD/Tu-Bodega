import { Controller, Get, Post, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { RawHeaders,GetUser  } from './decorator';
import { IncomingHttpHeaders } from 'http';

import { Auth } from './decorator/auth.decorator';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  create(@Body() createUserDto:CreateUserDto, user: User) {
    return this.authService.create( createUserDto );
  }
  
  @Post('login')
  loginUser(@Body() loginUserDto:LoginUserDto) {
    return this.authService.login( loginUserDto );
  }
  
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User ){
   return this.authService.checkAuthStatus(user)
  }
 
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user : User,
    // @GetUser() userName : User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders : string[],  // custom decorador que trae los cabezales
    @Headers() headers: IncomingHttpHeaders // decorador que trae los cabezales (función ya incluida en nest)
  ){
      return {
      ok:true,
      message: 'hola mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers,
    }
  }


//  @Get('private2')
//  @SetMetadata('roles',['admin','user','super-user'])
//  @UseGuards( AuthGuard(), UserRoleGuard )
//  privateRoute2(
//   @GetUser() user :User
//  ){
//   return { 
//   ok : true, 
//   user
//   }
//  }


//  @Get('private2')
//  @RoleProtected(ValidRoles.user)
//  @UseGuards( AuthGuard(), UserRolesGuard )
//  privateRoute2(
//   @GetUser() user :User
//  ){
//   return { 
//   ok : true, 
//   user
//   }
//  }

// @Get('private3')
// @Auth(ValidRoles.admin,ValidRoles.user)
// privateRoute3(
//   @GetUser() user :User
//  ){
//   return { 
//   ok : true, 
//   user
//   }
//  }



}
