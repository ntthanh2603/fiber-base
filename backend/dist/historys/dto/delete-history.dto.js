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
exports.DeleteHistoryDto = void 0;
const class_validator_1 = require("class-validator");
const helper_enum_1 = require("../../helper/helper.enum");
class DeleteHistoryDto {
}
exports.DeleteHistoryDto = DeleteHistoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'ID not null' }),
    __metadata("design:type", String)
], DeleteHistoryDto.prototype, "target_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'DeletedBy not null' }),
    __metadata("design:type", String)
], DeleteHistoryDto.prototype, "deletedBy", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'DeletedAt not null' }),
    __metadata("design:type", Date)
], DeleteHistoryDto.prototype, "deletedAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Role not null' }),
    __metadata("design:type", String)
], DeleteHistoryDto.prototype, "role", void 0);
//# sourceMappingURL=delete-history.dto.js.map