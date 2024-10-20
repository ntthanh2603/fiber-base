"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationshipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_relationship_dto_1 = require("./create-relationship.dto");
class UpdateRelationshipDto extends (0, mapped_types_1.PartialType)(create_relationship_dto_1.CreateRelationshipDto) {
}
exports.UpdateRelationshipDto = UpdateRelationshipDto;
//# sourceMappingURL=update-relationship.dto.js.map