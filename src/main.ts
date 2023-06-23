import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.enableCors();

  const logger = new Logger ('Bootstrap')
  

  app.setGlobalPrefix('api');
   const config = new DocumentBuilder()
    .setTitle('tu bodega ')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
  new ValidationPipe({
   whitelist: true,
   forbidNonWhitelisted: true,
  }));
  
  await app.listen(process.env.PORT); 
  logger.log (`App Running on port ${ process.env.PORT}`)
}
bootstrap();
