import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService  } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){

constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService:ConfigService
)
{
    super({
        secretOrKey: configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
}

    async validate(payload: JwtPayload): Promise<User>{
        //desestructuramos el payload y extraemos el Email
        const {id} = payload;
        // buscamos el email dentro del repositorio User 
        const user = await this.userRepository.findOneBy({id})
        // si el Email que viene desde el User no conincide lanzamos el siguiente caso
        if(!user)
        throw new UnauthorizedException('Token not valid ')
        // en caso de que el Email coincida con el contenido en el User verificamos si esta activo o no 
        if(!user.isActive)
        throw new UnauthorizedException('User is Inactive, Talk with an Admin');        
        
        return user;
    }
    
}