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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'user_id not null' }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'conversation_id not null' }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "conversation_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'message not null' }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'time not null' }),
    __metadata("design:type", Date)
], CreateMessageDto.prototype, "time", void 0);
//# sourceMappingURL=create-message.dto.js.map