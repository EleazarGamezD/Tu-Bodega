import { ProductsService } from '../products/products.service';
import { CartRepository } from 'src/repositories/cart-repository';
import { OrderRepository } from 'src/repositories/order-repository';
import { UserRepository } from 'src/repositories/user-repository';
import { UserDetailRepository } from '../repositories/user-repository';
export declare class SeedService {
    private readonly productService;
    private readonly cartRepository;
    private readonly orderRepository;
    private readonly userRepository;
    private readonly userDetailRepository;
    constructor(productService: ProductsService, cartRepository: CartRepository, orderRepository: OrderRepository, userRepository: UserRepository, userDetailRepository: UserDetailRepository);
    runSeed(): Promise<string>;
    private deleteTables;
    private insertUsers;
    private insertNewProducts;
}
