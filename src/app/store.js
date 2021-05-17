import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter.slice";
import authReducer from "../features/auth/auth.slice";
import axios from "axios";

const options = {
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
};

if (localStorage.getItem("Authenticated")) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "Authenticated"
  )}`;

  options.preloadedState = {
    auth: { authenticated: true },
  };
}

export const store = configureStore(options);
