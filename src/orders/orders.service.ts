import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {

constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository <Order>,
  ) {}


async createOrder(order: Order, items: CartItem[]): Promise<Order> {
    // Asignar los elementos del carrito a la orden de compra
      const orderItems: OrderItem[] = items.map(cartItem => {
      const orderItem = new OrderItem();
      orderItem.product = cartItem.product;
      orderItem.quantity = cartItem.quantity;
      return orderItem;
    });

    order.items = orderItems;

    // Guardar la orden de compra en la base de datos
    await this.orderRepository.save(order);

    return order;
  }

}

