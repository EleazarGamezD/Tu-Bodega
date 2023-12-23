import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
export declare class CartRepository extends Repository<Cart> {
    constructor(cartRepository: Repository<Cart>);
}
export declare class CartItemRepository extends Repository<CartItem> {
    constructor(cartItemRepository: Repository<CartItem>);
    createItemCart(newCart: any, productId: any, quantity: any, product: any, totalAmount: any): CartItem;
    saveItemCart(newCartItem: any): Promise<any>;
    findOneCartITem(cart: any, productId: any): Promise<CartItem>;
    deleteAll(): any;
}
