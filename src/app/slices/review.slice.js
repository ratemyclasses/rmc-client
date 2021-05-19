import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/review.actions';
import { createStatusReducers } from '../utils';
import { STATUS } from '../constants';

const initialState = {
  reviews: [],
  review: null,
  status: STATUS.idle,
  error: null
};

const {
  createReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  upvoteReviewById,
  downvoteReviewById,
  clearVoteReviewById
} = actions;

const updateReviewVotes = (state, action) => {
  const review = state.reviews.find((rev) => rev.id === action.payload._id);
  review.upvoteCount = action.payload.upvotes;
  review.downvoteCount = action.payload.downvotes;
  state.status = STATUS.success;
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: {
    ...createStatusReducers(actions),
    [createReview.fulfilled]: (state, action) => {
      state.reviews.push(action.payload);
      state.status = STATUS.success;
    },
    [getReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload;
      state.status = STATUS.success;
    },
    [getReviewById.fulfilled]: (state, action) => {
      state.review = action.payload;
      state.status = STATUS.success;
    },
    [updateReviewById.fulfilled]: (state, action) => {
      state.reviews = state.reviews.map((s) => {
        if (s.id === action.payload.id) {
          return { ...s, ...action.payload };
        }
        return s;
      });
      state.review = { ...state.review, ...action.payload };
      state.status = STATUS.success;
    },
    [deleteReviewById.fulfilled]: (state, action) => {
      state.reviews = state.reviews.filter(({ id }) => id !== action.payload);
      state.status = STATUS.success;
    },
    [upvoteReviewById.fulfilled]: updateReviewVotes,
    [downvoteReviewById.fulfilled]: updateReviewVotes,
    [clearVoteReviewById.fulfilled]: updateReviewVotes
  }
});

export default reviewSlice.reducer;
