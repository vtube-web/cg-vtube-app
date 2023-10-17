import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannelVideo, editVideo,deleteVideo } from "../../api/videoContentApi";

const initialState = {
  values: null,
  value: {},
  dataReq: {
    displayMode: null,
    titles: null,
    numberOfViews: null,
  },
  success: false,
  edit: null,
};

export const findChannelVideo = createAsyncThunk(
  "/content/get",
  async (page) => {
    const reponse = await getChannelVideo(page);
    return reponse.data.data;
  }
);

export const editFormVideo = createAsyncThunk(
  "/content/edit",
  async (request) => {
    const response = await editVideo(request);
    return response.data;
  }
);

export const removeListVideo = createAsyncThunk("/content/remove",async (idList)=>{
  const response = await deleteVideo(idList);
  return response.data;
})

export const videoContentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.value = action.payload;
    },
    setVideos: (state, action) => {
      state.values = action.payload;
    },
    setDataReq: (state, action) => {
      state.dataReq = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findChannelVideo.fulfilled, (state, action) => {
      state.values = action.payload;
      state.success = true;
    });
    builder.addCase(editFormVideo.fulfilled, (state, action) => {
      state.edit = action.payload;
    });
     builder.addCase(removeListVideo.fulfilled, (state, action) => {
       state.edit = action.payload;
     });
  },
});

export const { setVideo, setVideos, setDataReq } = videoContentSlice.actions;

export const getVideoList = (state) => state.content.values;
export const getVideoSuccess = (state) => state.content.success;
export const getDataReq = (state) => state.content.dataReq;

export default videoContentSlice.reducer;
