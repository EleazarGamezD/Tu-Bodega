"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const cart_controller_1 = require("./cart.controller");
const config_1 = require("@nestjs/config");
const cart_entity_1 = require("./entities/cart.entity");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("../products/products.module");
const orders_module_1 = require("../orders/orders.module");
const auth_module_1 = require("../auth/auth.module");
const cart_repository_1 = require("../repositories/cart-repository");
let CartModule = class CartModule {
};
CartModule = __decorate([
    (0, common_1.Module)({
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService, cart_repository_1.CartRepository, cart_repository_1.CartItemRepository],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, cart_item_entity_1.CartItem]),
            config_1.ConfigModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            auth_module_1.AuthModule,
        ],
        exports: [cart_service_1.CartService, typeorm_1.TypeOrmModule],
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map