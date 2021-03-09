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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const utils_1 = require("../utils/utils");
const user_entity_1 = require("./user.entity");
const user_repository_1 = require("./user.repository");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        let { firstName, lastName, userName, password, email, gender, } = createUserDto;
        const user = new user_entity_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.userName = userName;
        user.email = email;
        user.gender = gender;
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            return user;
        }
        catch (error) {
            console.log(error);
            if (error.code == 11000) {
                throw new common_1.ConflictException(`Email: ['${email}'] is already exist.`);
            }
            else
                throw new common_1.InternalServerErrorException();
        }
    }
    async findAllUsers() {
        return await this.userRepository.find({});
    }
    async findOneUser(email, nameOnly = false) {
        if (nameOnly) {
            const user = await this.userRepository.findOne({ email }, { select: ["id", "firstName", "lastName"] });
            return { name: user.firstName + " " + user.lastName, id: user.id };
        }
        const user = await this.userRepository.findOne({ email: email });
        return user;
    }
    async findAllStudentNumber() {
        const [err, result] = await utils_1.to(this.userRepository
            .createQueryBuilder("user")
            .where("user.role = :role", { role: user_entity_1.RolePermitted.student.toString() })
            .getCount());
        if (err)
            return 100;
        return result;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map