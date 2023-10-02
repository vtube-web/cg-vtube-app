import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import {logger} from "redux-logger/src";

export const store = configureStore(
    {
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
  },
},composeWithDevTools(applyMiddleware(logger)));
