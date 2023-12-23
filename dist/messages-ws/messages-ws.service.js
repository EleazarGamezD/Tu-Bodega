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
exports.MessagesWsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const console_1 = require("console");
const user_entity_1 = require("../auth/entities/user.entity");
const typeorm_2 = require("typeorm");
let MessagesWsService = class MessagesWsService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.connectedClients = {};
    }
    async registerClient(client, userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user)
            throw new console_1.error('user not found');
        if (!user.isActive)
            throw new console_1.error('user not active');
        this.checkUserConnection(user);
        this.connectedClients[client.id] = { socket: client, user: user };
    }
    removeClient(clientId) {
        delete this.connectedClients[clientId];
    }
    getConnectedClients() {
        console.log(this.connectedClients);
        return Object.keys(this.connectedClients);
    }
    getUserFullNAmeBySocketId(sockedId) {
        return this.connectedClients[sockedId].user.fullName;
    }
    checkUserConnection(user) {
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            if (connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
};
MessagesWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesWsService);
exports.MessagesWsService = MessagesWsService;
//# sourceMappingURL=messages-ws.service.js.map