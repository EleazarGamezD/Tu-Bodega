import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { ValidRoles } from "../interfaces";
import { UserRolesGuard } from "../guards/user-role/user-role.guard";

export function Auth (...roles: ValidRoles[])
{
return applyDecorators(
    RoleProtected (...roles),
    UseGuards(AuthGuard(), UserRolesGuard  ),
    )
}