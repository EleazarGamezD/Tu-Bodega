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
exports.UserDetailRepository = exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_details_entity_1 = require("../auth/entities/user-details.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_2.Repository {
    constructor(repository) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    findUser(email, userName, id) {
        const query = this.createQueryBuilder('user').select([
            'user.email',
            'user.password',
            'user.id',
            'user.userName',
            'user.roles',
            'user.isActive',
            'user.fullName',
        ]);
        if (email) {
            query.andWhere('LOWER(user.email) LIKE :email', {
                email: `%${email.toLowerCase()}%`,
            });
        }
        if (userName) {
            query.andWhere('LOWER(user.userName) LIKE :userName', {
                userName: `%${userName.toLowerCase()}%`,
            });
        }
        if (id) {
            query.andWhere('user.id = :id', { id });
        }
        return query.getOne();
    }
    async findUserById(id) {
        return this.findOne({ where: { id } });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
exports.UserRepository = UserRepository;
let UserDetailRepository = class UserDetailRepository extends typeorm_2.Repository {
    constructor(detailRepository) {
        super(detailRepository.target, detailRepository.manager, detailRepository.queryRunner);
    }
    saveUsersDetails(userDetails) {
        return this.save(userDetails);
    }
};
UserDetailRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_details_entity_1.UserDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserDetailRepository);
exports.UserDetailRepository = UserDetailRepository;
//# sourceMappingURL=user-repository.js.map