import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ACTIONS, APPROVAL_STATUS } from '../constants';

export const createReview = createAsyncThunk(ACTIONS.review.create, async (formData) => {
  const res = await axios.post(`${BASE_URL}/reviews`, formData);
  return res.data;
});

export const getReviews = createAsyncThunk(ACTIONS.review.get, async (params) => {
  const res = await axios.get(`${BASE_URL}/reviews`, { params });
  let totalCount = 0;
  if (res.headers['x-total-count']) {
    totalCount = parseInt(res.headers['x-total-count'], 10);
  }
  return { data: res.data, totalCount };
});

export const getReviewById = createAsyncThunk(ACTIONS.review.getById, async (id) => {
  const res = await axios.get(`${BASE_URL}/reviews/${id}`);
  return res.data;
});

export const updateReviewById = createAsyncThunk(
  ACTIONS.review.updateById,
  async ({ id, formData }) => {
    const res = await axios.patch(`${BASE_URL}/reviews/${id}`, formData);
    return res.data;
  }
);

export const deleteReviewById = createAsyncThunk(ACTIONS.review.deleteById, async (id) => {
  await axios.delete(`${BASE_URL}/reviews/${id}`);
  return id;
});

export const upvoteReviewById = createAsyncThunk(ACTIONS.review.upvote, async (id) => {
  const res = await axios.patch(`${BASE_URL}/reviews/${id}/votes`, {
    voteType: 'UPVOTE'
  });

  return res.data;
});

export const downvoteReviewById = createAsyncThunk(ACTIONS.review.downvote, async (id) => {
  const res = await axios.patch(`${BASE_URL}/reviews/${id}/votes`, {
    voteType: 'DOWNVOTE'
  });
  return res.data;
});

export const clearVoteReviewById = createAsyncThunk(ACTIONS.review.downvote, async (id) => {
  const res = await axios.patch(`${BASE_URL}/reviews/${id}/votes`, {
    voteType: 'CLEAR'
  });
  return res.data;
});

/**
 * Only moderators and admins can use this route
 */
export const approveReviewById = createAsyncThunk(ACTIONS.review.approveById, async (id) => {
  await axios.patch(`${BASE_URL}/reviews/${id}/approve`, {
    approved: APPROVAL_STATUS.approved
  });
  return { _id: id };
});

/**
 * Only moderators and admins can use this route
 */
export const denyReviewById = createAsyncThunk(ACTIONS.review.rejectById, async (id) => {
  await axios.patch(`${BASE_URL}/reviews/${id}/approve`, {
    approved: APPROVAL_STATUS.denied
  });
  return { _id: id };
});
