import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from 'src/products/products.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly productsService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productsService: ProductsService);
    createOrder(order: Order, items: any): Promise<Order>;
    findOneTerm(term: any): Promise<Order>;
    findAll(paginationDto: PaginationDto): Promise<Order[]>;
}
