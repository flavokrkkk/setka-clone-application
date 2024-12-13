import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registrer.dto";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  public async register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.authService.register(req, dto);
  }
}
