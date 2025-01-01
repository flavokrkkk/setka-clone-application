import { RootState } from "@/app/store";

export const authSelector = (state: RootState) => state.authReducer;
