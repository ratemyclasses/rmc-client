export const BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000';

export const ACTIONS = {
  auth: {
    signup: 'auth/signup',
    login: 'auth/login',
    googleLogin: 'auth/googleLogin',
    logout: 'auth/logout'
  },
  course: {
    get: 'course/get',
    getById: 'course/getById',
    create: 'course/create',
    updateById: 'course/update',
    deleteById: 'course/delete'
  },
  college: {
    get: 'college/get',
    getById: 'college/getById',
    getByTag: 'college/getByTag',
    create: 'college/create',
    updateById: 'college/update',
    deleteById: 'college/delete'
  },
  department: {
    get: 'department/get',
    getById: 'department/getById',
    create: 'department/create',
    updateById: 'department/update',
    deleteById: 'department/delete'
  },
  review: {
    get: 'review/get',
    getById: 'review/getById',
    create: 'review/create',
    updateById: 'review/update',
    deleteById: 'review/delete',
    upvote: 'review/upvote',
    downvote: 'review/downvote',
    clearVote: 'review/clearVote',
    approveById: 'review/approveById',
    rejectById: 'review/rejectById'
  },
  user: {
    getCurrent: 'user/getCurrent',
    update: 'user/update',
    delete: 'user/delete'
  },
  common: {
    reset: 'common/reset'
  }
};

export const STATUS = {
  idle: 'idle',
  success: 'success',
  pending: 'pending',
  failed: 'failed'
};
