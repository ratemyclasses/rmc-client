export const BASE_URL =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:3000";

export const ACTIONS = {
  auth: {
    signup: "auth/signup",
    login: "auth/login",
    logout: "auth/logout",
  },
};

export const STATUS = {
  idle: "idle",
  success: "success",
  pending: "pending",
  failed: "failed",
};
