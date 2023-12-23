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
exports.User = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
const user_details_entity_1 = require("./user-details.entity");
const swagger_1 = require("@nestjs/swagger");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
let User = class User {
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.userName = this.userName.toLowerCase().trim();
    }
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user Email (unique)',
        nullable: false,
        minLength: 1,
        example: 'cI8Bh@example.com',
    }),
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User Password,The password must have a Uppercase, lowercase letter and a number',
        nullable: false,
        minLength: 6,
        maxLength: 50,
        example: '123456$$#%%aAAa',
    }),
    (0, typeorm_1.Column)('text', { select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user fullName',
        nullable: false,
        minLength: 1,
        example: 'John Doe',
    }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'userName',
        nullable: false,
        minLength: 1,
        example: 'johndoe',
    }),
    (0, typeorm_1.Column)('text', { default: '' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user Status, true=active, false=inactive',
        nullable: false,
        minLength: 1,
        example: 'true',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User Roles [admin, user, super-user]',
        nullable: false,
        minLength: 1,
        example: 'user',
    }),
    (0, typeorm_1.Column)('text', {
        array: true,
        default: ['user'],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'list of details of the user (address, cellphone or phone)',
        nullable: true,
        minLength: 1,
    }),
    (0, typeorm_1.OneToMany)(() => user_details_entity_1.UserDetails, (userDetails) => userDetails.user, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cart_entity_1.Cart, cart => cart.user),
    __metadata("design:type", cart_entity_1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (orders) => orders.user),
    __metadata("design:type", order_entity_1.Order)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.user),
    __metadata("design:type", product_entity_1.Product)
], User.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "checkFieldsBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "checkFieldsBeforeUpdate", null);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map