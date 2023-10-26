import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');



  const config = new DocumentBuilder()
    .setTitle('tu bodega ')
    .setDescription('Api para manejo de pequeño Ecomerce')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();

  ;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {      //? se coloca '/' para que swagger sea la web principal ! 
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
  logger.log(`App Running on port ${process.env.PORT}`);
}
bootstrap();
