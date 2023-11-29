import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

import { User } from 'src/auth/entities/user.entity';

import { CartRepository } from 'src/repositories/cart-repository';
import { OrderRepository } from 'src/repositories/order-repository';
import { UserRepository } from 'src/repositories/user-repository';
import { AuthService } from 'src/auth/auth.service';
import { UserDetailRepository } from '../repositories/user-repository';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly userDetailRepository: UserDetailRepository,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);
    return 'Seed Executed';
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    await queryBuilder.delete().where({}).execute();
    const queryBuilderOrder = this.orderRepository.createQueryBuilder('order');
    await queryBuilderOrder.delete().where({}).execute();
    const queryBuilderCart = this.cartRepository.createQueryBuilder('cart');
    await queryBuilderCart.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    for (const userData of seedUsers) {
      const { address, city, phone, country, password, ...userDetails } =
        userData;

      const user = this.userRepository.create({
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        userName: userData.userName,
        isActive: userData.isActive,
        roles: userData.roles,
      });

      const savedUser = await this.userRepository.save(user);
      users.push(savedUser);

      const userDetail = this.userDetailRepository.create({
        address,
        city,
        phone,
        country,
        user: savedUser,
      });

      await this.userDetailRepository.save(userDetail);
    }

    return users[0]; // Devuelve el primer usuario guardado
  }

  private async insertNewProducts(user: User) {
    try {
      const products = initialData.products;
      const insertPromises = [];

      products.forEach((product) => {
        insertPromises.push(this.productService.create(product, user));
      });

      await Promise.all(insertPromises);
      return true;
    } catch (error) {
      console.error('Error inserting products:', error);
      throw error; // Re-lanzar el error para que se maneje en un nivel superior si es necesario
    }
  }
}
