import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createVideo,updateVideo } from "../../api/uploadApi";

const initialState = {
  value: {},
  success: false,
};

export const addVideo = createAsyncThunk("/videos/add", async (video) => {
  const reponse = await createVideo(video);
  return reponse.data;
});
export const editVideo = createAsyncThunk("/videos/update",async (video)=>{
  const response = await updateVideo(video);
  return response.data;
})

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addVideo.fulfilled, (state, action) => {
      state.value = action.payload.data;
      state.success = true;
    }).addCase(editVideo.fulfilled,(state,action)=>{
      state.value = action.payload.data;
      state.success = true;
    });
  },
});

export const { setVideo } = videoSlice.actions;

export const getVideo = (state) => state.videos.value;
export const getVideoSuccess = (state) => state.videos.success;

export default videoSlice.reducer;
