import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({name:'cart_item'})
export class CartItem {
  
  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @ManyToOne(() => Cart, 
  cart => cart.items,
  {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'cartId' })
  cart: Cart;
  
  @ManyToOne(() => Product, 
  product => product.cartItems)
  @JoinColumn({ name: 'producctId' })
  product: Product;
  
 
  @Column({ type: 'decimal', precision: 10, scale: 2, default:'0.00' })
  price: number;
  
  @Column()
  quantity: number;





}