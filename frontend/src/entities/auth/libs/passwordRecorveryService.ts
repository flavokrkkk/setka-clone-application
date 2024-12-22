import { TypeResetPasswordSchema } from "@/features/auth/schemes/resetPasswordSchema";
import { axiosNoAuth } from "@/shared/api";
import { EAuthEndpoints } from "./utils";
import { TypeNewPasswordSchema } from "@/features/auth/schemes";

class PasswordRecoveryService {
  public async resetPassword(body: TypeResetPasswordSchema) {
    const response = axiosNoAuth.post(EAuthEndpoints.RESET, body);
    return response;
  }
  public async newPassword(body: TypeNewPasswordSchema, token: string | null) {
    const response = axiosNoAuth.post(`${EAuthEndpoints.NEW}/${token}`, body);
    return response;
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();
