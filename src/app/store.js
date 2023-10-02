
import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalSearchReducer from "../features/studio/studioSlice";
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
  reducer: {  
    user: userReducer, 
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    isModalSreach: isModalSearchReducer,

  },
});
