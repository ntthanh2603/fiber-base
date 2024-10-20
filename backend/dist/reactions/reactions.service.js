"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsService = void 0;
const common_1 = require("@nestjs/common");
let ReactionsService = class ReactionsService {
    create(createReactionDto) {
        return 'This action adds a new reaction';
    }
    findAll() {
        return `This action returns all reactions`;
    }
    findOne(id) {
        return `This action returns a #${id} reaction`;
    }
    update(id, updateReactionDto) {
        return `This action updates a #${id} reaction`;
    }
    remove(id) {
        return `This action removes a #${id} reaction`;
    }
};
exports.ReactionsService = ReactionsService;
exports.ReactionsService = ReactionsService = __decorate([
    (0, common_1.Injectable)()
], ReactionsService);
//# sourceMappingURL=reactions.service.js.map