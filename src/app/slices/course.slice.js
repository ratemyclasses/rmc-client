import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/course.actions";
import { createStatusReducers } from "../utils";
import { STATUS } from "../constants";

const initialState = {
  courses: [],
  course: null,
  status: STATUS.idle,
  error: null,
};

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = actions;

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [createCourse.fulfilled]: (state, action) => {
      state.courses.push(action.payload);
      state.status = STATUS.success;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.status = STATUS.success;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.course = action.payload;
      state.status = STATUS.success;
    },
    [updateCourseById.fulfilled]: (state, action) => {
      state.courses = state.courses.map((s) => {
        if (s.id === action.payload.id) {
          return { ...s, ...action.payload };
        }
        return s;
      });
      state.course = { ...state.course, ...action.payload };
      state.status = STATUS.success;
    },
    [deleteCourseById.fulfilled]: (state, action) => {
      state.courses = state.courses.filter(({ id }) => id !== action.payload);
      state.status = STATUS.success;
    },
  },
});

export default courseSlice.reducer;
