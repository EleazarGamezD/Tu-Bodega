import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import {
  UserDetailRepository,
  UserRepository,
} from 'src/repositories/user-repository';
import { UserDetails } from 'src/auth/entities/user-details.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userDetailsRepository: UserDetailRepository,

    private readonly jwtService: JwtService,
  ) { }

  /**
   * Find all users with pagination.
   * 
   * @param paginationDto - The pagination parameters for the query.
   * @returns A list of users.
   */
  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto; // Extract the limit and offset from paginationDto

    const users = await this.userRepository.find({
      take: limit, // Set the maximum number of users to retrieve
      skip: offset, // Skip the specified number of users
      // relations: { details: true, } // Temporary disable relations
    });

    return users;
  }

  /**
   * Updates the user's role and isActive status.
   * 
   * @param id - The ID of the user to update.
   * @param updateUserDto - The DTO containing the updated user information.
   * @returns The updated user object.
   * @throws Error if there is an error updating the user.
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      // Find the user by ID
      const user = await this.userRepository.findUserById(id);

      // Update roles if provided in the DTO

      // Split the provided roles string and assign to user.roles
      user.roles = updateUserDto.roles.split(',');



      // Update isActive if provided in the DTO
      if (updateUserDto.isActive !== undefined) {
        user.isActive = updateUserDto.isActive;
      }

      // Save the changes to the database
      const updatedUser = await this.userRepository.save(user);

      return updatedUser;
    } catch (error) {
      throw new Error('Error updating the user: ' + error.message);
    }
  }





  /**
   * Delete a specific user detail by detailId.
   *
   * @param userId - The id of the user.
   * @param detailId - The id of the detail to delete.
   * @returns The updated User object.
   * @throws NotFoundException if the user detail is not found.
   */
  async deleteUserDetail(userId: User, detailId: string): Promise<User> {
    // Find the index of the detail in the user's details array
    const detailIndex = userId.details.findIndex((detail) => detail.id === detailId);

    // Throw an exception if the detail is not found
    if (detailIndex === -1) {
      throw new NotFoundException('User detail not found');
    }

    // Remove the detail from the user's details array
    userId.details.splice(detailIndex, 1);

    // Delete the detail from the user details repository
    await this.userDetailsRepository.delete(detailId);

    // Save the updated user object to the user repository
    await this.userRepository.save(userId);

    // Return the updated user object
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
  async addDetailsToUser(user: User, UpdateUserDetailsDto): Promise<User> {
    const { address, city, phone, country, password, ...userData } =
      UpdateUserDetailsDto;
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
