import {configureStore} from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice"
import isModalSearchReducer from "../features/studio/studioSlice";
export const store = configureStore({
  reducer: {
    video: videoReducer,
    isModalSreach: isModalSearchReducer,
  },
});