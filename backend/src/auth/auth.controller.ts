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
import { GetCurrentUser } from "./decorators/get-current-user.decorator";
import { GetCurrentUserId } from "./decorators/get-current-user-id.decorator";
import { Public } from "./decorators/public.decorator";

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
  public async register(@Body() dto: RegisterDto): Promise<{ message: string; data: Tokens }> {
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
    return res.redirect(`${this.configService.getOrThrow<string>("ALLOWED_ORIGIN")}/home`);
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
  public async login(@Req() req: Request, @Body() dto: LoginDto): Promise<{ message: string; data?: Tokens }> {
    return this.authService.login(req, dto);
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(@GetCurrentUserId() userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ): Promise<{ message: string; data?: Tokens }> {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
