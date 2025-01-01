import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import * as jwt from "jsonwebtoken"; // библиотека для работы с JWT
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }
    try {
      const user = jwt.verify(token, this.configService.getOrThrow<string>("AT_SECRET"));
      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
