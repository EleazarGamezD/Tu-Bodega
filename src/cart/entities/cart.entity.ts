import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'cart'})
export class Cart {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    productId:string;

    @ApiProperty()
    @Column('text',)
    quantity: string;
  
    @ApiProperty()
    @ManyToOne(
        () => User,
        (user)=>user.car
    )
    user:User


   


    // @ApiProperty()
    // @Column('text', { unique:true })
    // title: string;
    
    // @ApiProperty()
    // @Column('float',{default:0})
    // price:number;
    
    // @ApiProperty()
    // @Column('float',{default:0})
    // amount:number;

    // @ApiProperty()
    // @Column({ type: 'text',  nullable:true})
    // description: string;
    
    // @ApiProperty()
    // @Column('text',{unique: true})
    // slug?: string;
    
      
    // @ApiProperty()
    // @Column('text',{array: true})
    // sizes?: string[];
    
    // @ApiProperty()
    // @Column('text',)
    // gender?: string;


    
    // @ApiProperty()
    // @Column('text',{
    //     array: true,
    //     default:[],
    // })
    // tags?:string[]; 
}
