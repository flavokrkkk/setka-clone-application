import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/registrer.dto";
import { UserService } from "@/user/user.service";
import { AuthMethod, User } from "@prisma/__generated__";
import { Request } from "express";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { ProviderService } from "./provider/provider.service";
import { PrismaService } from "@/prisma/prisma.service";
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service";
import { TwoFactorAuthService } from "./two-factor-auth/two-factor-auth.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./strategies/at.strategy";
import { verify } from "argon2";
import { Tokens } from "./types/tokens.types";
@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly providerService: ProviderService,
    private readonly configService: ConfigService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly jwtService: JwtService,
  ) {}

  public async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>("AT_SECRET"),
        expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_EXPIRES"),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>("RT_SECRET"),
        expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRES"),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists)
      throw new ConflictException(
        "Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему!",
      );

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      "", // - можно устанавливать фотографию по умолчанию
      AuthMethod.CREDENTIALS,
      false,
    );

    if (!newUser) throw new InternalServerErrorException("Ошибка сервера");

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.emailConfirmationService.sendVerificationToken(newUser);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return {
      message: "Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на ваш почтовый адрес!",
      data: tokens,
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.password) throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенные данные!");

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword)
      throw new UnauthorizedException("Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его!");

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user);
      throw new UnauthorizedException("Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес!");
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.code) {
        await this.twoFactorAuthService.sendTwoFactorToken(user.email);

        return {
          message: "Проверьте вашу почту. Требуется код двухфакторной аутентификации!",
        };
      }

      await this.twoFactorAuthService.validateTwoFactorToken(user.email, dto.code);
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return {
      message: "Вы успешно авторизовались!",
      data: tokens,
    };
  }

  public async updateRtHash(userId: string, refreshToken: string) {
    const hash = await this.userService.hashData(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  public async extractProfileFromCode(req: Request, provider: string, code: string) {
    const providerInstance = this.providerService.findByService(provider);
    const profile = await providerInstance.findUserByCode(code);

    if (!profile) {
      throw new BadRequestException("Invalid or expired authorization code.");
    }

    const account = await this.prismaService.account.findFirst({
      where: { id: profile.id, provider: profile.provider },
      include: { user: true },
    });

    let user = account?.user || null;

    if (user) {
      return this.handleAuthenticatedUser(user);
    }

    user = await this.userService.create(
      profile.email,
      "",
      profile.name,
      profile.picture,
      AuthMethod[profile.provider.toUpperCase()],
      true,
    );

    if (!account) {
      await this.prismaService.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at,
        },
      });
    }

    return this.handleAuthenticatedUser(user);
  }

  public async logout(userId: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  public async handleAuthenticatedUser(user: User) {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  public async refreshToken(userId: string, rt: string) {
    if (!rt || rt.trim() === "") {
      throw new BadRequestException("Refresh token must be provided");
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

    const rtMatches = await verify(user.hashedRt, rt);

    if (!rtMatches) throw new ForbiddenException("Invalid refresh token");

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      message: "Refresh token",
      data: tokens,
    };
  }
}
