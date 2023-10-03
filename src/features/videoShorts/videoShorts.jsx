import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {findVideoShorts} from "../../api/videoShortsAPI";

const initialState = {
    videos: [

    ],
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const getVideoShorts = createAsyncThunk("shorts", async () => {
    console.log("Waiting for response...");
    const response = await findVideoShorts();
    return response.data;
});

export const videoShortsSlice = createSlice({
    name: 'videoShorts',
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
    extraReducers: builder => {
        builder
            .addCase(getVideoShorts.pending, (state) => {
                console.log("Extra reducer: Pending...");
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getVideoShorts.rejected,(state, action) => {
                console.log("Extra reducer: Rejected...");
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideoShorts.fulfilled, (state, action) => {
                console.log("Extra reducer: Success...")
                state.success = true;
                state.loading = false;
                state.error = false;
                state.videos = action.payload;
            })
    }
})
export const {
    setLoading,
    setError,
    setSuccess
} = videoShortsSlice.actions;

export const selectVideoShortsIsLoading = (state) => state.shorts.loading;
export const selectVideoShortsIsSuccess = (state) => state.shorts.success;
export const selectVideoShortsIsError = (state) => state.shorts.error;
export const selectVideoShorts = (state) => state.shorts.videos;
export default videoShortsSlice.reducer;