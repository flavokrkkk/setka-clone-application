import { AxiosError } from "axios";

export interface ErrorResponse {
  message: string | string[];
}

export const catchError = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message;

    if (message) {
      if (Array.isArray(message)) {
        return message.length > 0
          ? message[0]
          : "Unexpected error array format";
      }
      return message;
    }
  }

  return "Unknown error occurred";
};
