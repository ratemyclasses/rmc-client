import { STATUS } from "./features.constants";

export const createStatusReducers = (...actions) => {
  const data = {};
  actions.forEach((action) => {
    data[action.pending] = (state, action) => {
      state.status = STATUS.pending;
    };
    data[action.rejected] = (state, action) => {
      state.error = action.error.message;
      state.status = STATUS.failed;
    };
  });
  return data;
};
