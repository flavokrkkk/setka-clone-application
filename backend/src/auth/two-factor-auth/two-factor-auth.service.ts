import { MailService } from "@/libs/mail/mail.service";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Token, TokenType } from "@prisma/__generated__";

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly mailService: MailService,
    private readonly prismaService: PrismaService,
  ) {}

  public async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (!existingToken)
      throw new NotFoundException(
        "Токен двухфакторной аунтификации не найден. Убедитесь, что вы запрашивали токен для данного адреса электронной почты!",
      );

    if (existingToken.token !== code)
      throw new BadRequestException("Неверный код двухфакторной аунтификации. Пожалуйста, проверьте введенный код и попробуйте снова.");

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired)
      throw new BadRequestException("Срок действия токена двухфакторной аунтификации истек. Пожалуйста, запросите новый токен!");

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR,
      },
    });
    return true;
  }
  public async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email);
    await this.mailService.sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    return true;
  }

  private async generateTwoFactorToken(email: string): Promise<Token> {
    const token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString();
    const expiresIn = new Date(new Date().getTime() + 300000);
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.TWO_FACTOR,
        },
      });
    }

    const twoFactorToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.TWO_FACTOR,
      },
    });

    return twoFactorToken;
  }
}
