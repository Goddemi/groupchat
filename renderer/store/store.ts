import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./auth/loginUser";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
