import axios from "axios";
import { BASE_URL, ACTIONS } from "../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  ACTIONS.user.getCurrent,
  async () => {
    const res = await axios.get(`${BASE_URL}/user`);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  ACTIONS.user.update,
  async (formData) => {
    const res = await axios.patch(`${BASE_URL}/user`, formData);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(ACTIONS.user.delete, async (id) => {
  await axios.delete(`${BASE_URL}/user`);
  return id;
});
