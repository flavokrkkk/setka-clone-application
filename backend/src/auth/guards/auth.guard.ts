import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (typeof request.session.userId === "undefined") {
      throw new UnauthorizedException("Недостаточно прав. У вас нет прав доступа к этому ресурсу!");
    }

    try {
      const user = await this.userService.findById(request.session.userId);

      if (!user) {
        throw new UnauthorizedException("Пользователь не найден. Пожалуйста, авторизуйтесь снова.");
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException("Ошибка при получении пользователя. Попробуйте снова.");
    }
  }
}
