import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Введите имя",
    }),
    email: z.string().email({
      message: "Введите корректный email",
    }),
    password: z.string().min(6, {
      message: "Пароль должен быть не менее 6 символов",
    }),
    passwordRepeat: z.string().min(6, {
      message: "Пароль должен быть не менее 6 символов",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Пароли не совпадают",
    path: ["passwordRepeat"],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
