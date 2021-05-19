import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS } from '../constants';

export const createDepartment = createAsyncThunk(ACTIONS.department.create, async (formData) => {
  const res = await axios.post(`${BASE_URL}/departments`, formData);
  return res.data;
});

export const getDepartments = createAsyncThunk(ACTIONS.department.get, async (params) => {
  const res = await axios.get(`${BASE_URL}/departments`, { params });
  return res.data;
});

export const getDepartmentById = createAsyncThunk(ACTIONS.department.getById, async (id) => {
  const res = await axios.get(`${BASE_URL}/departments/${id}`);
  return res.data;
});

export const updateDepartmentById = createAsyncThunk(
  ACTIONS.department.updateById,
  async (id, formData) => {
    const res = await axios.patch(`${BASE_URL}/departments/${id}`, formData);
    return res.data;
  }
);

export const deleteDepartmentById = createAsyncThunk(ACTIONS.department.deleteById, async (id) => {
  await axios.delete(`${BASE_URL}/departments/${id}`);
  return id;
});
