import { IsString, IsUUID, IsBoolean, IsOptional } from "class-validator";

export class UserProfileDto {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsBoolean()
  isVerified: boolean;

  @IsBoolean()
  isTwoFactorEnabled: boolean;
}
