import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) return true;

    const req: Request = context.switchToHttp().getRequest();

    return roles.includes(req.user.role);
  }
}
