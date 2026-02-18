import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { importSPKI, importJWK, jwtVerify } from 'jose';

const TOROB_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAt6Mu4T0pBORY11W+QeM35UsmLO3vsf+6yKpFDEImFk0=
-----END PUBLIC KEY-----`;

@Injectable()
export class TorobGuard implements CanActivate {
  private async getPublicKey() {
    const raw = TOROB_PUBLIC_KEY;

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

    if (!token || version !== '1') {
      throw new UnauthorizedException('Invalid Torob headers');
    }

    try {
      const key = await this.getPublicKey();

      const host = req.headers.host;

      await jwtVerify(token, key, {
        algorithms: ['EdDSA'],
        audience: host,
      });

      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Torob token');
    }
  }
}
