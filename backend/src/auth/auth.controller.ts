import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Req, Res, UseGuards, Query, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registrer.dto";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { AuthProviderGuard } from "./guards/provider.guard";
import { ConfigService } from "@nestjs/config";
import { ProviderService } from "./provider/provider.service";
import { Tokens } from "./types/tokens.types";
import { RtGuard } from "./guards/rt.guard";
import { AtGuard } from "./guards/at.guard";
import { GetCurrentUserId } from "./decorators/get-current-user-id.decorator";
import { Public } from "./decorators/public.decorator";
import { Cookies } from "./decorators/auth.cookies.decorator";

@Controller("auth")
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
  ) {}

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.OK)
  public async register(@Body() dto: RegisterDto): Promise<{ message: string }> {
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(AuthProviderGuard)
  @Get("/oauth/callback/:provider")
  public async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query("code") code: string,
    @Param("provider") provider: string,
  ) {
    if (!code) throw new BadRequestException("Не был предоставлен код авторизации!");
    await this.authService.extractProfileFromCode(req, provider, code);
    return res.redirect(`${this.configService.getOrThrow<string>("ALLOWED_ORIGIN")}/dashboard`);
  }

  @Public()
  @UseGuards(AuthProviderGuard)
  @Get("/oauth/connect/:provider")
  public async connect(@Param("provider") provider: string) {
    const providerInstance = this.providerService.findByService(provider);
    return {
      url: providerInstance.getAuthUrl(),
    };
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Res() res: Response, @Body() dto: LoginDto): Promise<void> {
    try {
      const response = await this.authService.login(dto);
      console.log("Refresh Token Cookies:", response.data.refresh_token);
      res.cookie("refresh_token", response.data.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({
        message: response.message,
        data: { access_token: response.data.access_token },
        isTwoFactor: response.isTwoFactor,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(@GetCurrentUserId() userId: string, @Res() res: Response): Promise<void> {
    res.clearCookie("refresh_token", { httpOnly: true, secure: true, sameSite: "strict" });
    return this.authService.logout(userId);
  }
  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId() userId: string,
    @Cookies("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string; data?: { access_token: string } | null }> {
    if (!refreshToken) {
      throw new BadRequestException("Refresh token is missing.");
    }

    // const isTokenExpired = await this.authService.isTokenExpired(refreshToken); // Ваша проверка истечения срока
    // if (!isTokenExpired) {
    //   return { message: "Refresh token is still valid", data: null };
    // }

    const { data, message } = await this.authService.refreshToken(userId, refreshToken);

    res.cookie("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message,
      data: { access_token: data.access_token },
    };
  }
}
