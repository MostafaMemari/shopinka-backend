import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SendOtpDto } from "./dto/authenticate.dto";
import { SignoutDto } from "./dto/signout.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { VerifyOtpDto } from "./dto/verifyOtp.dto";
import { SwaggerConsumes } from "../../common/enums/swagger-consumes.enum";
import { AuthDecorator } from "../../common/decorators/auth.decorator"
import { SkipVerifyMobile } from "../../common/decorators/skip-verify-mobile.decorator";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { User } from "generated/prisma";
import { VerifyMobileDto } from "./dto/verify-mobile.dto";

@Controller("auth")
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('authenticate')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  authenticate(@Body() authenticateDto: SendOtpDto) {
    return this.authService.sendOtp(authenticateDto)
  }

  @Post('signout')
  @AuthDecorator()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  signout(@Body() signoutDto: SignoutDto) {
    return this.authService.signout(signoutDto)
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('verify-authenticate-otp')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyAuthenticateOtp(verifyOtpDto)
  }

  @Get('request-verification-mobile')
  @AuthDecorator()
  @SkipVerifyMobile()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  requestVerificationMobile(@GetUser() user: User) {
    return this.authService.requestVerificationMobile(user)
  }

  @Post('verify-mobile')
  @AuthDecorator()
  @SkipVerifyMobile()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  verifyMobile(@Body() verifyMobileDto: VerifyMobileDto, @GetUser() user: User) {
    return this.authService.verifyMobileOtp(verifyMobileDto, user)
  }
}
