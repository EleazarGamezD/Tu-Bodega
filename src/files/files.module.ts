import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule], // llamamos el configmodule para que lea el archivo .env
})
export class FilesModule {}
