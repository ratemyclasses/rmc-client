import axios from "axios";
import { BASE_URL, ACTIONS } from "../features.constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  ACTIONS.auth.signup,
  async (formData) => {
    const res = await axios.post(`${BASE_URL}/users`, formData);

    localStorage.setItem("Authenticated", res.data.token);
    axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

    return true;
  }
);

export const login = createAsyncThunk(
  ACTIONS.auth.login,
  async ({ email, password }) => {
    const res = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    localStorage.setItem("Authenticated", res.data.accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;

    return true;
  }
);

export const logout = createAsyncThunk(ACTIONS.auth.logout, () => {
  localStorage.removeItem("Authenticated");
  delete axios.defaults.headers.common.Authorization;

  return false;
});
