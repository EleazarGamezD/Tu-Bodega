import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserDetailRepository, UserRepository } from 'src/repositories/user-repository';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userDetailsRepository: UserDetailRepository,

    private readonly jwtService: JwtService,
  ) { }

  //Find All Users
  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto; //we unstructured the paginationDTO to indicate the Limit and Offset
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        details: true,
      },
    });
    return users;
  }

  //delete user Detail (phone, adress, country, etc )
  async deleteUserDetail(userId, detailId: string): Promise<User> {
    const detailIndex = userId.details.findIndex(
      (detail) => detail.id === detailId,
    );

    if (detailIndex === -1) {
      throw new NotFoundException('User detail not found');
    }
    userId.details.splice(detailIndex, 1);
    await this.userDetailsRepository.delete(detailId);
    await this.userRepository.save(userId);

    return userId;
  }

  //add new Details (phone, adress, country, etc ) 

  async updateUserDetail(user, updateUserDto) {
    //   try {
    //     const { address, city, phone, country, password, ...userData } =
    //       updateUserDto|;

    //     if (!password) {
    //       throw new Error('Password is required');
    //     }
    //     //aplicamos el método bcrypt desestructurando la data y le indicamos que le de 10 vueltas
    //     const hashedPassword = bcrypt.hashSync(password, 10);
    //     //primero creamos el usuario con la clave ya encriptada
    //     const newUser = this.userRepository.create({
    //       ...userData,
    //       password: hashedPassword,
    //     });
    //     await this.userRepository.save(newUser);
    //     delete newUser.password;

    //     // luego insertamos los detalles del usuario relacionados a su ID
    //     const userDetails = this.userDetailsRepository.create({
    //       address,
    //       city,
    //       phone,
    //       country,
    //       user: newUser,
    //     });
    //     newUser.details = [userDetails];
    //     await this.userDetailsRepository.saveUsersDetails(userDetails);

    //     //retornar el JWT de acceso Con datos de usuario
    //     return { ...userData, token: this.getJwtToken({ id: userData.email }) };
    //   } catch (error) {
    //     this.handleException(error);
    //   }
    // }
  }
}
