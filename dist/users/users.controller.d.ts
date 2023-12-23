import { UsersService } from './users.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateUserDto } from 'src/auth/dto';
import { UpdateUserDetailsDto } from 'src/auth/dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(paginationDto: PaginationDto): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    addDetailsToUser(user: User, updateUserDto: UpdateUserDetailsDto): Promise<User>;
    updateUser(id: string, updateUserDetailsDto: UpdateUserDetailsDto, user: User): Promise<User>;
    removeUserDetail(user: User, term: string): Promise<User>;
}
