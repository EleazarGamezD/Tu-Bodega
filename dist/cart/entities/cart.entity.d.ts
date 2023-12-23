import { User } from 'src/auth/entities/user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: number;
    user: User;
    items: CartItem[];
}
