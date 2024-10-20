"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_media_dto_1 = require("./create-media.dto");
class UpdateMediaDto extends (0, mapped_types_1.PartialType)(create_media_dto_1.CreateMediaDto) {
}
exports.UpdateMediaDto = UpdateMediaDto;
//# sourceMappingURL=update-media.dto.js.map