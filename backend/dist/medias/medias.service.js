"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediasService = void 0;
const common_1 = require("@nestjs/common");
let MediasService = class MediasService {
    create(createMediaDto) {
        return 'This action adds a new media';
    }
    findAll() {
        return `This action returns all medias`;
    }
    findOne(id) {
        return `This action returns a #${id} media`;
    }
    update(id, updateMediaDto) {
        return `This action updates a #${id} media`;
    }
    remove(id) {
        return `This action removes a #${id} media`;
    }
};
exports.MediasService = MediasService;
exports.MediasService = MediasService = __decorate([
    (0, common_1.Injectable)()
], MediasService);
//# sourceMappingURL=medias.service.js.map