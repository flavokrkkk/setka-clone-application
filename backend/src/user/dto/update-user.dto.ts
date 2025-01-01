import { AuthMethod } from "@prisma/__generated__";
import { isBoolean, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Имя должно быть строкой." })
  @IsNotEmpty({ message: "Имя обязательно для заполнения." })
  name: string;

  @IsOptional()
  @IsString({ message: "Email должен быть строкой." })
  @IsEmail({}, { message: "Некорректный формат email." })
  @IsNotEmpty({ message: "Email обязателен для заполнения." })
  email: string;
  @IsOptional()
  @IsBoolean({ message: "isTwoFactorEnabled должно быть булевым значением." })
  isTwoFactorEnabled: boolean;

  @IsOptional()
  @IsString({ message: "URL фотографии должен быть строкой." })
  picture?: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: "Неверный формат email." })
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 128, { message: "Пароль должен содержать от 8 до 128 символов." })
  password?: string;

  @IsString()
  @Length(3, 30, { message: "Имя пользователя должно быть от 3 до 30 символов." })
  username: string;

  method: AuthMethod;

  isVerified: boolean;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/[^\s]+$/, { message: "Некорректная ссылка на изображение профиля." })
  picture?: string;
}
