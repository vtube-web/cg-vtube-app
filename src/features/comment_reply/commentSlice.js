import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {submitComment} from "../../api/commentApi";

const initialState = {
    comment: {},
    loading: false,
    error: null,
    success: false
};

export const addComment = createAsyncThunk("addComment", async (comment) => {
    const response = await submitComment(comment);
    return response.data;
})

export const commentSlice = createSlice({
    name: "comment",
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
            .addCase(addComment.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addComment.rejected, (state,action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addComment.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = false;
            });
    }
});
export default commentSlice.reducer;