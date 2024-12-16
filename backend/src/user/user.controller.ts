import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { Authorization } from "@/auth/decorators/auth.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

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

  @Patch("profile")
  @Authorization()
  @HttpCode(HttpStatus.OK)
  public async updateProfile(@Authorized("id") userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }
}
