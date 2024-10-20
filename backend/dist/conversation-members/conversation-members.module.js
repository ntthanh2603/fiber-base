"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMembersModule = void 0;
const common_1 = require("@nestjs/common");
const conversation_members_service_1 = require("./conversation-members.service");
const conversation_members_controller_1 = require("./conversation-members.controller");
const database_module_1 = require("../database/database.module");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_member_entity_1 = require("./entities/conversation-member.entity");
const conversations_module_1 = require("../conversations/conversations.module");
let ConversationMembersModule = class ConversationMembersModule {
};
exports.ConversationMembersModule = ConversationMembersModule;
exports.ConversationMembersModule = ConversationMembersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([conversation_member_entity_1.ConversationMember]),
            database_module_1.DatabaseModule,
            (0, common_1.forwardRef)(() => conversations_module_1.ConversationsModule),
        ],
        controllers: [conversation_members_controller_1.ConversationMembersController],
        providers: [conversation_members_service_1.ConversationMembersService],
        exports: [conversation_members_service_1.ConversationMembersService],
    })
], ConversationMembersModule);
//# sourceMappingURL=conversation-members.module.js.map