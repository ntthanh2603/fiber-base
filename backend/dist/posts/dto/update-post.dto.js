"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_post_dto_1 = require("./create-post.dto");
class UpdatePostDto extends (0, mapped_types_1.PartialType)(create_post_dto_1.CreatePostDto) {
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=update-post.dto.js.map