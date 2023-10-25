import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {submitReplyShorts} from "../../api/replyShortsApi";

const initialState = {
    replyShorts: {},
    loading: false,
    error: null,
    success: false
};

export const addReplyShorts = createAsyncThunk("addReply", async (replyShorts) => {
    const response = await submitReplyShorts(replyShorts);
    return response.data;
})

export const replyShortsSlice = createSlice({
    name: "replyShorts",
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
        resetReply: state => {
            state.reply = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReplyShorts.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addReplyShorts.rejected, (state,action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addReplyShorts.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = false;
            });
    }
});
export default replyShortsSlice.reducer;