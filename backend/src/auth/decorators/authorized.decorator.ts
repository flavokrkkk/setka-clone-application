import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/__generated__";

export const Authorized = createParamDecorator((key: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;

  return key ? user[key] : user;
});
