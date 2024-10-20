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
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.createRefreshToken = (payload) => {
            const refresh_token = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
            });
            return refresh_token;
        };
        this.processNewToken = async (refreshToken, response) => {
            try {
                this.jwtService.verify(refreshToken, {
                    secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                });
                let user = await this.usersService.findUserByToken(refreshToken);
                if (user) {
                    const { username, user_id, email } = user;
                    const payload = {
                        user_id,
                        username,
                        email,
                    };
                    return {
                        access_token: this.jwtService.sign(payload),
                        user: {
                            user_id,
                            username,
                            email,
                        },
                    };
                }
                else {
                    throw new common_1.BadRequestException('Refresh invalid');
                }
            }
            catch (error) {
                throw new common_1.BadRequestException('Refresh invalid');
            }
        };
        this.logout = async (response, user) => {
            await this.usersService.updateUserToken('', user.user_id);
            response.clearCookie('refresh_token');
            return 'OK';
        };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user ||
            !(await this.usersService.isValidPassword(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(loginUserDto, response) {
        const { email, password } = loginUserDto;
        const user = await this.validateUser(email, password);
        const { user_id, username } = user;
        const payload = {
            user_id,
            username,
            email,
        };
        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updateUserToken(refresh_token, user_id);
        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: +this.configService.get('JWT_REFRESH_EXPIRE'),
        });
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                user_id,
                username,
                email,
            },
        };
    }
    async register(user) {
        let newUser = await this.usersService.register(user);
        return {
            user_id: newUser.user_id,
            username: newUser.username,
            email: newUser.email,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map