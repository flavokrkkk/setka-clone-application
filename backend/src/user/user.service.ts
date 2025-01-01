import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { AuthMethod } from "@prisma/__generated__";
import { hash, verify } from "argon2";
import { CreateUserDto, UpdateUserDto } from "./dto/update-user.dto";
import { isUUID } from "class-validator";
import { UserProfileDto } from "./dto/profile-user-dto";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string): Promise<UserProfileDto> {
    if (!isUUID(id)) {
      throw new BadRequestException("Неверный формат идентификатора пользователя!");
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенные данные!");
    }

    const userProfileDto: UserProfileDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      picture: user.picture || "",
      isVerified: user.isVerified,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
    };

    return userProfileDto;
  }

  public async hashData(data: string) {
    return await hash(data);
  }

  public async compareHash(hashedToken: string, token: string): Promise<boolean> {
    return await verify(hashedToken, token);
  }

  public async findByEmail(email: string) {
    if (!email) throw new BadRequestException("Email обязателен.");
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

  public async create(dto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: dto.password ? await this.hashData(dto.password) : "",
          username: dto.username,
          picture: dto.picture || "",
          method: AuthMethod.CREDENTIALS,
          isVerified: false,
        },
        include: {
          accounts: true,
        },
      });

      return user;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Пользователь с таким email уже существует.");
      }
      throw new InternalServerErrorException("Не удалось создать пользователя.");
    }
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);
    if (dto.email) {
      const existingUser = await this.findByEmail(dto.email);
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException("Email уже используется другим пользователем.");
      }
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: dto.email,
          username: dto.name,
          isTwoFactorEnabled: dto.isTwoFactorEnabled,
          picture: dto.picture,
        },
      });

      return updatedUser;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Email уже используется другим пользователем.");
      }
      throw new InternalServerErrorException("Ошибка при обновлении пользователя.");
    }
  }
}
