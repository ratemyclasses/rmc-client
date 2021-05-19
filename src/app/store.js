import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import authReducer from './slices/auth.slice';
import courseReducer from './slices/course.slice';
import collegeReducer from './slices/college.slice';
import departmentReducer from './slices/department.slice';
import reviewReducer from './slices/review.slice';
import userReducer from './slices/user.slice';

const options = {
  reducer: {
    auth: authReducer,
    course: courseReducer,
    college: collegeReducer,
    department: departmentReducer,
    review: reviewReducer,
    user: userReducer
  }
};

if (localStorage.getItem('Authenticated')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('Authenticated')}`;

  options.preloadedState = {
    auth: { authenticated: true }
  };
}

export const store = configureStore(options);
