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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const swagger_1 = require("@nestjs/swagger");
const decorator_1 = require("../auth/decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const passport_1 = require("@nestjs/passport");
const interfaces_1 = require("../auth/interfaces");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    addItemToCart(user, createCartDto) {
        return this.cartService.addItemToCart(createCartDto, user);
    }
    async placeOrder(user) {
        return this.cartService.placeOrder(user);
    }
    async updateOrder(user) {
        'this items has ben updated ';
    }
};
__decorate([
    (0, common_1.Post)('add-item'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'New Item Added' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin, interfaces_1.ValidRoles.user),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_cart_dto_1.CreateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItemToCart", null);
__decorate([
    (0, common_1.Post)('place-order'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order Has been Created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin, interfaces_1.ValidRoles.user),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.Delete)('clear-item'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item Deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateOrder", null);
CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map