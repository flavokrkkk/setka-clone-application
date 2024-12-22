import { axiosNoAuth } from "@/shared/api";
import { EAuthEndpoints } from "./utils";

class VerificateService {
  public async verifyEmail(token: string | null) {
    const response = await axiosNoAuth.post(EAuthEndpoints.VERIFY, { token });
    return response;
  }
}

export const verificateService = new VerificateService();
