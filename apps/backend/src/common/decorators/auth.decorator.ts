import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";

export function AuthDecorator() {
    return applyDecorators(UseGuards(AuthGuard , RoleGuard))
}