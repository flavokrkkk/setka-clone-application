import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./at.strategy";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>("RT_SECRET"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req?.get("authorization")?.replace("Bearer", "").trim();

    if (!refreshToken) throw new ForbiddenException("Refresh token malformed");

    return {
      ...payload,
      refreshToken,
    };
  }
}
