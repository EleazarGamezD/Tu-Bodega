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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const decorator_1 = require("../auth/decorator");
const interfaces_1 = require("../auth/interfaces");
const passport_1 = require("@nestjs/passport");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const user_entity_1 = require("../auth/entities/user.entity");
const dto_1 = require("../auth/dto");
const update_user_dto_1 = require("../auth/dto/update-user.dto");
const user_details_entity_1 = require("../auth/entities/user-details.entity");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAllUsers(paginationDto) {
        return this.usersService.findAll(paginationDto);
    }
    getUserById(id) {
        return this.usersService.getUserById(id);
    }
    updateUserById(id, updateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    addDetailsToUser(user, updateUserDto) {
        return this.usersService.addDetailsToUser(user, updateUserDto);
    }
    updateUser(id, updateUserDetailsDto, user) {
        return this.usersService.updateUserDetails(id, user, updateUserDetailsDto);
    }
    removeUserDetail(user, term) {
        return this.usersService.deleteUserDetail(user, term);
    }
};
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'get All users', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'get user by id', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('user/:id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User has been Updated', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Post)('add-details-user'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'the Details has been added ',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin, interfaces_1.ValidRoles.user),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_user_dto_1.UpdateUserDetailsDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addDetailsToUser", null);
__decorate([
    (0, common_1.Patch)('update-details/:id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User has been Updated', type: user_details_entity_1.UserDetails, }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.admin, interfaces_1.ValidRoles.user),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDetailsDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('delete-detail/:id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail Deleted', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Token related' }),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, decorator_1.Auth)(interfaces_1.ValidRoles.user, interfaces_1.ValidRoles.admin),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeUserDetail", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map