import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
  ConfigModule.forRoot(), // para leer archivo .env
  TypeOrmModule.forRoot({    // linea para agregar conexion con certificado ssl 
    ssl:process.env.STAGE === 'prod',
    extra: {
      ssl: process.env.STAGE === 'prod'
    ? {rejectUnauthorized:false}
    :null,
    },
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,  //en producción no se activa

  }),
   ProductsModule, 
   CommonModule, 
   SeedModule, 
   FilesModule,
   ServeStaticModule.forRoot({
 rootPath: join(__dirname,'..','public'),
}),
   AuthModule,
   MessagesWsModule,
   OrdersModule,
   CartModule
  ],
  
})
export class AppModule {}
