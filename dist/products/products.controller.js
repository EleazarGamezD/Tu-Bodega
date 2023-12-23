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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const decorator_1 = require("../auth/decorator");
const interfaces_1 = require("../auth/interfaces");
const user_entity_1 = require("../auth/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("./entities/product.entity");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto, user) {
        return this.productsService.create(createProductDto, user);
    }
    findAll(paginationDto) {
        return this.productsService.findAll(paginationDto);
    }
    findOne(term) {
        return this.productsService.findOnePlain(term);
    }
    update(id, updateProductDto, user) {
        return this.productsService.update(id, updateProductDto, user);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('createItem'),
    (0, common_1.HttpCode)(201),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'product was created',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'get All Products', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':term'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Product by ${term} found',
        type: product_entity_1.Product,
    }),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.HttpCode)(200),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'product was updated',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.HttpCode)(200),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'product was removed',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map