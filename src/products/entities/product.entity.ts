import { ApiProperty } from '@nestjs/swagger';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';

//representación del obejto en base de datos
@Entity({ name: 'products' }) // renombrando tabla
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  title: string;

  @ApiProperty()
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column('text', { unique: true })
  slug?: string;

  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty()
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty()
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (ProductImage) => ProductImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product)
  user: User;

  @ManyToOne(() => OrderItem, (orderItems) => orderItems.product)
  orderItems: OrderItem[];

  @ManyToOne(() => CartItem, (cartItems) => cartItems.product)
  cartItems: CartItem[];

  //verificamos si el SLUG existe y que cumpla las reglas
  @BeforeInsert()
  checkSlugInsert() {
    // verificamos si existe el SLUG
    if (!this.slug) {
      this.slug = this.title;
    }
    //de no existir cambiamos las letras a minúsculas y eliminamos los espacios
    //y quitamos los apostrofes
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('´', '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    // cambiamos las letras a minúsculas y eliminamos los espacios
    //y quitamos los apostrofes
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('´', '');
  }
}
