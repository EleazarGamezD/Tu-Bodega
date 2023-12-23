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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const order_entity_1 = require("../orders/entities/order.entity");
const products_service_1 = require("../products/products.service");
const orders_service_1 = require("../orders/orders.service");
const decorator_1 = require("../auth/decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const cart_repository_1 = require("../repositories/cart-repository");
let CartService = class CartService {
    constructor(cartRepository, cartItemRepository, orderService, productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderService = orderService;
        this.productRepository = productRepository;
        this.logger = new common_1.Logger('ProductService');
    }
    async addItemToCart(createCartItemDto, user) {
        const { productId, quantity } = createCartItemDto;
        const product = await this.productRepository.findOne(productId);
        const totalAmount = await this.calculateItemTotal(product.price, quantity);
        let cart = await this.getCartByUser(user);
        if (!cart) {
            const newCart = this.cartRepository.create({ user });
            await this.cartRepository.save(newCart);
            cart = newCart;
            const newCartItem = await this.cartItemRepository.createItemCart(newCart, productId, quantity, product, totalAmount);
            await this.cartItemRepository.save(newCartItem);
            return newCartItem;
        }
        const existingCartItem = await this.cartItemRepository.findOneCartITem(cart, productId);
        if (existingCartItem) {
            existingCartItem.quantity = quantity;
            existingCartItem.itemAmount = await this.calculateItemTotal(existingCartItem.price, existingCartItem.quantity);
            await this.cartItemRepository.save(existingCartItem);
            return existingCartItem;
        }
        else {
            const newCartItem = await this.cartItemRepository.createItemCart(cart, productId, quantity, product, totalAmount);
            await this.cartItemRepository.save(newCartItem);
            return newCartItem;
        }
    }
    async placeOrder(user) {
        try {
            const cart = await this.getCartByUser(user);
            if (!cart?.items || cart.items.length === 0) {
                return {
                    statusCode: common_1.HttpStatus.NO_CONTENT,
                    message: 'The Cart is Empty',
                };
            }
            const items = cart.items;
            let totalAmount = 0;
            for (const item of items) {
                totalAmount += Number(item.itemAmount);
            }
            const order = new order_entity_1.Order();
            order.user = user;
            order.totalAmount = totalAmount;
            const createdOrder = await this.orderService.createOrder(order, items);
            await this.clearCart(user);
            return createdOrder;
        }
        catch (error) {
            this.handleException(error);
        }
    }
    handleException(error) {
        if (error.code === '23505')
            throw new common_1.BadGatewayException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, Check Server Logs');
    }
    async calculateItemTotal(price, quantity) {
        let totalAmount = 0;
        totalAmount += price * quantity;
        return totalAmount;
    }
    async clearCart(user) {
        const cart = await this.cartRepository.findOne({
            where: { user: { id: user.id } },
        });
        if (cart) {
            await this.cartRepository.remove(cart);
            return 'This cart was Remove';
        }
        else {
            return 'Cart user not Found';
        }
    }
    async getCartByUser(user) {
        const cart = await this.cartRepository.findOne({
            where: { user: { id: user.id } },
            relations: ['items'],
        });
        return cart;
    }
};
__decorate([
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_dto_1.CreateCartItemDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CartService.prototype, "addItemToCart", null);
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository,
        cart_repository_1.CartItemRepository,
        orders_service_1.OrdersService,
        products_service_1.ProductsService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map