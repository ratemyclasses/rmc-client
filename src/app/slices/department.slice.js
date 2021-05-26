import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/department.actions';
import { createStatusReducers } from '../utils';
import { STATUS } from '../constants';

const initialState = {
  departments: [],
  department: null,
  status: STATUS.idle,
  error: null,
  totalCount: 0
};

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById
} = actions;

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [createDepartment.fulfilled]: (state, action) => {
      state.departments.push(action.payload);
      state.status = STATUS.success;
    },
    [getDepartments.fulfilled]: (state, action) => {
      state.departments = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.status = STATUS.success;
    },
    [getDepartmentById.fulfilled]: (state, action) => {
      state.department = action.payload;
      state.status = STATUS.success;
    },
    [updateDepartmentById.fulfilled]: (state, action) => {
      state.departments = state.departments.map((s) => {
        if (s._id === action.payload._id) {
          return { ...s, ...action.payload };
        }
        return s;
      });
      state.department = { ...state.department, ...action.payload };
      state.status = STATUS.success;
    },
    [deleteDepartmentById.fulfilled]: (state, action) => {
      state.departments = state.departments.filter(({ _id }) => _id !== action.payload);
      state.status = STATUS.success;
    }
  }
});

export default departmentSlice.reducer;
