import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { EmailConfirmationService } from "./email-confirmation.service";
import { Request } from "express";
import { ConfirmationDto } from "./dto/confirmation.dto";
import { Public } from "../decorators/public.decorator";

@Public()
@Controller("auth/email-confirmation")
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async newVerification(@Req() req: Request, @Body() body: ConfirmationDto) {
    return this.emailConfirmationService.newVerification(req, body);
  }
}
