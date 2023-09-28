
import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalReducer from "../features/studio/modalSlice";
import isVisibilityRedicer from "../features/studio/visibilitySlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    isModal: isModalReducer,
    isVisibility: isVisibilityRedicer,
  },
});
