"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const fileFilter_helper_1 = require("./helpers/fileFilter.helper");
const multer_1 = require("multer");
const fileNamer_helper_1 = require("./helpers/fileNamer.helper");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
let FilesController = class FilesController {
    constructor(configService, filesService) {
        this.configService = configService;
        this.filesService = filesService;
    }
    findProductImage(res, imageName) {
        const path = this.filesService.getStaticProductImage(imageName);
        res.sendFile(path);
    }
    uploadProductImage(file) {
        if (!file) {
            throw new common_1.BadGatewayException('Make Sure that the file is an image');
        }
        const secureUrl = `${this.configService.get('HOST_API')}/files/products/${file.filename}`;
        return { secureUrl };
    }
};
__decorate([
    (0, common_1.Get)('product/:imageName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('imageName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findProductImage", null);
__decorate([
    (0, common_1.Post)('product'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: fileFilter_helper_1.fileFilter,
        limits: { fileSize: 1024 },
        storage: (0, multer_1.diskStorage)({
            destination: './static/products',
            filename: fileNamer_helper_1.fileNamer
        })
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadProductImage", null);
FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map