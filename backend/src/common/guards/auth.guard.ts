import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTH } from '../decorators/skip-auth.decorator';
import { AuthService } from '../../modules/auth/auth.service';
import { Request } from 'express';
import { SKIP_VERIFY_MOBILE } from '../decorators/skip-verify-mobile.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean | never> {
    const isSkippedAuth = this.reflector.get<boolean>(SKIP_AUTH, context.getHandler());
    const isSkippedVerifyMobile = this.reflector.get<boolean>(SKIP_VERIFY_MOBILE, context.getHandler());

    if (isSkippedAuth) return isSkippedAuth;

    const req: Request = context.switchToHttp().getRequest();
    const {
      headers: { authorization },
    } = req;

    if (!authorization || authorization?.split(' ')?.[0]?.toLowerCase() !== 'bearer') {
      throw new BadRequestException('Authorization header is required.');
    }

    const user = await this.authService.verifyAccessToken({ accessToken: authorization.split(' ')[1] });

    if (!isSkippedVerifyMobile && !user.isVerifiedMobile) throw new ForbiddenException('Mobile is not verified.');

    req.user = user;

    return true;
  }
}
