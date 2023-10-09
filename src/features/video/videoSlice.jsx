import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {
    findVideoList,
    findVideo
} from "../../api/videoAPI";

const initialState = {
    videos:[],
    videoDetails: {},
    loading: false,
    error: null,
    getVideoListSuccess: false,
    getVideoSuccess: false
};

export const getVideos = createAsyncThunk("getVideos", async () => {
    const response = await findVideoList();
    return response.data;
});

export const getVideo = createAsyncThunk("getVideo", async (videoId) => {
    const response = await findVideo(videoId);
    return response.data;
});

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        resetVideoDetail: state => {
            state.videoDetails = {}
        }
    },
    extraReducers: (builder) => {
        builder
            //getVideoList
            .addCase(getVideos.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.getVideoListSuccess = true;
                state.loading = false;
                state.error = false;
                state.videos = action.payload;
            })

            //getVideo
            .addCase(getVideo.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getVideo.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideo.fulfilled, (state, action) => {
                state.getVideoSuccess = true;
                state.loading = false;
                state.error = false;
                state.videoDetails = action.payload;
            })
    }
});

export const {
    resetVideoDetail
} = videoSlice.actions;

export const selectLoading = (state) => state.video.loading;
export const selectError = (state) => state.video.error;
export const selectVideoListSuccess = (state) => state.video.getVideoListSuccess;
export const selectVideoSuccess = (state) => state.video.getVideoSuccess;
export const selectVideoList = (state) => state.video.videos;
export const selectVideoDetail = (state) => state.video.videoDetails;

export default videoSlice.reducer;