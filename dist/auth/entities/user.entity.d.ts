import { Product } from "src/products/entities/product.entity";
import { UserDetails } from './user-details.entity';
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";
export declare class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    userName?: string;
    isActive: boolean;
    roles: string[];
    details?: UserDetails[];
    cart: Cart;
    orders?: Order;
    product: Product;
    static id: any;
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
