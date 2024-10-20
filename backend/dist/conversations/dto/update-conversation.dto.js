"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_conversation_dto_1 = require("./create-conversation.dto");
class UpdateConversationDto extends (0, mapped_types_1.PartialType)(create_conversation_dto_1.CreateConversationDto) {
}
exports.UpdateConversationDto = UpdateConversationDto;
//# sourceMappingURL=update-conversation.dto.js.map