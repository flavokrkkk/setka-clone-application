import { isRouteErrorResponse } from "react-router-dom";

export const getErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return error.data.message || error.statusText;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "Unknown error";
};
