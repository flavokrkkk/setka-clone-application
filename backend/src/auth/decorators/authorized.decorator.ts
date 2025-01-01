import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Authorized = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (key) {
    return user[key];
  }

  return user;
});
