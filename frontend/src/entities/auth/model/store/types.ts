import { TypeLoginSchema } from "@/features/auth/schemes";

export interface IAuthSlice {
  authorizeData: TypeLoginSchema | null;
}
