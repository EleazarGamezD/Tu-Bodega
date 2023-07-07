import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class OrdersService {

constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository <Order>,

    @InjectRepository(Order)
    private readonly orderItemRepository: Repository <OrderItem>,
    
    private readonly productsService: ProductsService,
   
  ) {}






async createOrder( order:Order,items): Promise<Order> {
  
    //  console.log (items)
    // Crear la entidad de orden con los detalles proporcionados
    // Crear los items de la orden utilizando los datos proporcionados
    const orderItems = items.map(item => {
     
      const orderItem = new OrderItem();
      orderItem.product = item.product;
      orderItem.quantity = item.quantity;
      orderItem.price=item.price;
      orderItem.itemAmount=item.itemAmount

      return orderItem;
    });

    // Asignar los items a la orden
    order.items = orderItems;

    // Guardar la orden en la base de datos
    await this.orderRepository.save(order);

    return order;
   
}







}
