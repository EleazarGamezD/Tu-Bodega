import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({name:'cartItem'})
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Product,
  product => product.cartItems)
  product: Product;

  @ManyToOne(
    type => Cart,
    cart => cart.items)
  cart: Cart;

  @Column()
  quantity: number;
}