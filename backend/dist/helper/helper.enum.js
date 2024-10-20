"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = exports.ReactionType = exports.MediaType = exports.ScopeType = exports.StatusType = exports.GenderType = exports.RelationshipType = void 0;
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["FRIEND"] = "friend";
    RelationshipType["FOLLOW"] = "follow";
    RelationshipType["NULL"] = "null";
})(RelationshipType || (exports.RelationshipType = RelationshipType = {}));
var GenderType;
(function (GenderType) {
    GenderType["MALE"] = "male";
    GenderType["FEMALE"] = "female";
    GenderType["OTHER"] = "other";
})(GenderType || (exports.GenderType = GenderType = {}));
var StatusType;
(function (StatusType) {
    StatusType["ON"] = "on";
    StatusType["OFF"] = "off";
})(StatusType || (exports.StatusType = StatusType = {}));
var ScopeType;
(function (ScopeType) {
    ScopeType["PUBLIC"] = "public";
    ScopeType["PRIVATE"] = "private";
})(ScopeType || (exports.ScopeType = ScopeType = {}));
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
})(MediaType || (exports.MediaType = MediaType = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType["LIKE"] = "like";
    ReactionType["LOVE"] = "love";
    ReactionType["HAHA"] = "haha";
    ReactionType["WOW"] = "wow";
    ReactionType["SAD"] = "sad";
    ReactionType["ANGRY"] = "angry";
})(ReactionType || (exports.ReactionType = ReactionType = {}));
var RoleType;
(function (RoleType) {
    RoleType["ADMIN"] = "admin";
    RoleType["USER"] = "user";
    RoleType["GROUP"] = "group";
})(RoleType || (exports.RoleType = RoleType = {}));
//# sourceMappingURL=helper.enum.js.map