import { User } from "src/auth/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity({name:'Order'})
export class Order {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, 
    user => user.orders)
  user: User;

  @OneToMany(type => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}
