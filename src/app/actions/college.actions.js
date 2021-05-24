import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS } from '../constants';

export const createCollege = createAsyncThunk(ACTIONS.college.create, async (formData) => {
  const res = await axios.post(`${BASE_URL}/colleges`, formData);
  return res.data;
});

export const getColleges = createAsyncThunk(ACTIONS.college.get, async (params) => {
  const res = await axios.get(`${BASE_URL}/colleges`, { params });
  let totalCount = 0;
  if (res.headers['x-total-count']) {
    totalCount = parseInt(res.headers['x-total-count'], 10);
  }
  return { data: res.data, totalCount };
});

export const getCollegeById = createAsyncThunk(ACTIONS.college.getById, async (id) => {
  const res = await axios.get(`${BASE_URL}/colleges/${id}`);
  return res.data;
});

export const getCollegeByTag = createAsyncThunk(ACTIONS.college.getByTag, async (tag) => {
  const res = await axios.get(`${BASE_URL}/colleges/tag/${tag}`);
  return res.data;
});

export const updateCollegeById = createAsyncThunk(
  ACTIONS.college.updateById,
  async ({ id, formData }) => {
    const res = await axios.patch(`${BASE_URL}/colleges/${id}`, formData);
    return res.data;
  }
);

export const deleteCollegeById = createAsyncThunk(ACTIONS.college.deleteById, async (id) => {
  await axios.delete(`${BASE_URL}/colleges/${id}`);
  return id;
});
