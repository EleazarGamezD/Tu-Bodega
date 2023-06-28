import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { Cart } from "src/cart/entities/cart.entity";

@Entity({name:'order'})
export class Order {

  @PrimaryGeneratedColumn('increment')
  id: number;

  // @OneToOne(() => Cart, cart => cart.order)
  // cart: Cart;
  
  @ManyToOne(type => User, 
  user => user.orders)
  user: User;

  @OneToMany(type => OrderItem, 
  orderItem => orderItem.order, 
  { cascade: true })
  items: OrderItem[];
   
 
}
