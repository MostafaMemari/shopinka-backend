import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { Test } from '@nestjs/testing';
import { UserRepository } from '../../user/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthService (Unit)', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('generateOtp (private method)', () => {
    it('should generate a numeric OTP', () => {
      const otp = (service as any).generateOtp(); //* For access to private method

      expect(otp).toHaveLength(6);
      expect(Number(otp)).not.toBeNaN();
    });

    it('should generate different OTPs (randomized)', () => {
      const otp1 = (service as any).generateOtp();
      const otp2 = (service as any).generateOtp();

      expect(otp1).not.toBe(otp2);
    });
  });
});
