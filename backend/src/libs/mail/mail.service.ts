import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { ConfirmationTemplate } from "./templates/confirmation.template";

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const emailHtml = await render(ConfirmationTemplate({ domain, token }));

    return this.sendMail(email, "Подтверждение почты", emailHtml);
  }

  private sendMail(email: string, subject: string, body: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html: body,
    });
  }
}
