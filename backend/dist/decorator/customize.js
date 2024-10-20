"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.ResponseMessage = exports.RESPONSE_MESSAGE = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.RESPONSE_MESSAGE = 'response_message';
const ResponseMessage = (message) => (0, common_1.SetMetadata)(exports.RESPONSE_MESSAGE, message);
exports.ResponseMessage = ResponseMessage;
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=customize.js.map