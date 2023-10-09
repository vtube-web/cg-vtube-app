import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { videoLikedList } from "../../api/videoLikedAPI";

const initialState = {
  videos: [],
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getVideoLiked = createAsyncThunk("liked/history", async () => {
  console.log("Waiting for response...");
  const response = await videoLikedList();
  return response.data;
});

export const videoLikedSlice = createSlice({
  name: "videoLiked",
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
      .addCase(getVideoLiked.pending, (state) => {
        console.log("Extra reducer: Pending...");
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getVideoLiked.rejected, (state, action) => {
        console.log("Extra reducer: Rejected...");
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getVideoLiked.fulfilled, (state, action) => {
        console.log("Extra reducer: Success...");
        state.success = true;
        state.loading = false;
        state.error = false;
        state.videos = action.payload.data;
      });
  },
});

export const { setLoading, setError, setSuccess } = videoLikedSlice.actions;

export const selectLoading = (state) => state.videoLiked.loading;
export const selectError = (state) => state.videoLiked.error;
export const selectSuccess = (state) => state.videoLiked.success;
export const selectVideoLikedList = (state) => state.videoLiked.videos;

export default videoLikedSlice.reducer;
