import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/college.actions';
import { createStatusReducers } from '../utils';
import { STATUS } from '../constants';

const initialState = {
  colleges: [],
  college: null,
  status: STATUS.idle,
  error: null,
  totalCount: 0
};

const {
  createCollege,
  getColleges,
  getCollegeById,
  getCollegeByTag,
  updateCollegeById,
  deleteCollegeById
} = actions;

export const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [createCollege.fulfilled]: (state, action) => {
      state.colleges.push(action.payload);
      state.status = STATUS.success;
    },
    [getColleges.fulfilled]: (state, action) => {
      state.colleges = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.status = STATUS.success;
    },
    [getCollegeById.fulfilled]: (state, action) => {
      state.college = action.payload;
      state.status = STATUS.success;
    },
    [getCollegeByTag.fulfilled]: (state, action) => {
      state.college = action.payload;
      state.status = STATUS.success;
    },
    [updateCollegeById.fulfilled]: (state, action) => {
      state.colleges = state.colleges.map((s) => {
        if (s.id === action.payload.id) {
          return { ...s, ...action.payload };
        }
        return s;
      });
      state.college = { ...state.college, ...action.payload };
      state.status = STATUS.success;
    },
    [deleteCollegeById.fulfilled]: (state, action) => {
      state.colleges = state.colleges.filter(({ _id }) => _id !== action.payload);
      state.status = STATUS.success;
    }
  }
});

export default collegeSlice.reducer;
