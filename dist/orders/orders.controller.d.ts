import { CartItem } from "./../cart/entities/cart-item.entity";
import { Order } from './entities/order.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(order: Order, items: CartItem[]): Promise<Order>;
    findOne(term: string): Promise<Order>;
    findAll(paginationDto: PaginationDto): Promise<Order[]>;
}
