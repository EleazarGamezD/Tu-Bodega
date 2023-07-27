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

  public findCart(email?, userName?) {
    return this.findOne({});
  }
}
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


}
