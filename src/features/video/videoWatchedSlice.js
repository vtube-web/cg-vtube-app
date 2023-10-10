import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  videoWatchedList,
  deleteVideoWatched,
  deleteAllVideoWatched,
} from "../../api/videoWatchedAPI";

const initialState = {
  videos: [],
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getVideoWatched = createAsyncThunk("history/list", async () => {
  const response = await videoWatchedList();
  return response.data;
});

export const removeVideoWatched = createAsyncThunk(
    "history/remove",
    async (videoId) => {
      try {
        const response = await deleteVideoWatched(videoId);
        return {
          ...response.data,
          videoId: videoId,
        };
      } catch (error) {
        throw new Error("Error removing video: " + error.message);
      }
    }
);

export const removeAllVideoWatched = createAsyncThunk(
    "history/remove/all",
    async () => {
      try {
        const response = await deleteAllVideoWatched();
        return response.data;
      } catch (error) {
        throw new Error("Error removing all video: " + error.message);
      }
    }
);

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
        .addCase(getVideoWatched.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getVideoWatched.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getVideoWatched.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.error = false;
          state.videos = action.payload.data;
        })

        .addCase(removeVideoWatched.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(removeVideoWatched.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(removeVideoWatched.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.value = action.payload.data;
          state.error = false;
        })

        .addCase(removeAllVideoWatched.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(removeAllVideoWatched.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(removeAllVideoWatched.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.value = action.payload.data;
          state.error = false;
        });
  },
});

export const { setLoading, setError, setSuccess } = videoWatchedSlice.actions;

export const selectLoading = (state) => state.videoHistory.loading;
export const selectError = (state) => state.videoHistory.error;
export const selectSuccess = (state) => state.videoHistory.success;
export const selectVideoWatchedList = (state) => state.videoHistory.videos;
export const selectVideoWatchedRemoved = (state) => state.videoHistory.value;
export const selectVideoWatchedRemovedAll = (state) => state.videoHistory.value;

export default videoWatchedSlice.reducer;