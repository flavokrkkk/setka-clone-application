import { ApiResponse, axiosAuth } from "@/shared/api";
import { IUser } from "../types/types";
import { EUserEndpoints } from "./utils";

class UserService {
  public async getUserProfile() {
    try {
      const { data } = await axiosAuth.get<ApiResponse<IUser>>(
        EUserEndpoints.PROFILE,
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userService = new UserService();
