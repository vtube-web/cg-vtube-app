import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  editComment,
  getComment,
  deleteComment,
  createFeedback,
  editFeedback,
  deleteFeedback,
  likeComment,
  dislikeComment,
  dislikeFeedback,
  likeFeedback
} from "../../api/commentChannelApi";

export const getCommentByChannel = createAsyncThunk(
  "comment/get",
  async (page) => {
    const response = await getComment(page);
    return response.data.data;
  }
);
export const editCommentByUser = createAsyncThunk(
  "comment/edit",
  async (comment) => {
    const response = await editComment(comment);
    return response.data;
  }
);
export const deleteCommentByUser = createAsyncThunk(
  "comment/delete",
  async (id) => {
    const response = await deleteComment(id);
    return response.data;
  }
);
export const addFeedbackByUser = createAsyncThunk(
  "comment/feedback/add",
  async (feedback) => {
    const response = await createFeedback(feedback);
    return response.data;
  }
);

export const editFeedbackByUser = createAsyncThunk(
  "comment/feedback/edit",
  async (feedback) => {
    const response = await editFeedback(feedback);
    return response.data;
  }
);

export const deleteFeedbackByUser = createAsyncThunk(
  "comment/feedback/delete",
  async (id) => {
    const response = await deleteFeedback(id);
    return response.data;
  }
);

export const likeCommentByUser = createAsyncThunk("comment/like", async (id) => {
  const response = await likeComment(id);
  return response.data;
});
export const dislikeCommentByUser = createAsyncThunk("comment/dislike", async (id) => {
  const response = await dislikeComment(id);
  return response.data;
});

export const likeFeedbacktByUser = createAsyncThunk(
  "feed/like/feedback",
  async (id) => {
    const response = await likeFeedback(id);
    return response.data;
  }
);
export const dislikeFeedbackByUser = createAsyncThunk(
  "comment/dislike/feedback",
  async (id) => {
    const response = await dislikeFeedback(id);
    return response.data;
  }
);


const initialState = {
  data: null,
};

export const commentChannelSlice = createSlice({
  name: "commentChannel",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentByChannel.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setData, setEdit, setDelete } = commentChannelSlice.actions;

export const getData = (state) => state.commentChannel.data;

export default commentChannelSlice.reducer;
