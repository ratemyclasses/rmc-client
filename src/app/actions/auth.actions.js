import * as axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS } from '../constants';

export const signup = createAsyncThunk(ACTIONS.auth.signup, async (formData) => {
  const res = await axios.post(`${BASE_URL}/user`, formData);

  localStorage.setItem('Authenticated', res.data.accessToken);
  axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;

  return true;
});

export const login = createAsyncThunk(ACTIONS.auth.login, async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    email,
    password
  });

  localStorage.setItem('Authenticated', res.data.accessToken);
  axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;

  return true;
});

export const googleLogin = createAsyncThunk(ACTIONS.auth.googleLogin, async () => {
  const res = await axios.get(`${BASE_URL}/google`);

  localStorage.setItem('Authenticated', res.data.accessToken);
  axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;

  return true;
});

export const logout = createAsyncThunk(ACTIONS.auth.logout, () => {
  localStorage.removeItem('Authenticated');
  delete axios.defaults.headers.common.Authorization;

  return false;
});
