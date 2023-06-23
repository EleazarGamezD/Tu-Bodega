import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Car } from 'src/car/entities/car.entity';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product,ProductImage,Car]), // se le indica las entities (tablas y estructas ) para que sean leidas en el proyecto.
    AuthModule],
  exports:[ProductsService,TypeOrmModule]
})
export class ProductsModule {}
