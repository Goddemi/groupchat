import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface LoginUser {
  loginUser: string | undefined;
}

const initialState: LoginUser = {
  loginUser: "",
};

const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<string>) => {
      state.loginUser = action.payload;
    },
    setLogout: (state) => {
      state.loginUser = "";
    },
  },
});

export const { setLoginUser, setLogout } = loginUserSlice.actions;

export default loginUserSlice.reducer;
