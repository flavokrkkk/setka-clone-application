import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { PasswordRecoveryService } from "./password-recovery.service";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { NewPasswordDto } from "./dto/new-password.dto";
import { Public } from "../decorators/public.decorator";

@Controller("auth/password-recovery")
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Public()
  @Post("reset")
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordRecoveryService.resetPassword(dto);
  }

  @Public()
  @Post("new/:token")
  @HttpCode(HttpStatus.OK)
  public async newPassword(@Body() dto: NewPasswordDto, @Param("token") token: string) {
    return this.passwordRecoveryService.newPassword(dto, token);
  }
}
