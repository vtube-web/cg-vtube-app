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
    success: false,
};

export const getVideos = createAsyncThunk("getVideos", async () => {
    console.log("Waiting for response...");
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
    },
    extraReducers: (builder) => {
        builder
            //getVideoList
            .addCase(getVideos.pending, (state) => {
                console.log("Extra reducer: Pending...");
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getVideos.rejected, (state, action) => {
                console.log("Extra reducer: Rejected...");
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                console.log("Extra reducer: Success...")
                state.success = true;
                state.loading = false;
                state.error = false;
                state.videos = action.payload;
            })

            //getVideo
            .addCase(getVideo.pending, (state) => {
                console.log("Extra reducer: getVideo Pending...");
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getVideo.rejected, (state, action) => {
                console.log("Extra reducer: getVideo rejected...");
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideo.fulfilled, (state, action) => {
                console.log("Extra reducer: getVideo fulfilled...");
                state.success = true;
                state.loading = false;
                state.error = false;
                state.videoDetails = action.payload;
            })
    }
});

export const {
    setLoading,
    setError,
    setSuccess
} = videoSlice.actions;

export const selectLoading = (state) => state.video.loading;
export const selectError = (state) => state.video.error;
export const selectSuccess = (state) => state.video.success;
export const selectVideoList = (state) => state.video.videos;
export const selectVideoDetail = (state) => state.video.videoDetails;

export default videoSlice.reducer;