import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
export declare class Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug?: string;
    stock: number;
    sizes: string[];
    gender: string;
    tags: string[];
    images?: ProductImage[];
    user: User;
    orderItems: OrderItem[];
    cartItems: CartItem[];
    checkSlugInsert(): void;
    checkSlugUpdate(): void;
}
