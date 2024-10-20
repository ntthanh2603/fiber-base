"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModuleAvailable = void 0;
function isModuleAvailable(path) {
    try {
        require.resolve(path);
        return true;
    }
    catch {
        return false;
    }
}
exports.isModuleAvailable = isModuleAvailable;
