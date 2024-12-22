import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов",
  }),
});

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>;
