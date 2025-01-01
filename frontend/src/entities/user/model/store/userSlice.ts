import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSlice } from "./types";
import { IUser } from "../../types";

const initialState: IUserSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: (create) => ({
    setCurrentUser: create.reducer(
      (state, { payload }: PayloadAction<IUser>) => {
        state.user = payload;
      },
    ),
  }),
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
