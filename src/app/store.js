import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import {videoShortsSlice} from "../features/videoShorts/videoShorts";
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger/src";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    shorts: videoShortsSlice.reducer
  },
},composeWithDevTools(applyMiddleware(logger)));
