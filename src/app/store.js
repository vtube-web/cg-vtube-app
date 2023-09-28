import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
  },
});
