
import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalSearchReducer from "../features/studio/studioSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    isModalSreach: isModalSearchReducer,

  },
});
