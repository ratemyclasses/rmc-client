import axios from "axios";
import { BASE_URL, ACTIONS } from "../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCollege = createAsyncThunk(
  ACTIONS.college.create,
  async (formData) => {
    const res = await axios.post(`${BASE_URL}/colleges`, formData);
    return res.data;
  }
);

export const getColleges = createAsyncThunk(
  ACTIONS.college.get,
  async (params) => {
    const res = await axios.get(`${BASE_URL}/colleges`, { params });
    return res.data;
  }
);

export const getCollegeById = createAsyncThunk(
  ACTIONS.college.getById,
  async (id) => {
    const res = await axios.get(`${BASE_URL}/colleges/${id}`);
    return res.data;
  }
);

export const getCollegeByTag = createAsyncThunk(
  ACTIONS.college.getByTag,
  async (tag) => {
    const res = await axios.get(`${BASE_URL}/colleges/tag/${tag}`);
    return res.data;
  }
);


export const updateCollegeById = createAsyncThunk(
  ACTIONS.college.updateById,
  async (id, formData) => {
    const res = await axios.patch(`${BASE_URL}/colleges/${id}`, formData);
    return res.data;
  }
);

export const deleteCollegeById = createAsyncThunk(
  ACTIONS.college.deleteById,
  async (id) => {
    await axios.delete(`${BASE_URL}/colleges/${id}`);
    return id;
  }
);
