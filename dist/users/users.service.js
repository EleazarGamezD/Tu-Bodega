"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../repositories/user-repository");
let UsersService = class UsersService {
    constructor(userRepository, userDetailsRepository, jwtService) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.jwtService = jwtService;
    }
    async findAll(paginationDto) {
        const { limit, offset } = paginationDto;
        const users = await this.userRepository.find({
            take: limit,
            skip: offset,
        });
        return users;
    }
    async updateUser(id, updateUserDto) {
        try {
            const user = await this.userRepository.findUserById(id);
            user.roles = updateUserDto.roles.split(',');
            if (updateUserDto.isActive !== undefined) {
                user.isActive = updateUserDto.isActive;
            }
            const updatedUser = await this.userRepository.save(user);
            return updatedUser;
        }
        catch (error) {
            throw new Error('Error updating the user: ' + error.message);
        }
    }
    async deleteUserDetail(userId, detailId) {
        const detailIndex = userId.details.findIndex((detail) => detail.id === detailId);
        if (detailIndex === -1) {
            throw new common_1.NotFoundException('User detail not found');
        }
        userId.details.splice(detailIndex, 1);
        await this.userDetailsRepository.delete(detailId);
        await this.userRepository.save(userId);
        return userId;
    }
    async updateUserDetails(id, user, updateUserDto) {
        const userDetails = updateUserDto;
        user.roles = updateUserDto.roles;
        user.isActive = updateUserDto.isActive;
        await this.userRepository.save(user);
        const detailIndex = user.details.findIndex((detail) => detail.id);
        if (detailIndex === -1) {
            const { address, city, phone, country, password, ...userData } = updateUserDto;
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
            console.log('aplicando else');
            userDetails.address = updateUserDto.address || userDetails.address;
            userDetails.city = updateUserDto.city || userDetails.city;
            userDetails.phone = updateUserDto.phone || userDetails.phone;
            userDetails.country = updateUserDto.country || userDetails.country;
            await this.userDetailsRepository.save(userDetails);
        }
        return user;
    }
    async addDetailsToUser(user, UpdateUserDetailsDto) {
        const { address, city, phone, country, password, ...userData } = UpdateUserDetailsDto;
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
    async getUserById(id) {
        const user = this.userRepository.findUserById(id);
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_repository_1.UserDetailRepository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map