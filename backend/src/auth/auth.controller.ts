import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Req, Res, UseGuards, Query, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registrer.dto";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { AuthProviderGuard } from "./guards/provider.guard";
import { ConfigService } from "@nestjs/config";
import { ProviderService } from "./provider/provider.service";
import { RtGuard } from "./guards/rt.guard";
import { AtGuard } from "./guards/at.guard";
import { GetCurrentUserId } from "./decorators/get-current-user-id.decorator";
import { Public } from "./decorators/public.decorator";
import { Cookies } from "./decorators/auth.cookies.decorator";
import { createAtCookies, createRtCookies, removeAtCookies, removeRtCookies } from "./utils/createCookies";

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
  public async callback(@Res({ passthrough: true }) res: Response, @Query("code") code: string, @Param("provider") provider: string) {
    if (!code) throw new BadRequestException("Не был предоставлен код авторизации!");
    const tokens = await this.authService.extractProfileFromCode(provider, code);
    createRtCookies(res, tokens);
    createAtCookies(res, tokens);
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
      const { data, isTwoFactor, message } = await this.authService.login(dto);
      createRtCookies(res, data);
      res.status(HttpStatus.OK).json({
        message: message,
        data: { access_token: data.access_token },
        isTwoFactor: isTwoFactor,
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
    removeRtCookies(res);
    removeAtCookies(res);
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

    const { data, message } = await this.authService.refreshToken(userId, refreshToken);

    createRtCookies(res, data);

    return {
      message,
      data: { access_token: data.access_token },
    };
  }
}
