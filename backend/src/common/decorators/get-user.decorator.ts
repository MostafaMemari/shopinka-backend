import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'generated/prisma';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User | null => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
