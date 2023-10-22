import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  videoLikedList,
  deleteVideoLiked,
  createLikeOrDisLike,
} from "../../api/videoLikedAPI";

const initialState = {
  videos: [],
  value: null,
  loading: false,
  error: null,
  success: false,
};

export const getVideoLiked = createAsyncThunk("liked/history", async (page) => {
  const response = await videoLikedList(page);
  return response.data;
});

export const removeVideoLiked = createAsyncThunk(
  "liked/remove",
  async (videoId) => {
    try {
      const response = await deleteVideoLiked(videoId);
      return {
        ...response.data,
        videoId: videoId,
      };
    } catch (error) {
      throw new Error("Error removing video: " + error.message);
    }
  }
);

export const addLikeOrDislikeVideo = createAsyncThunk(
  "liked/create",
  async (data) => {
    const response = await createLikeOrDisLike(data);
    return response.data;
  }
);

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
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getVideoLiked.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getVideoLiked.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.videos = action.payload.data;
      })

      .addCase(removeVideoLiked.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(removeVideoLiked.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeVideoLiked.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload.data;
        state.error = false;
      })

      .addCase(addLikeOrDislikeVideo.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addLikeOrDislikeVideo.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addLikeOrDislikeVideo.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.value = action.payload.data;
      });
  },
});

export const { setLoading, setError, setSuccess } = videoLikedSlice.actions;

export const selectLoading = (state) => state.videoLiked.loading;
export const selectError = (state) => state.videoLiked.error;
export const selectSuccess = (state) => state.videoLiked.success;
export const selectVideoLikedList = (state) => state.videoLiked.videos;
export const selectVideoLikedRemoved = (state) => state.videoLiked.value;
export const selectLiked = (state) => state.videoLiked.value;



export default videoLikedSlice.reducer;
