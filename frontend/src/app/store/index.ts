import { authReducer } from "@/entities/auth/model/store";
import { userReducer } from "@/entities/user/model/store/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const reducers = combineReducers({
  authReducer,
  userReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
