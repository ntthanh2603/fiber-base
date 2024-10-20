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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("./entities/conversation.entity");
const conversation_members_service_1 = require("../conversation-members/conversation-members.service");
let ConversationsService = class ConversationsService {
    constructor(conversationsRepository, cmService) {
        this.conversationsRepository = conversationsRepository;
        this.cmService = cmService;
    }
    async findConversionById(conversation_id) {
        const conversation = await this.conversationsRepository.findOneBy({
            conversation_id,
        });
        if (conversation)
            return conversation;
        throw new common_1.NotFoundException('Conversation not found');
    }
    async create(user, dto) {
        const createdBy = user.user_id;
        const conversation = await this.conversationsRepository.save({
            createdBy: createdBy,
            conversation_name: dto.conversation_name,
        });
        await this.cmService.createConversation({
            conversation_id: conversation.conversation_id,
            user_id: conversation.createdBy,
        });
        return conversation;
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => conversation_members_service_1.ConversationMembersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        conversation_members_service_1.ConversationMembersService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map