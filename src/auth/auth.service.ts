import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import {
  UserDetailRepository,
  UserRepository,
} from 'src/repositories/user-repository';

@Injectable()
export class AuthService {
  // creamos variable privada logger  para manejar los errores en la consola de NEST
  private readonly logger = new Logger('ProductService');

  constructor(
    private readonly userRepository: UserRepository,

    private readonly userDetailsRepository: UserDetailRepository,

    private readonly jwtService: JwtService,
  ) { }

  /**
   * Creates a new user using the provided CreateUserDto.
   *
   * @param {CreateUserDto} createUserDto - The data needed to create a new user.
   * @return {Promise<object>} - The created user's data along with an access JWT token.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const { address, city, phone, country, password, ...userData } =
        createUserDto;

      if (!password) {
        throw new Error('Password is required');
      }
      //aplicamos el método bcrypt desestructurando la data y le indicamos que le de 10 vueltas
      const hashedPassword = bcrypt.hashSync(password, 10);
      //primero creamos el usuario con la clave ya encriptada
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
      delete newUser.password;

      // luego insertamos los detalles del usuario relacionados a su ID
      const userDetails = this.userDetailsRepository.create({
        address,
        city,
        phone,
        country,
        user: newUser,
      });
      newUser.details = [userDetails];
      await this.userDetailsRepository.saveUsersDetails(userDetails);

      //retornar el JWT de acceso Con datos de usuario
      return { ...userData, token: this.getJwtToken({ id: userData.email }) };
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Logs in a user.
   *
   * @param {LoginUserDto} loginUserDto - The user login data.
   * @return {Promise<object>} - An object containing the logged in user and a JWT token.
   */
  async login(loginUserDto: LoginUserDto) {  //TODO hacer cambios para devolver https Status en Validacion de Email y Password 
    try {
      const { password, email, userName } = loginUserDto;

      const user = await this.userRepository.findUser(email, userName);
      if (!user)
        return {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'Email Not Found ',
        };

      if (!bcrypt.compareSync(password, user.password))

        return {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'Credentials are not valid (password) ',
        };


      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Asynchronously checks the authentication status of a user.
   *
   * @param {User} user - The user object to check the authentication status for.
   * @return {Object} - The updated user object with the JWT token added.
   */
  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  //método privado para obtener y manejar el token
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  // creación de método privado de manejo de errores
  private handleException(error: any): never {
    if (error.code === '23505') {
      // console.log (error)
      throw new BadGatewayException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, Check Server Logs',
    );
  }
}
