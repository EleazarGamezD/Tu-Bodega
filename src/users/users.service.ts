import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
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
  //update user role and isActive
  async updateUser(id, updateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        // Handle the case where the user is not found in the database.
        throw new NotFoundException('User not found');
      }

      // Update fields based on the information provided in updateUserDto.
      if (updateUserDto.roles) {
        user.roles = updateUserDto.roles;
      }

      if (updateUserDto.isActive !== undefined) {
        user.isActive = updateUserDto.isActive;
      }

      // Save the changes to the database.
      const updatedUser = await this.userRepository.save(user);

      return updatedUser;
    } catch (error) {
      throw new Error('Error updating the user: ' + error.message);
    }
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

  /**
   * Updates the user details for a given user ID.
   *
   * @param {number} id - The ID of the user.
   * @param {User} user - The user object.
   * @param {UpdateUserDto} updateUserDto - The updated user details.
   * @return {Promise<User>} The updated user object.
   */
  async updateUserDetails(id, user: User, updateUserDto): Promise<User> {
    console.table(user);
    console.table(updateUserDto);
    console.table(id)

    const userDetails = updateUserDto;
    // Actualizar los campos de roles y isActive del usuario
    user.roles = updateUserDto.roles;
    user.isActive = updateUserDto.isActive;

    // Guardar los cambios en el usuario
    await this.userRepository.save(user);

    // Verificar si se proporcionaron campos para los detalles del usuario

    const detailIndex = user.details.findIndex((detail) => detail.id);

    // Si userDetails existe, actualizar los campos proporcionados
    if (detailIndex === -1) {
      // console.log('aplicando el if')
      const { address, city, phone, country, password, ...userData } =
        updateUserDto;
      const newUserDetails = this.userDetailsRepository.create({
        address,
        city,
        phone,
        country,
        user,
      });
      user.details = [newUserDetails];
      await this.userDetailsRepository.saveUsersDetails(newUserDetails);
    }
    else {
      console.log('aplicando else')
      userDetails.address = updateUserDto.address || userDetails.address;
      userDetails.city = updateUserDto.city || userDetails.city;
      userDetails.phone = updateUserDto.phone || userDetails.phone;
      userDetails.country = updateUserDto.country || userDetails.country;

      await this.userDetailsRepository.save(userDetails);
    }

    return user;
  }

  /**
   * Adds details to a user.
   *
   * @param {User} user - The user to add details to.
   * @param {object} updateUserDto - The DTO containing the updated user details.
   * @return {Promise<User>} The user object with the added details.
   */
  async addDetailsToUser(user: User, updateUserDto): Promise<User> {
    const { address, city, phone, country, password, ...userData } =
      updateUserDto;
    const newUserDetails = this.userDetailsRepository.create({
      address,
      city,
      phone,
      country,
      user,
    });
    user.details = [newUserDetails];
    await this.userDetailsRepository.saveUsersDetails(newUserDetails);
    return user;
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {type} id - The ID of the user.
   * @return {type} The user object.
   */
  async getUserById(id) {
    const user = this.userRepository.findUserById(id)
    return user

  }
}
