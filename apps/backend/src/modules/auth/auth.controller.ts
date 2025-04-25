import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { SignoutDto } from "./dto/signout.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { VerifyOtpDto } from "./dto/verifyOtp.dto";
import { SwaggerConsumes } from "../../common/enums/swagger-consumes.enum";

@Controller("auth")
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('authenticate')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.authenticateWithOtp(authenticateDto)
  }

  @Post('signout')
  // @AuthDecorator()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async signout(@Body() signoutDto: SignoutDto) {
    return this.authService.signout(signoutDto)
  }

  @Post('refresh-token')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('verify-authenticate-otp')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto)
  }
}
