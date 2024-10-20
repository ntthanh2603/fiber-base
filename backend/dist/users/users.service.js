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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = require("bcrypt");
const historys_service_1 = require("../historys/historys.service");
const helper_enum_1 = require("../helper/helper.enum");
let UsersService = class UsersService {
    constructor(usersRepository, historysService) {
        this.usersRepository = usersRepository;
        this.historysService = historysService;
        this.getHashPassword = (password) => {
            const salt = (0, bcrypt_1.genSaltSync)(10);
            const hash = (0, bcrypt_1.hashSync)(password, salt);
            return hash;
        };
        this.updateUserToken = (refreshToken, user_id) => {
            return this.usersRepository
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ refreshToken: refreshToken })
                .where('user_id = :user_id', { user_id })
                .execute();
        };
        this.findUserByToken = async (refreshToken) => {
            return await this.usersRepository.findOne({
                where: { refreshToken: refreshToken },
            });
        };
    }
    isValidPassword(password, hash) {
        return (0, bcrypt_1.compareSync)(password, hash);
    }
    async findUserByEmail(userEmail) {
        const user = await this.usersRepository.findOne({
            where: { email: userEmail },
        });
        return user;
    }
    async register(user) {
        const { username, email, password, age, gender, address, description } = user;
        const isExist = await this.findUserByEmail(email);
        if (isExist) {
            throw new common_1.BadRequestException(`Email: ${email} already exists`);
        }
        const hashPassword = this.getHashPassword(password);
        let newUser = {
            username,
            email,
            password: hashPassword,
            age,
            gender,
            address,
            description,
        };
        await this.usersRepository.save(newUser);
        const newRegister = await this.findUserByEmail(email);
        await this.historysService.createHistoty({
            target_id: newRegister.user_id,
            createdBy: email,
            createdAt: new Date(),
            role: helper_enum_1.RoleType.USER,
        });
        return newRegister;
    }
    async findUserById(user_id) {
        const isDelete = this.historysService.isDeleted({
            target_id: user_id,
            role: helper_enum_1.RoleType.USER,
        });
        const user = await this.usersRepository.findOne({
            where: { user_id },
            select: [
                'user_id',
                'email',
                'username',
                'age',
                'gender',
                'address',
                'description',
            ],
        });
        if (user && isDelete) {
            return user;
        }
        throw new common_1.NotFoundException('Not found user');
    }
    async deleteUser(user) {
        const userDel = await this.findUserById(user.user_id);
        const isDelete = await this.historysService.isDeleted({
            target_id: user.user_id,
            role: helper_enum_1.RoleType.USER,
        });
        if (!userDel) {
            throw new common_1.NotFoundException('User not found');
        }
        if (userDel && !isDelete) {
            return this.historysService.deleteHistory({
                target_id: user.user_id,
                deletedAt: new Date(),
                deletedBy: user.email,
                role: helper_enum_1.RoleType.USER,
            });
        }
        return {
            message: 'User has been deleted',
        };
    }
    async updateUser(updateUserDto, user) {
        const empty = await this.findUserById(user.user_id);
        const isDelete = await this.historysService.isDeleted({
            target_id: user.user_id,
            role: helper_enum_1.RoleType.USER,
        });
        if (empty && !isDelete) {
            await this.historysService.updateHistory({
                target_id: user.user_id,
                updatedAt: new Date(),
                updatedBy: user.email,
                role: helper_enum_1.RoleType.USER,
            });
            return this.usersRepository.update({ user_id: user.user_id }, { ...updateUserDto });
        }
        throw new common_1.NotFoundException('Not found user');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        historys_service_1.HistorysService])
], UsersService);
//# sourceMappingURL=users.service.js.map