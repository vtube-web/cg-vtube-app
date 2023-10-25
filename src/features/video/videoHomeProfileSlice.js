import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    videoHomeProfileList
} from "../../api/videoHomeProfileAPI";

const initialState = {
  videos: [],
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getVideoHomeProfile = createAsyncThunk("videos/homeProfile", async (data) => {
  const response = await videoHomeProfileList(data);
  return response.data;
});


export const videoHomeProfileSlice = createSlice({
  name: "videoHomeProfile",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetVideoHomeProfile: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.videos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Newest
      .addCase(getVideoHomeProfile.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getVideoHomeProfile.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getVideoHomeProfile.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.videos = action.payload.data;
      });
  },
});

export const { setLoading, setError, setSuccess,resetVideoHomeProfile } = videoHomeProfileSlice.actions;

export const selectLoading = (state) => state.videoHomeProfile.loading;
export const selectError = (state) => state.videoHomeProfile.error;
export const selectSuccess = (state) => state.videoHomeProfile.success;
export const selectVideoHomeProfileList = (state) => state.videoHomeProfile.videos;


export default videoHomeProfileSlice.reducer;
