/// <reference types="multer" />
import { FilesService } from './files.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class FilesController {
    private readonly configService;
    private readonly filesService;
    constructor(configService: ConfigService, filesService: FilesService);
    findProductImage(res: Response, imageName: string): void;
    uploadProductImage(file: Express.Multer.File): {
        secureUrl: string;
    };
}
