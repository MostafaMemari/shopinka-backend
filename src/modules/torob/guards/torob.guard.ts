import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { importSPKI, importJWK, jwtVerify } from 'jose';

@Injectable()
export class TorobGuard implements CanActivate {
  private async getPublicKey() {
    const raw = process.env.TOROB_PUBLIC_KEY;

    if (!raw) throw new Error('TOROB_PUBLIC_KEY is not defined');

    try {
      if (raw.includes('BEGIN PUBLIC KEY')) {
        const formatted = raw.replace(/\\n/g, '\n');
        return importSPKI(formatted, 'EdDSA');
      }

      const jwk = JSON.parse(raw);
      return importJWK(jwk, 'EdDSA');
    } catch (err) {
      throw new Error('Invalid TOROB_PUBLIC_KEY format');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers['x-torob-token'] as string;
    const version = req.headers['x-torob-token-version'];

    if (!token || version !== '1') throw new UnauthorizedException('Invalid Torob headers');

    try {
      const key = await this.getPublicKey();
      await jwtVerify(token, key, {
        algorithms: ['EdDSA'],
        audience: 'api.shopinka.ir',
      });
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid Torob token');
    }
  }
}
