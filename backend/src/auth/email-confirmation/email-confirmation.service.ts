import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Token, TokenType, User } from "@prisma/__generated__";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { ConfirmationDto } from "./dto/confirmation.dto";
import { MailService } from "@/libs/mail/mail.service";
import { UserService } from "@/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: dto.token,
      },
    });

    if (!existingToken) {
      throw new NotFoundException("Токен подтверждения не найден. Пожалуйста, убедитесь, что у вас правильный токен!");
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();
    if (hasExpired) {
      throw new BadRequestException("Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения!");
    }

    const existingUser = await this.userService.findByEmail(existingToken.email);
    if (!existingUser) {
      throw new NotFoundException(
        "Пользователь с указанным адресом электронной почты не найден. Пожалуйста убедитесь, что вы ввели правильный email!",
      );
    }

    if (existingUser.isVerified) {
      throw new BadRequestException("Пользователь уже подтверждён.");
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { isVerified: true },
      });

      try {
        await prisma.token.delete({
          where: { id: existingToken.id },
        });
      } catch (error) {
        if (error.code === "P2025") {
          console.warn("Token already deleted:", existingToken.id);
        } else {
          throw error;
        }
      }
    });

    await this.authService.handleAuthenticatedUser(existingUser);
    return {
      message: "Вы успешно подтвердили почту!",
    };
  }
  public async sendVerificationToken(user: User) {
    const verificationToken = await this.generateVerificationToken(user.email);
    await this.mailService.sendConfirmationEmail(verificationToken.email, verificationToken.token);

    return true;
  }

  private async generateVerificationToken(email: string): Promise<Token> {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION,
      },
    });
    if (existingToken) {
      if (new Date(existingToken.expiresIn) > new Date()) {
        return existingToken;
      }
      await this.prismaService.token.delete({ where: { id: existingToken.id } });
    }
    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.VERIFICATION,
      },
    });

    return verificationToken;
  }
}
