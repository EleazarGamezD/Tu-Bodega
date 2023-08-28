import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  UserDetailRepository,
  UserRepository,
} from 'src/repositories/user-repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userDetailsRepository: UserDetailRepository,

    private readonly jwtService: JwtService,
  ) {}

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

  //delete user Detail (phone, address, country, etc )
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

  //add new Details (phone, address, country, etc )

  async updateUser(user: User, updateUserDto): Promise<User> {
    console.table(user);
    console.table(updateUserDto)
   
    const userDetails = updateUserDto
    // Actualizar los campos de roles y isActive del usuario
    user.roles = updateUserDto.roles;
    user.isActive = updateUserDto.isActive;

    // Guardar los cambios en el usuario
    await this.userRepository.save(user);

    // Verificar si se proporcionaron campos para los detalles del usuario
    
      const detailIndex = user.details.findIndex(
        (detail) => detail.id
      );

      // Si userDetails existe, actualizar los campos proporcionados
    if (detailIndex === -1) {
       const { address, city, phone, country, password, ...userData } =
         updateUserDto;
      const newUserDetails = this.userDetailsRepository.create({
        address,
        city,
        phone,
        country,
        user
      });
        user.details = [newUserDetails];
        await this.userDetailsRepository.saveUsersDetails(newUserDetails)

        
      } else {
        userDetails.address = updateUserDto.address || userDetails.address;
        userDetails.city = updateUserDto.city || userDetails.city;
        userDetails.phone = updateUserDto.phone || userDetails.phone;
        userDetails.country = updateUserDto.country || userDetails.country;

        await this.userDetailsRepository.save(userDetails);
      }
    

    return user;
  }
}
