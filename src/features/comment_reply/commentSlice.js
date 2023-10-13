import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {submitComment} from "../../api/commentApi";
import {videoSlice} from "../studio/videoUploadSlice";

const initialState = {
    comment: {},
    loading: false,
    error: null,
    success: false
};

export const addComment = createAsyncThunk("addComment", async () => {
    const response = await submitComment();
    return response.data;
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComment: (state, action) => {
            state.comment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                state.comment = action.payload.data;
                state.success = true;
            });
    }
});

export const {setComment} = commentSlice.actions;
export default commentSlice.reducer;