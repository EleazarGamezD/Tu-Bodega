import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({name:'order_item'})
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Product, 
  product => product.orderItems)
  product: Product;

  @ManyToOne(type => Order, order => order.items)
  order: Order;

  @Column()
  quantity: number;

   @Column()
  totalAmount: number;
}