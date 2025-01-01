import { TypeLoginSchema, TypeRegisterSchema } from "@/features/auth/schemes";
import { axiosAuth, axiosNoAuth } from "@/shared/api";
import { EAuthEndpoints } from "./utils";
import axios from "axios";
import { ApiResponse } from "../../../shared/api/types";
import {
  IAuthResponse,
  ILoginResponse,
  IRefreshResponse,
} from "../types/types";

class AuthService {
  public async register(
    body: TypeRegisterSchema,
  ): Promise<ApiResponse<IAuthResponse>> {
    try {
      const { data } = await axiosNoAuth.post<ApiResponse<IAuthResponse>>(
        EAuthEndpoints.REGISTER,
        body,
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || "Ошибка соединения с сервером";
        const serverError = err.response?.data?.error || "Ошибка";
        const statusCode = err.response?.status || 500;

        return {
          data: {} as IAuthResponse,
          message: serverMessage,
          error: serverError,
          statusCode,
        };
      } else if (err instanceof Error) {
        return {
          data: {} as IAuthResponse,
          message: err.message || "Неизвестная ошибка",
          error: "Unknown",
          statusCode: 500,
        };
      } else {
        return {
          data: {} as IAuthResponse,
          message: "Неизвестная ошибка на клиенте",
          error: "Unknown",
          statusCode: 500,
        };
      }
    }
  }
  public async login(body: TypeLoginSchema): Promise<ILoginResponse> {
    try {
      const { data } = await axiosNoAuth.post<ILoginResponse>(
        EAuthEndpoints.LOGIN,
        body,
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || "Ошибка соединения с сервером";
        const serverError = err.response?.data?.error || "Ошибка";
        return {
          data: {} as ILoginResponse["data"],
          isTwoFactor: false,
          message: serverMessage,
          error: serverError,
        };
      } else if (err instanceof Error) {
        return {
          data: {} as ILoginResponse["data"],
          isTwoFactor: false,
          message: err.message || "Неизвестная ошибка",
          error: "Unknown",
        };
      } else {
        return {
          data: {} as ILoginResponse["data"],
          isTwoFactor: false,
          message: "Неизвестная ошибка на клиенте",
          error: "Unknown",
        };
      }
    }
  }

  public async oauthByProvider(provider: "google" | "yandex") {
    const response = await axiosNoAuth.get<{ url: string }>(
      `${EAuthEndpoints.OAUTH}/${provider}`,
    );

    return response;
  }

  public async logout() {
    try {
      const response = await axiosAuth.post(EAuthEndpoints.LOGOUT);
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async refreshToken(): Promise<ApiResponse<IRefreshResponse>> {
    try {
      const { data } = await axiosAuth.post<ApiResponse<IRefreshResponse>>(
        EAuthEndpoints.REFRESH,
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const authService = new AuthService();
