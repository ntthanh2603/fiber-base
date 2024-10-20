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
exports.ConversationMembersService = void 0;
const conversations_service_1 = require("./../conversations/conversations.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_member_entity_1 = require("./entities/conversation-member.entity");
let ConversationMembersService = class ConversationMembersService {
    constructor(cmRepository, conversationsService) {
        this.cmRepository = cmRepository;
        this.conversationsService = conversationsService;
    }
    async createConversation(cmDto) {
        const conversation = await this.conversationsService.findConversionById(cmDto.conversation_id);
        if (conversation)
            return await this.cmRepository.save({
                conversation_id: cmDto.conversation_id,
                user_id: cmDto.user_id,
            });
        throw new common_1.NotFoundException('Conversation has existed');
    }
    async addUser(cmDto) {
        const conversation = await this.conversationsService.findConversionById(cmDto.conversation_id);
        if (conversation)
            return this.cmRepository.save(cmDto);
        throw new common_1.NotFoundException('Conversation does not exist');
    }
};
exports.ConversationMembersService = ConversationMembersService;
exports.ConversationMembersService = ConversationMembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_member_entity_1.ConversationMember)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => conversations_service_1.ConversationsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        conversations_service_1.ConversationsService])
], ConversationMembersService);
//# sourceMappingURL=conversation-members.service.js.map