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
exports.RelationshipsController = void 0;
const common_1 = require("@nestjs/common");
const relationships_service_1 = require("./relationships.service");
const create_relationship_dto_1 = require("./dto/create-relationship.dto");
const customize_1 = require("../decorator/customize");
let RelationshipsController = class RelationshipsController {
    constructor(relationshipsService) {
        this.relationshipsService = relationshipsService;
    }
    relationshipUser(createRelationshipDto) {
        return this.relationshipsService.relationshipUser(createRelationshipDto);
    }
};
exports.RelationshipsController = RelationshipsController;
__decorate([
    (0, common_1.Post)('/update'),
    (0, customize_1.ResponseMessage)('Updated relationship'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_relationship_dto_1.CreateRelationshipDto]),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "relationshipUser", null);
exports.RelationshipsController = RelationshipsController = __decorate([
    (0, common_1.Controller)('relationships'),
    __metadata("design:paramtypes", [relationships_service_1.RelationshipsService])
], RelationshipsController);
//# sourceMappingURL=relationships.controller.js.map