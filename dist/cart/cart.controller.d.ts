import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addItemToCart(user: User, createCartDto: CreateCartItemDto): Promise<import("./entities/cart-item.entity").CartItem>;
    placeOrder(user: User): Promise<import("../orders/entities/order.entity").Order | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updateOrder(user: User): Promise<void>;
}
