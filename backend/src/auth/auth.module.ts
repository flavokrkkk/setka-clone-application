import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "@/user/user.service";
import { ProviderModule } from "./provider/provider.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getProvidersConfig } from "@/config/providers.config";
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service";
import { MailService } from "@/libs/mail/mail.service";
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module";
import { TwoFactorAuthModule } from "./two-factor-auth/two-factor-auth.module";
import { TwoFactorAuthService } from "./two-factor-auth/two-factor-auth.service";

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService],
    }),

    forwardRef(() => EmailConfirmationModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService, TwoFactorAuthService],
  exports: [AuthService],
})
export class AuthModule {}
