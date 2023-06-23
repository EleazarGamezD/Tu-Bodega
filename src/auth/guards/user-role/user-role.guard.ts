import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorator/role-protected/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {
  

  constructor(
    private readonly reflector: Reflector
  ){}
  
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string []= this.reflector.get(META_ROLES, context.getHandler())
    
    if (!validRoles) return true 
    if (validRoles.length === 0) return true
    
    const req = context.switchToHttp().getRequest()
    const user = req.user as User;
          if(!user)
    throw new BadRequestException('user not found')
          for (const role of user.roles){
            if(validRoles.includes (role)){
              return true
            }
          }
   throw new ForbiddenException (`User ${user.fullName} need a valid role`)
  }
}
