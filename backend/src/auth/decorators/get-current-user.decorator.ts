import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!request.user) {
    throw new Error("User object not found in request");
  }
  if (!data) return request.user;
  return request.user?.[data];
});
