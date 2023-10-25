import {videoShortsSlice} from "../features/shorts/shortsSlice";
import {configureStore,} from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import videoHistoryReducer from "../features/video/videoWatchedSlice";
import isModalReducer from "../features/studio/modalSlice";
import isVisibilityReducer from "../features/studio/visibilitySlice";
import videoUploadReducer from "../features/studio/videoUploadSlice";
import videoLikedReducer from "../features/video/videoLikedSlice";
import userReducer from "../features/auth/userSlice";
import videoContentReducer from "../features/studio/videoContentSlice";
import commentReducer from "../features/comment_reply/commentSlice";
import {commentShortsSlice} from "../features/comment_reply/commentShortsSlice";
import subscriberReducer from "../features/video/subscriberSlice";
import videoHomeProfileReducer from "../features/video/videoHomeProfileSlice";
import commentChannelSlice from "../features/studio/commentChannelSlice";


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
    commentShorts: commentShortsSlice.reducer,
    content: videoContentReducer,
    subscriber: subscriberReducer,
    videoHomeProfile : videoHomeProfileReducer,
    commentChannel: commentChannelSlice,
  },
});

