import {configureStore, applyMiddleware, getDefaultMiddleware} from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalSearchReducer from "../features/studio/studioSlice";
import {logger} from "redux-logger/src";

const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore(
    {
  reducer: {
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    isModalSearch: isModalSearchReducer
  },middleware,
      devTools: process.env.NODE_ENV !== 'production',
    });
