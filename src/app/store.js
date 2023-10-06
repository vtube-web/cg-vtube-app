

import {videoShortsSlice} from "../features/videoShorts/videoShorts";
import {logger} from "redux-logger/src";
import {configureStore, getDefaultMiddleware,} from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalReducer from "../features/studio/modalSlice";
import isVisibilityReducer from "../features/studio/visibilitySlice";
import videoUploadReducer from "../features/studio/videoUploadSlice";
import videoLikedReducer from "../features/video/videoLikedSlice";
import userReducer from "../features/auth/userSlice";



const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({
  reducer: {  
    user: userReducer, 
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    shorts: videoShortsSlice.reducer,
    isModal: isModalReducer,
    isVisibility: isVisibilityReducer,
    videos: videoUploadReducer,
    videoLiked: videoLikedReducer,
  },
  // middleware,
  // devTools: process.env.NODE_ENV !== "production",
})

