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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const user_entity_1 = require("../../auth/entities/user.entity");
const typeorm_1 = require("typeorm");
const cart_item_entity_1 = require("./cart-item.entity");
let Cart = class Cart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.cart, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => cart_item_entity_1.CartItem, (cartItem) => cartItem.cart, { cascade: true }),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
Cart = __decorate([
    (0, typeorm_1.Entity)({ name: 'cart' })
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=cart.entity.js.map