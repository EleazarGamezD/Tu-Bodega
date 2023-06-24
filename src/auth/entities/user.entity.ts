import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { UserDetails } from './user-details.entity';
import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty()
    @Column('text', {unique:true})
    email:string;

    @ApiProperty()
    @Column('text',{select:false})
    password:string;

    @ApiProperty()
    @Column('text',)
    fullName:string;

    @ApiProperty()
    @Column('text',{default:''})
    userName?:string;

    @ApiProperty()
    @Column('bool',{default:true})
    isActive: boolean;

    @ApiProperty()
    @Column('text',{
        array: true,
        default:['user'],
    })
    roles:string[];

    //relacion uno a muchos con la tabla Detalles de usuarios
    @OneToMany(
        ()=> UserDetails,
        (userDetails) => userDetails.user,
        {cascade:true,
         eager:true,}
    )   
    details?:UserDetails[];
       
    
    //relacion uno a muchos con la tabla Carro de compras 
    @OneToMany(
        ()=> Cart,
        (cart) => cart.user,
        {cascade:true}
    )   
    cart?:Cart;

    //relacion uno a muchos con la tabla Ordenes
     @OneToMany(
        ()=> Order,
        (orders) => orders.user,
        {cascade:true}
    )   
    orders?:Order;

     //relacion uno a muchos con la tabla Productos
     @OneToMany(
         () => Product,
         (product)=>product.user
     )
     product: Product;
     static id: any;


  

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email=this.email.toLowerCase().trim()
        this.userName=this.userName.toLowerCase().trim()
    }

    
    @BeforeUpdate()
        checkFieldsBeforeUpdate(){
            this.checkFieldsBeforeInsert()
        
    }
    
    
}

