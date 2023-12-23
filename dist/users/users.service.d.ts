import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserDetailRepository, UserRepository } from 'src/repositories/user-repository';
export declare class UsersService {
    private readonly userRepository;
    private readonly userDetailsRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, userDetailsRepository: UserDetailRepository, jwtService: JwtService);
    findAll(paginationDto: PaginationDto): Promise<User[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUserDetail(userId: User, detailId: string): Promise<User>;
    updateUserDetails(id: any, user: User, updateUserDto: any): Promise<User>;
    addDetailsToUser(user: User, UpdateUserDetailsDto: any): Promise<User>;
    getUserById(id: any): Promise<User>;
}
