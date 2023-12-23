import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
export declare class OrderRepository extends Repository<Order> {
    constructor(OrderRepository: Repository<Order>);
    deleteAll(): any;
}
export declare class OrderItemRepository extends Repository<OrderItem> {
    constructor(orderItemRepository: Repository<OrderItem>);
    deleteAll(): any;
}
