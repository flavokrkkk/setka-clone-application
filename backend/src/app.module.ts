import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IS_DEVELOP_ENV } from "./libs/common/utils/develop.util";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProviderModule } from "./auth/provider/provider.module";
import { MailModule } from "./libs/mail/mail.module";
import { EmailConfirmationModule } from "./auth/email-confirmation/email-confirmation.module";
import { PasswordRecoveryModule } from "./auth/password-recovery/password-recovery.module";
import { TwoFactorAuthModule } from "./auth/two-factor-auth/two-factor-auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./auth/guards/at.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEVELOP_ENV,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    TwoFactorAuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
