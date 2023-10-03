import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    lists: [],
  },
  reducers: {
    addVideoList: (state, action) => {
      state.lists.push(action.payload);
    },
  },
});

export const { addVideoList } = videoSlice.actions;
export const getVideoList = (state) => state.videos.lists;
export const getVideoByName = (state, name) => {
  let temp = state.videos.lists;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].name == name) {
      return temp[i];
    }
  }
  return null;
};
export default videoSlice.reducer;
