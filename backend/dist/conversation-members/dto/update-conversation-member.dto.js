"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversationMemberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_conversation_member_dto_1 = require("./create-conversation-member.dto");
class UpdateConversationMemberDto extends (0, mapped_types_1.PartialType)(create_conversation_member_dto_1.CreateConversationMemberDto) {
}
exports.UpdateConversationMemberDto = UpdateConversationMemberDto;
//# sourceMappingURL=update-conversation-member.dto.js.map