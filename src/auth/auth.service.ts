import { BadGatewayException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDetails } from './entities/user-details.entity';
import { Repository } from 'typeorm';
import { UserRolesGuard } from './guards/user-role/user-role.guard';

@Injectable()
export class AuthService {
  // creamos variable privada logger  para manejar los errores en la consola de NEST 
  private readonly logger = new Logger('ProductService');

  constructor(
  @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  
  @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,

    private readonly jwtService:JwtService,
    ){}
  

  async create(createUserDto:CreateUserDto) {
    try{
      const{address , city , phone, country, password, ...userData}= createUserDto
      
      if (!password) {
      throw new Error("Password is required");
      }
      //aplicamos el método bcrypt desestructurando la data y le indicamos que le de 10 vueltas 
      const hashedPassword = bcrypt.hashSync(password, 10);
      //primero creamos el usuario con la clave ya encriptada 
      const newUser = this.userRepository.create({ 
      ...userData,
      password: hashedPassword}) 
      await this.userRepository.save(newUser)
      delete newUser.password
     
      // luego insertamos los detalles del usuario relacionados a su ID 
      const userDetails = this.userDetailsRepository.create({
      address,
      city,
      phone,
      country,
      user: newUser,
    });
    newUser.details = [userDetails];
    await this.userDetailsRepository.save(userDetails);
  
      //retornar el JWT de acceso Con datos de usuario 
      return {...userData, token: this.getJwtToken({id: userData.email})}
    }
    catch(error){
      // console.log(error)
      this.handleException(error)
    }
    
  }

  async login (loginUserDto:LoginUserDto){
    try {
      const {password, email, userName}=loginUserDto
      const user = await this.userRepository.findOne({
        where: {email, userName},
        select: {email:true, password:true, id:true,  userName:true, roles:true, isActive:true} 
      })
      if(!user)
      throw new UnauthorizedException('Credentials are not valid (Email or UserName ) ')
    
      if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password) ')
      
      // console.log(user)

      return { ...user,
              token: this.getJwtToken({id: user.id})
             }
    } catch (error) {
      // console.log(error)
      this.handleException(error)      
    }

  }

  async checkAuthStatus ( user : User ){
   return {
        ...user,
        token: this.getJwtToken({id: user.id})
             }
  }

//metodo privado para obtener y manejar el token
private getJwtToken (payload:JwtPayload){
  const token = this.jwtService.sign(payload)
  return token;
}


// creacion de metodo privado de manejo de errores 
  private handleException (error:any):never  {
    if (error.code === '23505')
    {
      // console.log (error)
    throw new BadGatewayException(error.detail);}

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, Check Server Logs')

  }
}
