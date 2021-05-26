import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/course.actions';
import { reset } from '../actions/common.actions';
import { createStatusReducers } from '../utils';
import { STATUS } from '../constants';

const initialState = {
  courses: [],
  course: null,
  status: STATUS.idle,
  error: null,
  totalCount: 0
};

const { createCourse, getCourses, getCourseById, updateCourseById, deleteCourseById } = actions;

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [createCourse.fulfilled]: (state, action) => {
      state.courses.push(action.payload);
      state.status = STATUS.success;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.courses = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.status = STATUS.success;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.course = action.payload;
      state.status = STATUS.success;
    },
    [updateCourseById.fulfilled]: (state, action) => {
      state.courses = state.courses.map((s) => {
        if (s._id === action.payload._id) {
          return { ...s, ...action.payload };
        }
        return s;
      });
      state.course = { ...state.course, ...action.payload };
      state.status = STATUS.success;
    },
    [deleteCourseById.fulfilled]: (state, action) => {
      state.courses = state.courses.filter(({ _id }) => _id !== action.payload);
      state.status = STATUS.success;
    },
    [reset.fulfilled]: (state, action) => {
      state = initialState;
    }
  }
});

export default courseSlice.reducer;
