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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const products_service_1 = require("../products/products.service");
const class_validator_1 = require("class-validator");
let OrdersService = class OrdersService {
    constructor(orderRepository, orderItemRepository, productsService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productsService = productsService;
    }
    async createOrder(order, items) {
        const orderItems = items.map((item) => {
            const orderItem = new order_item_entity_1.OrderItem();
            orderItem.product = item.product;
            orderItem.quantity = item.quantity;
            orderItem.price = item.price;
            orderItem.itemAmount = item.itemAmount;
            return orderItem;
        });
        order.items = orderItems;
        await this.orderRepository.save(order);
        return order;
    }
    async findOneTerm(term) {
        let order;
        if ((0, class_validator_1.isUUID)(term)) {
            order = await this.orderRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.orderRepository.createQueryBuilder('prod');
            order = await queryBuilder
                .where('orderNumber = :orderNumber or user = :user', {
                orderNumber: term,
                user: term,
            })
                .getOne();
        }
        if (!order)
            throw new common_1.NotFoundException(`Order whit id, Number or no "${term}" not found `);
        return order;
    }
    async findAll(paginationDto) {
        const { limit, offset } = paginationDto;
        const orders = await this.orderRepository.find({
            take: limit,
            skip: offset,
        });
        return orders;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map