import { HttpStatus } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { Order } from 'src/orders/entities/order.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { User } from 'src/auth/entities/user.entity';
import { CartItemRepository, CartRepository } from 'src/repositories/cart-repository';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartItemRepository;
    private readonly orderService;
    private productRepository;
    private readonly logger;
    constructor(cartRepository: CartRepository, cartItemRepository: CartItemRepository, orderService: OrdersService, productRepository: ProductsService);
    addItemToCart(createCartItemDto: CreateCartItemDto, user: User): Promise<import("./entities/cart-item.entity").CartItem>;
    placeOrder(user: User): Promise<Order | {
        statusCode: HttpStatus;
        message: string;
    }>;
    private handleException;
    private calculateItemTotal;
    private clearCart;
    private getCartByUser;
}
