"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reaction_dto_1 = require("./create-reaction.dto");
class UpdateReactionDto extends (0, mapped_types_1.PartialType)(create_reaction_dto_1.CreateReactionDto) {
}
exports.UpdateReactionDto = UpdateReactionDto;
//# sourceMappingURL=update-reaction.dto.js.map