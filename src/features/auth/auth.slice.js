import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup } from "./auth.actions";
import { createStatusReducers } from "../features.utils";
import { STATUS } from "../features.constants";

const initialState = {
  authenticated: false,
  status: STATUS.idle,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(signup, login, logout),
    [signup.fulfilled]: (state, action) => {
      state.authenticated = action.payload;
      state.status = STATUS.success;
    },
    [login.fulfilled]: (state, action) => {
      state.authenticated = action.payload;
      state.status = STATUS.success;
    },
    [logout.fulfilled]: (state, action) => {
      state.authenticated = action.payload;
      state.status = STATUS.success;
    },
  },
});

export default authSlice.reducer;
