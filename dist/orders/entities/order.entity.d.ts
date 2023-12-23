import { User } from 'src/auth/entities/user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    orderNumber: number;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    date: Date;
    createdAt: Date;
}
