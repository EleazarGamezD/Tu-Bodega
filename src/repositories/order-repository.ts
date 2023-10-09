import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';

import { Repository } from 'typeorm';


// extend Order Repository
@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    OrderRepository: Repository<Order>,
  ) {
    super(
      OrderRepository.target,
      OrderRepository.manager,
      OrderRepository.queryRunner,
    );
  }
  public deleteAll() {
    return this.deleteAll();
  }
}

//extend OrderITems Repository functions
@Injectable()
export class OrderItemRepository extends Repository<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    orderItemRepository: Repository<OrderItem>,
  ) {
    super(
      orderItemRepository.target,
      orderItemRepository.manager,
      orderItemRepository.queryRunner,
    );
  }
  public deleteAll() {
    return this.deleteAll();
  }
}


