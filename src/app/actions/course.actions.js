import axios from "axios";
import { BASE_URL, ACTIONS } from "../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCourse = createAsyncThunk(
  ACTIONS.course.create,
  async (formData) => {
    const res = await axios.post(`${BASE_URL}/courses`, formData);
    return res.data;
  }
);

export const getCourses = createAsyncThunk(
  ACTIONS.course.get,
  async (params) => {
    const res = await axios.get(`${BASE_URL}/courses`, { params });
    return res.data;
  }
);

export const getCourseById = createAsyncThunk(
  ACTIONS.course.getById,
  async (id) => {
    const res = await axios.get(`${BASE_URL}/courses/${id}`);
    return res.data;
  }
);

export const updateCourseById = createAsyncThunk(
  ACTIONS.course.updateById,
  async (id, formData) => {
    const res = await axios.patch(`${BASE_URL}/courses/${id}`, formData);
    return res.data;
  }
);

export const deleteCourseById = createAsyncThunk(
  ACTIONS.course.deleteById,
  async (id) => {
    await axios.delete(`${BASE_URL}/courses/${id}`);
    return id;
  }
);
