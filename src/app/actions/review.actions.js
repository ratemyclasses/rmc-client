import axios from "axios";
import { BASE_URL, ACTIONS } from "../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
  ACTIONS.review.create,
  async (formData) => {
    const res = await axios.post(`${BASE_URL}/reviews`, formData);
    return res.data;
  }
);

export const getReviews = createAsyncThunk(
  ACTIONS.review.get,
  async (params) => {
    const res = await axios.get(`${BASE_URL}/reviews`, { params });
    return res.data;
  }
);

export const getReviewById = createAsyncThunk(
  ACTIONS.review.getById,
  async (id) => {
    const res = await axios.get(`${BASE_URL}/reviews/${id}`);
    return res.data;
  }
);

export const updateReviewById = createAsyncThunk(
  ACTIONS.review.updateById,
  async (id, formData) => {
    const res = await axios.patch(`${BASE_URL}/reviews/${id}`, formData);
    return res.data;
  }
);

export const deleteReviewById = createAsyncThunk(
  ACTIONS.review.deleteById,
  async (id) => {
    await axios.delete(`${BASE_URL}/reviews/${id}`);
    return id;
  }
);

export const upvoteReviewById = createAsyncThunk(
  ACTIONS.review.upvote,
  async (id) => {
    const res = await axios.patch(`${BASE_URL}/reviews/${id}/vote`, {
      voteType: "UPVOTE",
    });
    return res.data;
  }
);

export const downvoteReviewById = createAsyncThunk(
  ACTIONS.review.downvote,
  async (id) => {
    const res = await axios.patch(`${BASE_URL}/reviews/${id}/vote`, {
      voteType: "DOWNVOTE",
    });
    return res.data;
  }
);

export const clearVoteReviewById = createAsyncThunk(
  ACTIONS.review.downvote,
  async (id) => {
    const res = await axios.patch(`${BASE_URL}/reviews/${id}/vote`, {
      voteType: "CLEAR",
    });
    return res.data;
  }
);
