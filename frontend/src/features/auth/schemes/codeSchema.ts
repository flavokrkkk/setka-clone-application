import { z } from "zod";

export const CodeSchema = z.object({
  code: z.optional(z.string().min(6)),
});

export type TypeCodeSchema = z.infer<typeof CodeSchema>;
