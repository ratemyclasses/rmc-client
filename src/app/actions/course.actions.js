import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS } from '../constants';

export const createCourse = createAsyncThunk(
  ACTIONS.course.create,
  async ({ collegeId, formData }) => {
    const res = await axios.post(`${BASE_URL}/colleges/${collegeId}/courses`, formData);
    return res.data;
  }
);

export const getCourses = createAsyncThunk(ACTIONS.course.get, async ({ collegeId, params }) => {
  const res = await axios.get(`${BASE_URL}/colleges/${collegeId}/courses`, { params });
  let totalCount = 0;
  if (res.headers['x-total-count']) {
    totalCount = parseInt(res.headers['x-total-count'], 10);
  }
  return { data: res.data, totalCount };
});

export const getCourseById = createAsyncThunk(ACTIONS.course.getById, async ({ collegeId, id }) => {
  const res = await axios.get(`${BASE_URL}/colleges/${collegeId}/courses/${id}`);
  return res.data;
});

export const updateCourseById = createAsyncThunk(
  ACTIONS.course.updateById,
  async ({ collegeId, id, formData }) => {
    const res = await axios.patch(`${BASE_URL}/colleges/${collegeId}/courses/${id}`, formData);
    return res.data;
  }
);

export const deleteCourseById = createAsyncThunk(
  ACTIONS.course.deleteById,
  async ({ collegeId, id }) => {
    await axios.delete(`${BASE_URL}/colleges/${collegeId}/courses/${id}`);
    return { _id: id };
  }
);

export const toggleBookmarkCourseById = createAsyncThunk(
  ACTIONS.course.toggleBookmarkById,
  async ({ collegeId, id }) => {
    await axios.patch(`${BASE_URL}/colleges/${collegeId}/courses/${id}/bookmark`);
    return { _id: id };
  }
);

export const toggleCompareCourse = createAsyncThunk(
  ACTIONS.course.toggleCompareCourse,
  async ({ collegeId, courseId }) => {
    const res = await axios.patch(`${BASE_URL}/colleges/${collegeId}/courses/${courseId}/compare`);
    return res.data;
  }
);

export const getCompareCourseByCollege = createAsyncThunk(
  ACTIONS.course.getCompareCourseByCollege,
  async (collegeId) => {
    const res = await axios.get(`${BASE_URL}/colleges/${collegeId}/compare`);
    return res.data?.courses;
  }
);
