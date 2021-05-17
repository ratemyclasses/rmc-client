import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/auth.actions";
import { createStatusReducers } from "../utils";
import { STATUS } from "../constants";

const initialState = {
  authenticated: false,
  status: STATUS.idle,
  error: null,
};

const { login, logout, signup } = actions;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
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
