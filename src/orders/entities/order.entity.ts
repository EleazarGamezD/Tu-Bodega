import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";


@Entity({name:'order'})
export class Order {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, 
  user => user.orders)
  user: User;

  @OneToMany(type => OrderItem, 
  orderItem => orderItem.order, 
  {cascade: true,
   eager:true })
  items: OrderItem[];
  
  @Column({ type: 'decimal', precision: 10, scale: 2, default:'0.00' })
  totalAmount: number;
  
  @Column({ type: "timestamp", default: () => "now()"})
  date: Date;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
createdAt: Date
}
