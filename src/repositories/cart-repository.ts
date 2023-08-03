import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()  
export class CartRepository extends Repository<Cart> {
  constructor(
    @InjectRepository(Cart)
    cartRepository: Repository<Cart>,
  ) {
    super(
      cartRepository.target,
      cartRepository.manager,
      cartRepository.queryRunner,
    );
  }

}

//extend CartITems Repository functions 

@Injectable()
export class CartItemRepository extends Repository<CartItem> {
  constructor(
    @InjectRepository(CartItem)
    cartItemRepository: Repository<CartItem>,
  ) {
    super(
      cartItemRepository.target,
      cartItemRepository.manager,
      cartItemRepository.queryRunner,
    );
  }

  public createItemCart(newCart, productId, quantity, product, totalAmount) {
    return this.create({
      cart: newCart,
      product: { id: productId },
      quantity,
      price: product.price,
      itemAmount: totalAmount,
    });
  }

  public saveItemCart(newCartItem) {
    return this.save(newCartItem);
  }

  public findOneCartITem(cart,productId) {
    return this.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });
  }
}
