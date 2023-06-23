import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { UserDetails } from './user-details.entity';
import { Car } from '../../car/entities/car.entity';
import { ApiProperty } from "@nestjs/swagger";


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
        ()=> Car,
        (car) => car.user,
        {cascade:true}
    )   
    car?:Car;


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

