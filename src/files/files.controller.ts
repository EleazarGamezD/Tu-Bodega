import { Controller, Get, Post, Param, UseInterceptors, BadGatewayException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly configService : ConfigService,
    private readonly filesService: FilesService,     ) {}

//buscar imagen
@Get('product/:imageName')
findProductImage(
  //usamos el decorador RES para manejar las respuestas manualmente 
  @Res() res: Response,
  @Param('imageName') imageName: string
){
  const path = this.filesService.getStaticProductImage(imageName)
  res.sendFile(path)
}

  //Crear imagen para un producto
  @Post('product')
  //usamos el metodo interceptor para definir el campo que esperamos en la solicitud Post
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    limits: {fileSize: 1024},
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
       }))
  uploadProductImage( 
    file: Express.Multer.File){
      if (!file){
        throw new BadGatewayException ('Make Sure that the file is an image')
      }
      const secureUrl=`${this.configService.get('HOST_API')}/files/products/${file.filename}`
    return {secureUrl};
  }
  
}
