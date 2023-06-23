import { BadGatewayException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import {Repository,  DataSource } from 'typeorm';
import {validate as isUUID } from 'uuid'
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductImage } from './entities/product-image.entity';
import { User } from 'src/auth/entities/user.entity';




@Injectable()
export class ProductsService {
  // creamos variable privada logger  para manejar los errores en la consola de NEST 
  private readonly logger = new Logger('ProductService');
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>){}

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>
    
    //inyectamos la cadena de conexión en typeORM 
    private readonly dataSource: DataSource

  // creación de producto  
   async create(createProductDto: CreateProductDto, user: User) {
   try{

    const {images = [], ...productDetails} = createProductDto
      const product = 
          this.productRepository.create({
            ...productDetails,
          images: images.map (image => this.productImageRepository.create({url:image})),
          user,
        });

    await this.productRepository.save(product);
    return {...product, images};
    
     }
   catch(error){
    console.log(error)
    this.handleException(error)
   } 
  }

  //solicitud de todos los items 
  async findAll(paginationDto:PaginationDto) {
    const {limit, offset} = paginationDto //desestructuramos el paginationDTO para indicar el Limit y Offset
    const products = await this.productRepository.find({
      take:limit,
      skip:offset,
      relations:{
       images:true,
      }
    })
    return products.map ( products=>({...products, images:products.images.map(img => img.url)}))
  }

// búsqueda de un item especifico 
  async findOne(term: string) {
     let product:Product
     if(isUUID(term)){
      product = await this.productRepository.findOneBy({id:term})
    }
     else {
      const queryBuilder =  this.productRepository.createQueryBuilder('prod')
      product = await queryBuilder 
       //construimos el query donde comparamos los parámetros que le vamos a enviar que en este caso puede ser slug o el title 
      .where(' UPPER(title) = :title or slug = :slug or = :tags' , 
       // indicamos que el valor de TERM se puede aplicar a title y al slug
          {
            title: term.toUpperCase(), 
            slug: term.toLowerCase(),
            tags: term
          }
        )
        .leftJoinAndSelect('prod.images','ProdImages')
        .getOne() // con este indicamos que solo tome uno de estos dos valores 
        
      }
    
     if(!product)
     throw new NotFoundException(`Article whit id, name or no "${term}" not found `);
     
     return product;
  
   }
   //funcion intermedia para regresar el Objeto (item) de manera plana 
   async findOnePlain(term:string){
    const {images= [], ...rest}= await this.findOne(term)
    return{...rest,
    images:images.map(image=>image.url)}
   }

  async update(id: string, updateProductDto: UpdateProductDto, user:User) {

    const {images, ...toUpdate}= updateProductDto;

    const product = await this.productRepository.preload({
      id:id,
      ...toUpdate,
      })
    if(!product)
     throw new NotFoundException(`Article whit id, name or no "${id}" not found `);
    
     //creacion del QueryRunner para trabajar las imagenes de manera independiente 
      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect() // iniciamos conexion
      await queryRunner.startTransaction() // iniciamos la transaccion 
      try { 
        if(images){
          await queryRunner.manager.delete(ProductImage,{product:{id}}) // le indicamos que borre las imagenes donde el Id conincida con el del producto 
          product.images = images.map(image=>this.productImageRepository.create({url:image}))
        }
           product.user = user;
           await queryRunner.manager.save(product)    
           await queryRunner.commitTransaction()
           await queryRunner.release()
           //await this.productRepository.save(product)
           return this.findOnePlain(id);
}

      catch(error){
         await queryRunner.rollbackTransaction()
         await queryRunner.release()
         console.log(error)
         this.handleException(error)
}
     

  
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({id})
    await this.productRepository.remove(product)
    return `This product was Remove`
  }


  // creacion de metodo privado de manejo de errores 
  private handleException (error:any)  {
    if (error.code === '23505')
    throw new BadGatewayException(error.detail);
    
    
    this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, Check Server Logs')

  }

// destruccion total "semilla"

async deleteAllProducts(){
  const query = this.productRepository.createQueryBuilder('product')
  try{
    return await query.delete().where({}).execute()
  }
  catch(error){
    this.handleException(error)
  }
}

}
