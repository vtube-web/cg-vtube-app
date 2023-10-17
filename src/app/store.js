import {videoShortsSlice} from "../features/shorts/shortsSlice";
import {configureStore,} from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalReducer from "../features/studio/modalSlice";
import isVisibilityReducer from "../features/studio/visibilitySlice";
import videoUploadReducer from "../features/studio/videoUploadSlice";
import videoLikedReducer from "../features/video/videoLikedSlice";
import userReducer from "../features/auth/userSlice";
import commentReducer from "../features/comment_reply/commentSlice";
import subscriberReducer from "../features/video/subscriberSlice";



export const store = configureStore({
  reducer: {
    userAccount: userReducer,
    video: videoReducer,
    videoHistory: videoHistoryReducer,
    shorts: videoShortsSlice.reducer,
    isModal: isModalReducer,
    isVisibility: isVisibilityReducer,
    videos: videoUploadReducer,
    videoLiked: videoLikedReducer,
    comment: commentReducer,
    subscriber: subscriberReducer,
  },
});

