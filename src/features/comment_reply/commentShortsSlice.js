import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {submitCommentShorts} from "../../api/commentShortsApi";

const initialState = {
    commentShorts: {},
    loading: false,
    error: null,
    success: false
};

export const addCommentShorts = createAsyncThunk("addComment", async (commentShorts) => {
    const response = await submitCommentShorts(commentShorts);
    return response.data;
})

export const commentShortsSlice = createSlice({
    name: "commentShorts",
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
        resetComment: state => {
            state.comment = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCommentShorts.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addCommentShorts.rejected, (state,action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addCommentShorts.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = false;
            });
    }
});
export default commentShortsSlice.reducer;