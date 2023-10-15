import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {submitReply} from "../../api/replyApi";

const initialState = {
    reply: {},
    loading: false,
    error: null,
    success: false
};

export const addReply = createAsyncThunk("addReply", async (reply) => {
    const response = await submitReply(reply);
    return response.data;
})

export const replySlice = createSlice({
    name: "reply",
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
            .addCase(addReply.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addReply.rejected, (state,action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addReply.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = false;
            });
    }
});
export default replySlice.reducer;