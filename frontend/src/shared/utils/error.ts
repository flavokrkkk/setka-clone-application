import { toast } from "sonner";
import { ApiResponse } from "../api";

export function toastMessageHandler<T>(error: ApiResponse<T> | Error) {
  if (error.message) {
    const errorMessage = error.message;
    const firstDotIndex = errorMessage.indexOf(".");

    if (firstDotIndex !== -1) {
      toast.error(errorMessage.slice(0, firstDotIndex), {
        description: errorMessage.slice(firstDotIndex + 1),
      });
    } else {
      toast.error(errorMessage);
    }
  } else {
    toast.error("Ошибка со строны сервера");
  }
}

export const toastSuccesHandler = (message: string, description?: string) => {
  toast.success(message, description ? { description } : {});
};
