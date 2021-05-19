import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/auth.actions';
import * as actions from '../actions/user.actions';
import { STATUS } from '../constants';
import { createStatusReducers } from '../utils';

const initialState = {
  user: null,
  status: STATUS.idle,
  error: null
};

const { getCurrentUser, updateUser, deleteUser } = actions;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [logout.fulfilled]: (state, action) => {
      state.user = null;
      state.status = STATUS.idle;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = STATUS.success;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = STATUS.success;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.user = null;
      state.status = STATUS.success;
    }
  }
});

export default userSlice.reducer;
