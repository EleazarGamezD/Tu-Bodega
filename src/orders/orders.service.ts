import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from 'src/products/products.service';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Order)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly productsService: ProductsService,
  ) {}

  async createOrder(order: Order, items): Promise<Order> {
    // Crear la entidad de orden con los detalles proporcionados
    // Crear los items de la orden utilizando los datos proporcionados
    const orderItems = items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.product = item.product;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      orderItem.itemAmount = item.itemAmount;

      return orderItem;
    });

    // Asignar los items a la orden
    order.items = orderItems;

    // Guardar la orden en la base de datos
    await this.orderRepository.save(order);

    return order;
  }

  // búsqueda de una order en especifico
  async findOneTerm(term) {
    let order: Order;
    if (isUUID(term)) {
      order = await this.orderRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.orderRepository.createQueryBuilder('prod');
      order = await queryBuilder
        //construimos el query donde comparamos los parámetros que le vamos a enviar que en este caso numero de orden o usuario
        .where(
          'orderNumber = :orderNumber or user = :user',
          // indicamos que el valor de TERM
          {
            orderNumber: term,
            user: term,
          },
        )
        .getOne(); // con este indicamos que solo tome uno de estos dos valores
    }

    if (!order)
      throw new NotFoundException(
        `Order whit id, Number or no "${term}" not found `,
      );

    return order;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
    });
    return orders;
  }
}
