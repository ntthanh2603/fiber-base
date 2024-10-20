"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_comment_dto_1 = require("./create-comment.dto");
class UpdateCommentDto extends (0, mapped_types_1.PartialType)(create_comment_dto_1.CreateCommentDto) {
}
exports.UpdateCommentDto = UpdateCommentDto;
//# sourceMappingURL=update-comment.dto.js.map