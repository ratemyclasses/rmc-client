import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/course.actions';
import { reset } from '../actions/common.actions';
import { createStatusReducers } from '../utils';
import { STATUS } from '../constants';

const initialState = {
  courses: [],
  compareCourses: [],
  course: null,
  status: STATUS.idle,
  error: null,
  totalCount: 0
};

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  toggleCompareCourse,
  getCompareCourseByCollege
} = actions;

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
    [getCourses.rejected]: (state, action) => {
      state.courses = [];
      state.status = STATUS.failed;
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
      state.courses = state.courses.filter(({ _id }) => _id !== action.payload._id);
      state.status = STATUS.success;
    },
    [reset.fulfilled]: (state, action) => {
      state.courses = initialState.courses;
      state.course = initialState.course;
      state.error = initialState.error;
      state.status = initialState.status;
      state.compareCourses = initialState.compareCourses;
      state.totalCount = initialState.totalCount;
    },
    [toggleCompareCourse.fulfilled]: (state, action) => {
      if (state.compareCourses.find((course) => course._id === action.payload._id)) {
        state.compareCourses = state.compareCourses.filter(({ _id }) => _id !== action.payload._id);
      } else {
        state.compareCourses.push(action.payload);
      }
      state.courses = state.courses.filter(({ _id }) => _id !== action.payload._id);
      state.status = STATUS.success;
    },
    [getCompareCourseByCollege.rejected]: (state, action) => {
      state.compareCourses = [];
      state.status = STATUS.failed;
    },
    [getCompareCourseByCollege.fulfilled]: (state, action) => {
      state.compareCourses = action.payload;
      const ids = action.payload.map(({ _id }) => _id);
      state.courses = state.courses.filter(({ _id }) => !ids.includes(_id));
      state.status = STATUS.success;
    }
  }
});

export default courseSlice.reducer;
