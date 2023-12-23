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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
const seed_data_1 = require("./data/seed-data");
const cart_repository_1 = require("../repositories/cart-repository");
const order_repository_1 = require("../repositories/order-repository");
const user_repository_1 = require("../repositories/user-repository");
const user_repository_2 = require("../repositories/user-repository");
let SeedService = class SeedService {
    constructor(productService, cartRepository, orderRepository, userRepository, userDetailRepository) {
        this.productService = productService;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.userDetailRepository = userDetailRepository;
    }
    async runSeed() {
        await this.deleteTables();
        const adminUser = await this.insertUsers();
        await this.insertNewProducts(adminUser);
        return 'Seed Executed';
    }
    async deleteTables() {
        await this.productService.deleteAllProducts();
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        await queryBuilder.delete().where({}).execute();
        const queryBuilderOrder = this.orderRepository.createQueryBuilder('order');
        await queryBuilderOrder.delete().where({}).execute();
        const queryBuilderCart = this.cartRepository.createQueryBuilder('cart');
        await queryBuilderCart.delete().where({}).execute();
    }
    async insertUsers() {
        const seedUsers = seed_data_1.initialData.users;
        const users = [];
        for (const userData of seedUsers) {
            const { address, city, phone, country, password, ...userDetails } = userData;
            const user = this.userRepository.create({
                email: userData.email,
                password: userData.password,
                fullName: userData.fullName,
                userName: userData.userName,
                isActive: userData.isActive,
                roles: userData.roles,
            });
            const savedUser = await this.userRepository.save(user);
            users.push(savedUser);
            const userDetail = this.userDetailRepository.create({
                address,
                city,
                phone,
                country,
                user: savedUser,
            });
            await this.userDetailRepository.save(userDetail);
        }
        return users[0];
    }
    async insertNewProducts(user) {
        try {
            const products = seed_data_1.initialData.products;
            const insertPromises = [];
            products.forEach((product) => {
                insertPromises.push(this.productService.create(product, user));
            });
            await Promise.all(insertPromises);
            return true;
        }
        catch (error) {
            console.error('Error inserting products:', error);
            throw error;
        }
    }
};
SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        cart_repository_1.CartRepository,
        order_repository_1.OrderRepository,
        user_repository_1.UserRepository,
        user_repository_2.UserDetailRepository])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map