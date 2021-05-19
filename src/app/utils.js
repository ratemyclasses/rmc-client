import { STATUS } from './constants';

export const createStatusReducers = (actions) => {
  const data = {};
  Object.values(actions).forEach((a) => {
    data[a.pending] = (state, action) => {
      state.status = STATUS.pending;
    };
    data[a.rejected] = (state, action) => {
      state.error = action.error.message;
      state.status = STATUS.failed;
    };
  });
  return data;
};
