import { Column, Entity, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name:'products_images'}) //renombrando las tablas 
export class ProductImage{

@PrimaryGeneratedColumn()
id:number;

@Column('text')
url:string;

@ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE'} // se indica que borre las imagenes que pertenecen al id padre 
)
product: Product
}