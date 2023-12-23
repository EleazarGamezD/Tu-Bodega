import { Product } from 'src/products/entities/product.entity';
import { Cart } from './cart.entity';
export declare class CartItem {
    id: number;
    cart: Cart;
    product: Product;
    price: number;
    quantity: number;
    itemAmount: number;
}
