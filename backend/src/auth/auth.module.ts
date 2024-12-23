import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "@/user/user.service";
import { ProviderModule } from "./provider/provider.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getProvidersConfig } from "@/config/providers.config";
import { MailService } from "@/libs/mail/mail.service";
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module";
import { TwoFactorAuthService } from "./two-factor-auth/two-factor-auth.service";
import { AtStrategy } from "./strategies/at.strategy";
import { RtStrategy } from "./strategies/rt.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule, JwtModule.register({})],
      useFactory: getProvidersConfig,
      inject: [ConfigService],
    }),

    forwardRef(() => EmailConfirmationModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService, TwoFactorAuthService, AtStrategy, RtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
