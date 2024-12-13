import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegisterDto } from "./dto/registrer.dto";
import { UserService } from "@/user/user.service";
import { AuthMethod, User } from "@prisma/__generated__";
import { Request } from "express";

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(req: Request, dto: RegisterDto) {
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

    return this.saveSession(req, newUser);
  }

  public async login() {}

  public async logout() {}

  private async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException("Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии!"),
          );
        }

        resolve(user);
      });
    });
  }
}
