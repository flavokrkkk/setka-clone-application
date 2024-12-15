import { Controller } from "@nestjs/common";
import { PasswordRecoveryService } from "./password-recovery.service";

@Controller("auth/password-recovery")
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}
}
