import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class OrderItem {
    id: number;
    product: Product;
    order: Order;
    quantity: number;
    price: number;
    itemAmount: number;
}
