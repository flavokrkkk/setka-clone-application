import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { AuthMethod } from "@prisma/__generated__";
import { hash } from "argon2";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенные данные!");

    return user;
  }
  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async create(email: string, password: string, username: string, picture: string, method: AuthMethod, isVerified: boolean) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : "",
        username,
        picture,
        method,
        isVerified,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }
}
