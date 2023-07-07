import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({name:'order_item'})
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(type => Product, 
  product => product.orderItems,{eager:true})
  @JoinColumn({ name: 'productId' })
  // @Column()
  product:Product;

  @ManyToOne(type => Order, order => order.items,
  {onDelete: 'CASCADE'})
   order: Order;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default:'0.00' })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default:'0.00' })
  itemAmount: number;
  
  
 

}