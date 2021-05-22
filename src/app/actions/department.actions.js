import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS } from '../constants';

export const createDepartment = createAsyncThunk(
  ACTIONS.department.create,
  async ({ collegeId, formData }) => {
    const res = await axios.post(`${BASE_URL}/colleges/${collegeId}/departments`, formData);
    return res.data;
  }
);

export const getDepartments = createAsyncThunk(
  ACTIONS.department.get,
  async ({ collegeId, params }) => {
    const res = await axios.get(`${BASE_URL}/colleges/${collegeId}/departments`, { params });
    return res.data;
  }
);

export const getDepartmentById = createAsyncThunk(
  ACTIONS.department.getById,
  async ({ collegeId, id }) => {
    const res = await axios.get(`${BASE_URL}/colleges/${collegeId}/departments/${id}`);
    return res.data;
  }
);

export const updateDepartmentById = createAsyncThunk(
  ACTIONS.department.updateById,
  async ({ collegeId, id, formData }) => {
    const res = await axios.patch(`${BASE_URL}/colleges/${collegeId}/departments/${id}`, formData);
    return res.data;
  }
);

export const deleteDepartmentById = createAsyncThunk(
  ACTIONS.department.deleteById,
  async (collegeId, id) => {
    await axios.delete(`${BASE_URL}/colleges/${collegeId}/departments/${id}`);
    return id;
  }
);
