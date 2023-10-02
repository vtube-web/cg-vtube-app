import {
  configureStore,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalReducer from "../features/studio/modalSlice";
import isVisibilityReducer from "../features/studio/visibilitySlice";
import videoUploadReducer from "../features/studio/videoUploadSlice";
import videoLikedReducer from "../features/video/videoLikedSlice";
import { logger } from "redux-logger/src";


const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    isModal: isModalReducer,
    isVisibility: isVisibilityReducer,
    videoUpload: videoUploadReducer,
    videoLiked: videoLikedReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

