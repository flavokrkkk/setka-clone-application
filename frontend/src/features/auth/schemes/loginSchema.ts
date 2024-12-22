import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Введите корректный email",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов",
  }),
  code: z.optional(z.string().min(6)),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
