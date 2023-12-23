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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../repositories/user-repository");
let AuthService = class AuthService {
    constructor(userRepository, userDetailsRepository, jwtService) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('ProductService');
    }
    async create(createUserDto) {
        try {
            const { address, city, phone, country, password, ...userData } = createUserDto;
            if (!password) {
                throw new Error('Password is required');
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = this.userRepository.create({
                ...userData,
                password: hashedPassword,
            });
            await this.userRepository.save(newUser);
            delete newUser.password;
            const userDetails = this.userDetailsRepository.create({
                address,
                city,
                phone,
                country,
                user: newUser,
            });
            newUser.details = [userDetails];
            await this.userDetailsRepository.saveUsersDetails(userDetails);
            return { ...userData, token: this.getJwtToken({ id: userData.email }) };
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async login(loginUserDto) {
        try {
            const { password, email, userName } = loginUserDto;
            const user = await this.userRepository.findUser(email, userName);
            if (!user)
                return {
                    statusCode: common_1.HttpStatus.NO_CONTENT,
                    message: 'Email Not Found ',
                };
            if (!bcrypt.compareSync(password, user.password))
                return {
                    statusCode: common_1.HttpStatus.NO_CONTENT,
                    message: 'Credentials are not valid (password) ',
                };
            return { user, token: this.getJwtToken({ id: user.id }) };
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async checkAuthStatus(user) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
        };
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    handleException(error) {
        if (error.code === '23505') {
            throw new common_1.BadGatewayException(error.detail);
        }
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, Check Server Logs');
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_repository_1.UserDetailRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map