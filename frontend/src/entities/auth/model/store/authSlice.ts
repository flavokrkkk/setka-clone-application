import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSlice } from "./types";
import { TypeLoginSchema } from "@/features/auth/schemes";

const initialState: IAuthSlice = {
  authorizeData: null,
};

export const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: (create) => ({
    setTwoFactorAuthorizeData: create.reducer(
      (state, { payload }: PayloadAction<TypeLoginSchema>) => {
        state.authorizeData = payload;
      },
    ),
  }),
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
