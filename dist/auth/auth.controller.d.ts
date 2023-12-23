import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto, user: User): Promise<{
        token: string;
        email: string;
        fullName: string;
        userName: string;
        userDetails?: string[];
        roles: string[];
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
}
