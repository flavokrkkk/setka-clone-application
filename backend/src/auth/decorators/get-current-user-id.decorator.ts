import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../strategies/at.strategy";

export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as JwtPayload;
  return user.sub;
});
