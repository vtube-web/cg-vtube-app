import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { videoWatchedList } from "../../api/videoWatchedAPI";

const initialState = {
  videos: [],
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getVideoWatched = createAsyncThunk("getVideoWatched", async () => {
  console.log("Waiting for response...");
  const response = await videoWatchedList();
  return response.data;
});

export const videoWatchedSlice = createSlice({
  name: "videoHistory",
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
  },
  extraReducers: (builder) => {
    builder
      //getVideoWatchedList
      .addCase(getVideoWatched.pending, (state) => {
        console.log("Extra reducer: Pending...");
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getVideoWatched.rejected, (state, action) => {
        console.log("Extra reducer: Rejected...");
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getVideoWatched.fulfilled, (state, action) => {
        console.log("Extra reducer: Success...");
        state.success = true;
        state.loading = false;
        state.error = false;
        state.videos = action.payload;
      });
  },
});

export const { setLoading, setError, setSuccess } = videoWatchedSlice.actions;

export const selectLoading = (state) => state.videoHistory.loading;
export const selectError = (state) => state.videoHistory.error;
export const selectSuccess = (state) => state.videoHistory.success;
export const selectVideoWatchedList = (state) => state.videoHistory.videos;

export default videoWatchedSlice.reducer;
