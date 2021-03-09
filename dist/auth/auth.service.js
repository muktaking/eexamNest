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
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const config = require("config");
const _ = require("lodash");
const users_service_1 = require("../users/users.service");
const jwtConfig = config.get("jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        let user = await this.usersService.findOneUser(email);
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            user = isValid ? _.pick(user, ["email", "role", "id"]) : null;
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.email,
            id: user.id,
            role: user.role,
        };
        const accessToken = await this.jwtService.sign(payload);
        return {
            accessToken,
            id: user.id,
            expireIn: process.env.JWT_EXPIRESIN || jwtConfig.expiresIn,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map