import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString({ message: "Email должен быть строкой." })
  @IsEmail({}, { message: "Некорректный формат email." })
  @IsNotEmpty({ message: "Email обязателен для заполнения." })
  email: string;

  @IsString({ message: "Пароль должен быть строкой." })
  @IsNotEmpty({ message: "Поле пароль не может быть пустым." })
  @MinLength(6, { message: "Пароль должен содержать не менее 6 символов." })
  password: string;

  @IsOptional()
  @IsString()
  code: string;
}
