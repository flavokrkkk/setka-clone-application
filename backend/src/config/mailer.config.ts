import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: configService.getOrThrow<string>("MAIL_HOST"),
    port: configService.getOrThrow<number>("MAIL_PORT"),
    secure: false,
    auth: {
      user: configService.getOrThrow<string>("MAIL_LOGIN"),
      pass: configService.getOrThrow<string>("MAIL_PASSWORD"),
    },
  },
  defaults: {
    from: '"Strife Team" <yarovitsynegor@yandex.ru>',
  },
});
