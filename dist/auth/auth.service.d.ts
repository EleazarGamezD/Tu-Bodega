import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserDetailRepository, UserRepository } from 'src/repositories/user-repository';
export declare class AuthService {
    private readonly userRepository;
    private readonly userDetailsRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(userRepository: UserRepository, userDetailsRepository: UserDetailRepository, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        token: string;
        email: string;
        fullName: string;
        userName: string;
        userDetails?: string[];
        roles: string[];
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: User;
        token: string;
        statusCode?: undefined;
        message?: undefined;
    }>;
    checkAuthStatus(user: User): Promise<{
        token: string;
        id: string;
        email: string;
        password: string;
        fullName: string;
        userName?: string;
        isActive: boolean;
        roles: string[];
        details?: import("./entities/user-details.entity").UserDetails[];
        cart: import("../cart/entities/cart.entity").Cart;
        orders?: import("../orders/entities/order.entity").Order;
        product: import("../products/entities/product.entity").Product;
    }>;
    private getJwtToken;
    private handleException;
}
