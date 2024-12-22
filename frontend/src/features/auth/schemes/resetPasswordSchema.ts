import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Введите корректный email",
  }),
});

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
