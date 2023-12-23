"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_protected_decorator_1 = require("./role-protected/role-protected.decorator");
const user_role_guard_1 = require("../guards/user-role/user-role.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, role_protected_decorator_1.RoleProtected)(...roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRolesGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map