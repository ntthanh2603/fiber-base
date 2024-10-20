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
exports.RelationshipsService = void 0;
const users_service_1 = require("./../users/users.service");
const common_1 = require("@nestjs/common");
const create_relationship_dto_1 = require("./dto/create-relationship.dto");
const relationship_entity_1 = require("./entities/relationship.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RelationshipsService = class RelationshipsService {
    constructor(relationshipsRepository, usersService) {
        this.relationshipsRepository = relationshipsRepository;
        this.usersService = usersService;
    }
    async relationshipUser(createRelationshipDto) {
        const { user1_id, user2_id, relationship } = createRelationshipDto;
        const user1 = await this.usersService.findUserById(user1_id);
        const user2 = await this.usersService.findUserById(user2_id);
        const existingRelationship = await this.relationshipsRepository.findOne({
            where: {
                user1_id,
                user2_id,
            },
        });
        if (existingRelationship && user1 && user2) {
            existingRelationship.relationship = relationship;
            await this.relationshipsRepository.save(existingRelationship);
            return {
                result: {
                    message: 'Update relationship 2 user',
                    user1: {
                        user_id: user1['user_id'],
                        username: user1['email'],
                    },
                    user2: {
                        user_id: user2['user_id'],
                        username: user2['email'],
                    },
                    relationshipUpdate: relationship,
                },
            };
        }
        else {
            const newRelationship = new create_relationship_dto_1.CreateRelationshipDto();
            newRelationship.user1_id = user1_id;
            newRelationship.user2_id = user2_id;
            newRelationship.relationship = relationship;
            await this.relationshipsRepository.save(newRelationship);
            return {
                result: {
                    message: 'New relationship created successfully',
                    user1: {
                        user_id: user1['user_id'],
                        username: user1['email'],
                    },
                    user2: {
                        user_id: user2['user_id'],
                        username: user2['email'],
                    },
                    relationshipUpdate: relationship,
                },
            };
        }
    }
};
exports.RelationshipsService = RelationshipsService;
exports.RelationshipsService = RelationshipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(relationship_entity_1.Relationship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RelationshipsService);
//# sourceMappingURL=relationships.service.js.map