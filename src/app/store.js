import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import authReducer from './slices/auth.slice';
import courseReducer from './slices/course.slice';
import collegeReducer from './slices/college.slice';
import departmentReducer from './slices/department.slice';
import reviewReducer from './slices/review.slice';
import userReducer from './slices/user.slice';
import { ACTIONS } from './constants';

const combinedReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  college: collegeReducer,
  department: departmentReducer,
  review: reviewReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === `${ACTIONS.auth.logout}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const options = {
  reducer: rootReducer
};

if (localStorage.getItem('Authenticated')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('Authenticated')}`;

  options.preloadedState = {
    auth: { authenticated: true }
  };
}

export const store = configureStore(options);
