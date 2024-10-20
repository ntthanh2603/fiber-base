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
exports.HistorysService = void 0;
const common_1 = require("@nestjs/common");
const history_entity_1 = require("./entities/history.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let HistorysService = class HistorysService {
    constructor(historysRepository) {
        this.historysRepository = historysRepository;
    }
    async createHistoty(history) {
        return await this.historysRepository.save(history);
    }
    async isDeleted(ihistory) {
        const history = await this.historysRepository.findOneBy({
            target_id: ihistory.target_id,
            role: ihistory.role,
        });
        return history;
    }
    async updateHistory(updateDto) {
        const { target_id, updatedAt, updatedBy, role } = updateDto;
        const history = await this.historysRepository.findOneBy({
            target_id: target_id,
            role: role,
        });
        history.updatedAt = updatedAt;
        history.updatedBy = updatedBy;
        return await this.historysRepository.save(history);
    }
    async deleteHistory(deleteDto) {
        const { target_id, deletedAt, deletedBy, role } = deleteDto;
        return await this.historysRepository.update({
            target_id,
            role: role,
        }, {
            deletedAt,
            deletedBy,
        });
    }
};
exports.HistorysService = HistorysService;
exports.HistorysService = HistorysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(history_entity_1.History)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HistorysService);
//# sourceMappingURL=historys.service.js.map