"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const groups_module_1 = require("./groups/groups.module");
const posts_module_1 = require("./posts/posts.module");
const messages_module_1 = require("./messages/messages.module");
const medias_module_1 = require("./medias/medias.module");
const reactions_module_1 = require("./reactions/reactions.module");
const comments_module_1 = require("./comments/comments.module");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const relationships_module_1 = require("./relationships/relationships.module");
const historys_module_1 = require("./historys/historys.module");
const conversation_members_module_1 = require("./conversation-members/conversation-members.module");
const conversations_module_1 = require("./conversations/conversations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            groups_module_1.GroupsModule,
            posts_module_1.PostsModule,
            messages_module_1.MessagesModule,
            medias_module_1.MediasModule,
            reactions_module_1.ReactionsModule,
            comments_module_1.CommentsModule,
            auth_module_1.AuthModule,
            relationships_module_1.RelationshipsModule,
            historys_module_1.HistorysModule,
            conversation_members_module_1.ConversationMembersModule,
            conversations_module_1.ConversationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map