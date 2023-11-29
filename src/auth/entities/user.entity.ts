import { Product } from 'src/products/entities/product.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDetails } from './user-details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'user Email (unique)',
    nullable: false,
    minLength: 1,
    example: 'cI8Bh@example.com',
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({ 
    description:'User Password,The password must have a Uppercase, lowercase letter and a number',
    nullable: false,
    minLength: 6,
    maxLength: 50,
    example: '123456$$#%%aAAa'})
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    description: 'user fullName',
    nullable: false,
    minLength: 1,
    example: 'John Doe'
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    description: 'userName',
    nullable: false,
    minLength: 1,
    example: 'johndoe'
  })
  @Column('text', { default: '' })
  userName?: string;

  @ApiProperty({
    description: 'user Status, true=active, false=inactive',
    nullable: false,
    minLength: 1,
    example: 'true'
  })
  @ApiProperty()
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'User Roles [admin, user, super-user]',
    nullable: false,
    minLength: 1,
    example: 'user',
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  //relacion uno a muchos con la tabla Detalles de usuarios
  @ApiProperty({
    description: 'list of details of the user (address, cellphone or phone)',
    nullable: true,
    minLength: 1,
  })
  @OneToMany(() => UserDetails, (userDetails) => userDetails.user, {
    cascade: true,
    eager: true,
  })
  details?: UserDetails[];

  //relacion uno uno con la tabla Carro de compras
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  //relacion uno a muchos con la tabla Ordenes
  @OneToMany(() => Order, (orders) => orders.user)
  orders?: Order;

  //relacion uno a muchos con la tabla Productos
  @OneToMany(() => Product, (product) => product.user)
  product: Product;
  static id: any;

  @BeforeInsert()
  /**
   * Checks the fields before inserting them.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
    this.userName = this.userName.toLowerCase().trim();
  }

  @BeforeUpdate()
  /**
   * Performs a check on the fields before updating.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
