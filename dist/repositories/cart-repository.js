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
exports.CartItemRepository = exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_item_entity_1 = require("../cart/entities/cart-item.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const typeorm_2 = require("typeorm");
let CartRepository = class CartRepository extends typeorm_2.Repository {
    constructor(cartRepository) {
        super(cartRepository.target, cartRepository.manager, cartRepository.queryRunner);
    }
};
CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartRepository);
exports.CartRepository = CartRepository;
let CartItemRepository = class CartItemRepository extends typeorm_2.Repository {
    constructor(cartItemRepository) {
        super(cartItemRepository.target, cartItemRepository.manager, cartItemRepository.queryRunner);
    }
    createItemCart(newCart, productId, quantity, product, totalAmount) {
        return this.create({
            cart: newCart,
            product: { id: productId },
            quantity,
            price: product.price,
            itemAmount: totalAmount,
        });
    }
    saveItemCart(newCartItem) {
        return this.save(newCartItem);
    }
    findOneCartITem(cart, productId) {
        return this.findOne({
            where: { cart: { id: cart.id }, product: { id: productId } },
        });
    }
    deleteAll() {
        return this.deleteAll();
    }
};
CartItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartItemRepository);
exports.CartItemRepository = CartItemRepository;
//# sourceMappingURL=cart-repository.js.map