import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { Authorization } from "@/auth/decorators/auth.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @Authorization()
  @HttpCode(HttpStatus.OK)
  public async findPorfile(@Authorized("id") userId: string) {
    return this.userService.findById(userId);
  }

  @Get("/:id")
  @Authorization()
  @HttpCode(HttpStatus.OK)
  public async findById(@Param("id") userId: string) {
    return this.userService.findById(userId);
  }
}
