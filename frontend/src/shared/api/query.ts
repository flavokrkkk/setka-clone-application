import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { TokenService } from "@/entities/token";
import { RequestOptions } from "https";
import tokenService from "@/entities/token/libs/tokenService";
import { catchError } from "../utils/catchError";
import { authService } from "@/entities/auth/libs";

export class AxiosClient {
  private baseQueryV1Instance: AxiosInstance;

  constructor(baseURL: string, withAuth = false) {
    const config: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.baseQueryV1Instance = axios.create(config);

    if (withAuth) {
      this.addAuthResponseInterceptor();
      this.addAuthInterceptor();
    }
  }

  private addAuthInterceptor() {
    this.baseQueryV1Instance.interceptors.request.use((config) => {
      const token = TokenService.getAccessToken();
      if (config && config.headers && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        TokenService.deleteAccessToken();
      }
      return config;
    });
  }

  public addAuthResponseInterceptor() {
    let isRefreshing = false;
    this.baseQueryV1Instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing) {
            await new Promise((resolve) => {
              const interval = setInterval(() => {
                if (!isRefreshing) {
                  clearInterval(interval);
                  resolve("");
                }
              }, 100);
            });
          }

          isRefreshing = true;

          try {
            const {
              data: { access_token: accessToken },
            } = await authService.refreshToken();

            if (accessToken) {
              tokenService.setAccessToken(accessToken);
            } else {
              tokenService.deleteAccessToken();
            }

            isRefreshing = false;

            return this.baseQueryV1Instance(originalRequest);
          } catch (error) {
            if (catchError(error) === "jwt expired") {
              tokenService.deleteAccessToken();
            }

            isRefreshing = false;

            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private handleError(error: AxiosError<{ message?: string }>): never {
    const message = error.response?.data?.message || error.message || "Error";
    throw new Error(message);
  }

  public async get<T>(
    url: string,
    params: Omit<RequestOptions, "body"> = {},
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.get<T>(url, { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.post<T>(
        url,
        data,
        config,
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.patch<T>(
        url,
        data,
        config,
      );
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.baseQueryV1Instance.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error as AxiosError<{ message?: string }>);
    }
  }
}

export const axiosNoAuth = new AxiosClient(import.meta.env.VITE_SERVER_URL);
export const axiosAuth = new AxiosClient(import.meta.env.VITE_SERVER_URL, true);
