import { TypeLoginSchema, TypeRegisterSchema } from "@/features/auth/schemes";
import { axiosAuth, axiosNoAuth } from "@/shared/api";
import { EAuthEndpoints } from "./utils";
import axios from "axios";
import { IUser } from "@/entities/user/types/types";
import { ApiResponse } from "../../../shared/api/types";

class AuthService {
  public async register(body: TypeRegisterSchema): Promise<ApiResponse<IUser>> {
    try {
      const { data } = await axiosNoAuth.post<ApiResponse<IUser>>(
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
          data: {} as IUser,
          message: serverMessage,
          error: serverError,
          statusCode,
        };
      } else if (err instanceof Error) {
        return {
          data: {} as IUser,
          message: err.message || "Неизвестная ошибка",
          error: "Unknown",
          statusCode: 500,
        };
      } else {
        return {
          data: {} as IUser,
          message: "Неизвестная ошибка на клиенте",
          error: "Unknown",
          statusCode: 500,
        };
      }
    }
  }
  public async login(body: TypeLoginSchema): Promise<ApiResponse<IUser>> {
    try {
      const { data } = await axiosNoAuth.post<ApiResponse<IUser>>(
        EAuthEndpoints.LOGIN,
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
          data: {} as IUser,
          message: serverMessage,
          error: serverError,
          statusCode,
        };
      } else if (err instanceof Error) {
        return {
          data: {} as IUser,
          message: err.message || "Неизвестная ошибка",
          error: "Unknown",
          statusCode: 500,
        };
      } else {
        return {
          data: {} as IUser,
          message: "Неизвестная ошибка на клиенте",
          error: "Unknown",
          statusCode: 500,
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
      Promise.reject(err);
    }
  }
}

export const authService = new AuthService();
